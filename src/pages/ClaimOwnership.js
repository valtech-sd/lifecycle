import React, { useState, useEffect, useContext } from "react";
import { QrReader } from "react-qr-reader";
import { useMoralis } from "react-moralis";
import { Row, Col, Button } from "antd";
import Web3 from "web3";
import Header from "../components/Header";

const ClaimOwnership = () => {
  const [data, setData] = useState("No result");
  const { account, provider } = useMoralis();

  const brandAccount = "0xfe679bdf8d36C2d9742B6F5366d13D068E556A4c";

  // Enable web3 and get the initialized web3 instance from Web3.js
  const web3Js = new Web3(provider);

  const contract = require("../contractABIs/V_Authenticate.json");
  const contractAddress = "0x3651624F81468bB5864B1ab3158907B070eE3600";
  const nftContract = new web3Js.eth.Contract(contract.abi, contractAddress);

  const sendNFT = async () => {
    console.log("BRAND ACCT", brandAccount);
    console.log("This ACCT", account);
    // https://ethereum.stackexchange.com/questions/48750/how-to-sign-a-send-method-in-web3-1-0
    let tx_builder = nftContract.methods.transferFrom(brandAccount, account, 2);
    let encoded_tx = tx_builder.encodeABI();

    web3Js.eth
      .getTransactionCount(brandAccount, "pending")
      .then(async (txnCount) => {
        console.log("txnCount", txnCount);
        // Create the contract creation transaction object
        var txObject = {
          nonce: web3Js.utils.toHex(txnCount),
          gasPrice: web3Js.utils.toHex(1000),
          gasLimit: web3Js.utils.toHex(126165),
          data: encoded_tx,
          from: brandAccount,
          to: "0x062BcE1640F79bFa7B0B79dAb0e413C54299c556",
        };

        //rinkeby.etherscan.io/address/0x3651624F81468bB5864B1ab3158907B070eE3600

        await web3Js.eth.accounts
          .signTransaction(
            txObject,
            "f50cb06efe67806c38e55b1678d248dc1de89f377c2e4c48f4f175c5bea883b2"
          )
          .then(async (signedTx) => {
            console.log("signed", signedTx);
            await web3Js.eth
              .sendSignedTransaction(signedTx.rawTransaction)
              .on("transactionHash", (hash) => {
                console.log("txHash:", hash);
              })
              .on("receipt", (receipt) => {
                console.log("receipt", receipt);
              })
              .on("error", (error) => {
                console.log("errpr", error);
              });
          });
      });
    // nftContract.methods
    //   .transferFrom(brandAccount, account, 2)
    //   .send({ from: account })
    //   .then((res) => {
    //     console.log("Transferred NFT to buyer", res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // window.location =
    //   "https://metamask.app.link/wc?uri=wc%3A88ce919b-56ff-48f6-b7b4-7a57ff93f07c%401%3Fbridge%3Dhttps%253A%252F%252Fh.bridge.walletconnect.org%26key%3Df16b671a41cdb637ca440e2593860081319b4a79ac8a9391f827244e63eab965";
    // add NFT info to global state
  };

  const onClick = () => {
    // const dataQR = JSON.parse(data);
    // console.log(dataQR.id);
    // console.log(dataQR.c_id);
    // Authenticate here
    sendNFT();
  };

  return (
    <>
      <div className="container">
        <Header />

        <div className="section">
          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              <h1>Claim Ownership</h1>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              <QrReader
                constraints={{ facingMode: { exact: "environment" } }}
                onResult={(result, error) => {
                  if (!!result) {
                    setData(result?.text);
                  }

                  if (!!error) {
                    console.info(error);
                  }
                }}
                style={{ width: "100%" }}
              />
              <p>{data}</p>
            </Col>

            <Col span="24" align="middle">
              <Button type="primary" className="button" onClick={onClick}>
                Claim Ownership
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ClaimOwnership;
