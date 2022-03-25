import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useMoralis } from "react-moralis";
import { Row, Col, Button } from "antd";
import Web3 from "web3";
import Header from "../components/Header";
import "dotenv/config";
const CryptoJS = require("crypto-js");

const ClaimOwnership = () => {
  const [data, setData] = useState("No result");
  const { account, provider } = useMoralis();
  const web3Js = new Web3(provider);
  const brandAccount = "0xfe679bdf8d36C2d9742B6F5366d13D068E556A4c";
  const contract = require("../contractABIs/V_Authenticate.json");
  const contractAddress = "0x3651624F81468bB5864B1ab3158907B070eE3600";
  const nftContract = new web3Js.eth.Contract(contract.abi, contractAddress);

  // https://github.com/brix/crypto-js/issues/93
  const encryptWithAES = (text) => {
    return CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(text),
      process.env.REACT_APP_PASSPHRASE_AUTH
    ).toString();
  };

  const publickeys = [
    "53d468611cb88539428bc12ec0daf74b",
    "cd583bc51f247524aed7e4c748f8a2b4",
    "0edaf23c93035f182f5719f6df517ae5",
    "69b52ca7ce7d40594c999287aa31e855",
    "182a922c7fd54c782217bb1f689f3060",
  ];
  const encryptQRs = () => {
    return publickeys.map((key) => {
      return encryptWithAES(key);
    });
  };
  const qrCodes = encryptQRs();

  const codes = [
    "U2FsdGVkX1+0lj6hEQyRJ66kPnL3aukx7p6cs8Qzpi83FyLL/8P4knjF9BOYFW5Pjk2g6HUD0L/hC+Q6kdMWRg==",
    "U2FsdGVkX1/I3RbK3y4iBtQ4PRXXBqXHcIJRONYYD0EDOm2wA9ipZV8gDmi3tcUQ0f5uCgA5ObYFK4RBJ5l3sw==",
    "U2FsdGVkX1+OoajrkuHZqCDfW2v8z9k+2nFRedIbI87hAejQlYA/Vu9bjGRyl4j6HPUpFEybeiIiYAGlPir0cg==",
    "U2FsdGVkX18YBRyjEPGj1NVC2MixTeHnniJSF8vlebigYyObFVG8nSrZgNwaYJQQbZESeR0eDbpyHEe49MWJjQ==",
    "U2FsdGVkX1+puWS4ZRGKqfmamDOWmWN+i4KyHDN64GQppJbnVv2iObuhZwKJfsoc++91SH/tnIcF3DF51+7beA==",
  ];

  const decryptWithAES = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(
      ciphertext,
      process.env.REACT_APP_PASSPHRASE_AUTH
    );
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };

  const sendNFT = async () => {
    // https://ethereum.stackexchange.com/questions/48750/how-to-sign-a-send-method-in-web3-1-0
    let tx_builder = nftContract.methods.transferFrom(brandAccount, account, 1);
    let encoded_tx = tx_builder.encodeABI();
    var nonce = await web3Js.eth.getTransactionCount(brandAccount);

    const gasPrice = web3Js.eth.gasPrice;
    const gasPriceHex = web3Js.utils.toHex(gasPrice);
    const gasLimitHex = web3Js.utils.toHex(3000000);
    // Create the contract creation transaction object

    // https://ethereum.org/en/developers/docs/transactions/#the-data-field
    var txObject = {
      nonce: web3Js.utils.toHex(nonce),
      gasPrice: gasPriceHex,
      gasLimit: gasLimitHex,
      data: encoded_tx,
      from: brandAccount,
      to: "0x3651624F81468bB5864B1ab3158907B070eE3600",
    };

    // code on item is unique hash
    // whoever has the hash can verify the item
    // the hash needs to be the public key of a private/public key pair so that someone with QR code needs to also have the private key

    //rinkeby.etherscan.io/address/0x3651624F81468bB5864B1ab3158907B070eE3600
    web3Js.eth.accounts
      .signTransaction(txObject, process.env.REACT_APP_PASSPHRASE_AUTH)
      .then((signedTx) => {
        console.log("signed", signedTx);
        web3Js.eth
          .sendSignedTransaction(signedTx.rawTransaction)
          .on("transactionHash", (hash) => {
            console.log("txHash:", hash);
          })
          .on("receipt", (receipt) => {
            console.log("receipt", receipt);
          })
          .on("error", (error) => {
            console.log("error", error);
          });
      });
  };

  const onClick = () => {
    console.log(data);
    const dataQR = JSON.parse(data);
    console.log(dataQR.id);
    console.log(dataQR.code);

    const decryptedCode = decryptWithAES(dataQR.code);
    console.log("includes code??", publickeys.includes(decryptedCode));
    // passphrase
    // private key
    // Authenticate here
    if (publickeys.includes(decryptedCode)) {
      sendNFT(dataQR.id);
    }
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
                // constraints={{ facingMode: { exact: "environment" } }}
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
