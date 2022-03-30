const { ethers } = require("hardhat");

async function main() {
  const V_Auth_NFT1 = await ethers.getContractFactory("V_Auth_NFT1");

  // Start deployment, returning a promise that resolves to a contract object
  console.log("TES2T");
  const myNFT = await V_Auth_NFT1.deploy();
  console.log("TEST");
  await myNFT.deployed();
  console.log("Contract deployed to address:", myNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//   0x74D60c88Ecbae179409b7d873386F30C1511F8D8
