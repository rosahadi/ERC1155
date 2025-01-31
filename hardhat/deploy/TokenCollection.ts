import { ethers } from "hardhat";

async function main() {
  const TokenCollection = await ethers.getContractFactory(
    "TokenCollection"
  );

  const tokenCollection = await TokenCollection.deploy();

  await tokenCollection.waitForDeployment();

  const deployedAddress =
    await tokenCollection.getAddress();

  console.log(
    "TokenCollection deployed to:",
    deployedAddress
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
