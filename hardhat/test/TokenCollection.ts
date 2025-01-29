import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import {
  TokenCollection,
  TokenForge,
} from "../typechain-types";

describe("TokenCollection", function () {
  let tokenCollection: TokenCollection;
  let tokenForge: TokenForge;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // Deploy TokenCollection
    const TokenCollectionFactory =
      await ethers.getContractFactory("TokenCollection");
    tokenCollection = await TokenCollectionFactory.deploy();
    await tokenCollection.waitForDeployment();
  });

  describe("Deployment", () => {
    it("should set the owner correctly", async () => {
      expect(await tokenCollection.owner()).to.equal(
        owner.address
      );
    });
  });

  describe("Collection Information", () => {
    it("should allow owner to set the collection name and symbol", async () => {
      await tokenCollection.setCollectionInfo(
        "TestCollection",
        "TC"
      );

      expect(await tokenCollection.name()).to.equal(
        "TestCollection"
      );
      expect(await tokenCollection.symbol()).to.equal("TC");
    });

    it("should revert if non-owner try to set collection info", async () => {
      await expect(
        tokenCollection
          .connect(user)
          .setCollectionInfo("TestCollection", "TC")
      )
        .to.be.revertedWithCustomError(
          tokenCollection,
          "OwnableUnauthorizedAccount"
        )
        .withArgs(user.address);
    });
  });

  describe("URI Management", () => {
    it("should allow owner to set new URI", async () => {
      const newURI = "ipfs://newTestURI/";
      await tokenCollection.setURI(newURI);

      await tokenCollection.setCollectionInfo(
        "TokenCollection",
        "TKC"
      );
      await tokenCollection.connect(user).mint(0);

      const tokenURI = await tokenCollection.uri(0);
      expect(tokenURI).to.include(newURI);
    });
  });

  describe("Minting", () => {
    beforeEach(async function () {
      await tokenCollection.setCollectionInfo(
        "TestCollection",
        "TC"
      );
    });

    it("Should allow minting tokens 0-2", async function () {
      // Mint token 0
      await tokenCollection.connect(user).mint(0);
      expect(
        await tokenCollection.balanceOf(user.address, 0)
      ).to.equal(1);

      // Mint token 1
      await tokenCollection.connect(user).mint(1);
      expect(
        await tokenCollection.balanceOf(user.address, 1)
      ).to.equal(1);

      // Mint token 2
      await tokenCollection.connect(user).mint(2);
      expect(
        await tokenCollection.balanceOf(user.address, 2)
      ).to.equal(1);
    });

    it("Should revert minting before setting collection info", async function () {
      // Redeploy contract to reset state
      const TokenCollectionFactory =
        await ethers.getContractFactory("TokenCollection");
      tokenCollection =
        await TokenCollectionFactory.deploy();
      await tokenCollection.waitForDeployment();

      await expect(
        tokenCollection.connect(user).mint(0)
      ).to.be.revertedWithCustomError(
        tokenCollection,
        "NameNotSet"
      );
    });

    it("Should revert minting tokens > 2", async function () {
      await expect(
        tokenCollection.connect(user).mint(3)
      ).to.be.revertedWithCustomError(
        tokenCollection,
        "InvalidTokenId"
      );
    });

    it("Should enforce cooldown between mints", async function () {
      await tokenCollection.connect(user).mint(0);

      await expect(
        tokenCollection.connect(user).mint(0)
      ).to.be.revertedWithCustomError(
        tokenCollection,
        "CooldownNotFinished"
      );
    });
  });

  describe("Trading", () => {
    beforeEach(async () => {
      await tokenCollection.setCollectionInfo(
        "TestCollection",
        "TC"
      );
      // Mint tokens for user
      await tokenCollection.connect(user).mint(0);
      await tokenCollection.connect(user).mint(1);
    });

    it("Should allow trading tokens", async function () {
      await tokenCollection.connect(user).trade(0, 1, 1);

      expect(
        await tokenCollection.balanceOf(user.address, 0)
      ).to.equal(0);
      expect(
        await tokenCollection.balanceOf(user.address, 1)
      ).to.equal(2);
    });

    it("should revert when trading with invalid token IDs (>2)", async function () {
      await expect(
        tokenCollection.connect(user).trade(0, 3, 1)
      ).to.be.revertedWithCustomError(
        tokenCollection,
        "InvalidTradeTokens"
      );

      await expect(
        tokenCollection.connect(user).trade(3, 0, 1)
      ).to.be.revertedWithCustomError(
        tokenCollection,
        "InvalidTradeTokens"
      );
    });

    it("should revert when trading more tokens than owned", async function () {
      await expect(
        tokenCollection.connect(user).trade(0, 1, 2)
      ).to.be.revertedWithCustomError(
        tokenCollection,
        "InsufficientBalance"
      );
    });
  });

  describe("Forge Minting", () => {
    beforeEach(async () => {
      const TokenForgeFactory =
        await ethers.getContractFactory("TokenForge");
      tokenForge = await TokenForgeFactory.deploy(
        await tokenCollection.getAddress()
      );
      await tokenForge.waitForDeployment();

      await tokenCollection.setCollectionInfo(
        "TestCollection",
        "TC"
      );
      await tokenCollection.setForgeContract(
        await tokenForge.getAddress()
      );

      // Mint initial tokens
      await tokenCollection.connect(user).mint(0);
      await ethers.provider.send("evm_increaseTime", [61]);
      await tokenCollection.connect(user).mint(1);
      await ethers.provider.send("evm_increaseTime", [61]);
      await tokenCollection.connect(user).mint(2);

      // Set approval for TokenForge to burn tokens
      await tokenCollection
        .connect(user)
        .setApprovalForAll(
          await tokenForge.getAddress(),
          true
        );
    });

    it("should forge token 3 by burning tokens 0 and 1", async () => {
      await tokenForge.connect(user).forge(3);

      expect(
        await tokenCollection.balanceOf(user.address, 0)
      ).to.equal(0);
      expect(
        await tokenCollection.balanceOf(user.address, 1)
      ).to.equal(0);
      // Check forged token
      expect(
        await tokenCollection.balanceOf(user.address, 3)
      ).to.equal(1);
    });

    it("should forge token 4 by burning tokens 1 and 2", async () => {
      await tokenForge.connect(user).forge(4);

      expect(
        await tokenCollection.balanceOf(user.address, 1)
      ).to.equal(0);
      expect(
        await tokenCollection.balanceOf(user.address, 2)
      ).to.equal(0);
      expect(
        await tokenCollection.balanceOf(user.address, 4)
      ).to.equal(1);
    });

    it("should forge token 5 by burning tokens 0 and 2", async () => {
      await tokenForge.connect(user).forge(5);

      expect(
        await tokenCollection.balanceOf(user.address, 0)
      ).to.equal(0);
      expect(
        await tokenCollection.balanceOf(user.address, 2)
      ).to.equal(0);
      expect(
        await tokenCollection.balanceOf(user.address, 5)
      ).to.equal(1);
    });

    it("should forge token 6 by burning tokens 0, 1, and 2", async () => {
      await tokenForge.connect(user).forge(6);

      expect(
        await tokenCollection.balanceOf(user.address, 0)
      ).to.equal(0);
      expect(
        await tokenCollection.balanceOf(user.address, 1)
      ).to.equal(0);
      expect(
        await tokenCollection.balanceOf(user.address, 2)
      ).to.equal(0);
      expect(
        await tokenCollection.balanceOf(user.address, 6)
      ).to.equal(1);
    });

    it("should revert when forging with invalid token ID", async () => {
      await expect(
        tokenForge.connect(user).forge(7)
      ).to.be.revertedWithCustomError(
        tokenForge,
        "InvalidForgeToken"
      );

      await expect(
        tokenForge.connect(user).forge(2)
      ).to.be.revertedWithCustomError(
        tokenForge,
        "InvalidForgeToken"
      );
    });

    it("should revert when user doesn't have required tokens", async () => {
      await tokenForge.connect(user).forge(3);

      await expect(
        tokenForge.connect(user).forge(3)
      ).to.be.revertedWithCustomError(
        tokenCollection,
        "InsufficientBalance"
      );
    });
  });
});
