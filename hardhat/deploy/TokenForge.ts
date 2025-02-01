import { ethers } from "hardhat";

async function main() {
  const tokenCollectionAddress =
    "0x8B8BA7B3E324bE280096583B99eef49117E7F872";

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
