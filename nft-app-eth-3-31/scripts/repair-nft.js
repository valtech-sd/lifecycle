require("dotenv").config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/Future_Studio_Token.sol/Future_Studio_Token.json");
const contractAddress = "0x43b92b42ee33fC01f4d9A3249E478F7bc0cFCC0c";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function repairProduct(tokenId, tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,

    data: nftContract.methods.repairProduct(tokenId, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

const repairData1 = {
  type: "Replace Broken Part",
  location: "Los Angeles, USA",
  partnerId: "13253",
  notes: "Handbag strap was damaged. Broken part was replaced.",
  costOfRepair: "$399.00 USD",
};

const repairData2 = {
  type: "Upgrade Specialty Part",
  location: "Atlanta, USA",
  partnerId: "23452",
  notes: "Handbag was upgraded with new leather addition",
  costOfRepair: "$899.00 USD",
};

const repairData3 = {
  type: "Restore Damaged Zipper",
  location: "New York, USA",
  partnerId: "11224",
  notes: "Handbag zipper needed to be replaced.",
  costOfRepair: "$499.00 USD",
};

repairProduct(5, JSON.stringify(repairData1));
