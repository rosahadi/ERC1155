import { ethers } from "hardhat";
import TokenCollectionArtifact from "../artifacts/contracts/TokenCollection.sol/TokenCollection.json";

const tokenCollectionABI = TokenCollectionArtifact.abi;

async function main() {
  const provider = new ethers.JsonRpcProvider(
    process.env.INFURA_SEPOLIA_ENDPOINT
  );
  const deployer = new ethers.Wallet(
    process.env.PRIVATE_KEY ?? "",
    provider
  );

  const tokenCollectionAddress =
    "0x8B8BA7B3E324bE280096583B99eef49117E7F872";
  const tokenForgeAddress =
    "0xc8b7FB2894f16219cE038f5a1016A93BBa5e1dfF";

  const tokenCollection = new ethers.Contract(
    tokenCollectionAddress,
    tokenCollectionABI,
    deployer
  );

  // Set Info
  const setInfoTx = await tokenCollection.setCollectionInfo(
    "CoolCats",
    "CC"
  );
  await setInfoTx.wait();
  console.log("Collection info set to CoolCats (CC)");

  // Set Forge address
  const setForgeTx = await tokenCollection.setForgeContract(
    tokenForgeAddress
  );
  await setForgeTx.wait();
  console.log("Forge contract set in TokenCollection");

  // Set Approval for all
  const setApprovalForAllTx =
    await tokenCollection.setApprovalForAll(
      tokenForgeAddress,
      true
    );
  await setApprovalForAllTx.wait();
  console.log("setApprovalForAll set in TokenCollection");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
