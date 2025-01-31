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
    "0x16C1Cf99075f38E454E8Ed839fbD7F1fAc053B13";
  const tokenForgeAddress =
    "0x6d54d3210690f2F7Adb895432c67a31CB1e50d32";

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
