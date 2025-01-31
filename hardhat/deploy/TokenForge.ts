import { ethers } from "hardhat";

async function main() {
  const tokenCollectionAddress =
    "0x16C1Cf99075f38E454E8Ed839fbD7F1fAc053B13";

  const TokenForge =
    await ethers.getContractFactory("TokenForge");

  const tokenForge = await TokenForge.deploy(
    tokenCollectionAddress
  );

  await tokenForge.waitForDeployment();

  const deployedAddress = await tokenForge.getAddress();

  console.log("TokenForge deployed to:", deployedAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
