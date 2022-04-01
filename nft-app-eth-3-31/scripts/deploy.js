const { ethers } = require("hardhat");

async function main() {
  const Future_Studio_Lifecycle = await ethers.getContractFactory(
    "Future_Studio_Token"
  );

  // Start deployment, returning a promise that resolves to a contract object
  const myNFT = await Future_Studio_Lifecycle.deploy();
  await myNFT.deployed();
  console.log("Contract deployed to address:", myNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
