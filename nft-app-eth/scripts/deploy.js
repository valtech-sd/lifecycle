const { ethers } = require("hardhat");

async function main() {
  const V_Auth_NFT = await ethers.getContractFactory("V_Auth_NFT");

  // Start deployment, returning a promise that resolves to a contract object
  const myNFT = await V_Auth_NFT.deploy();
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
