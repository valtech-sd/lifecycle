import React, { useState, useEffect } from "react";
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

  const contract = require("../contractABIs/V_Auth_NFT.json");
  const contractAddress = "0xdFad5CDC3Bdef5EEf621C87847d61CC738320891";
  const nftContract = new web3Js.eth.Contract(contract.abi, contractAddress, {
    from: "0xfe679bdf8d36C2d9742B6F5366d13D068E556A4c", // default from address
  });

  const sendNFT = () => {
    console.log("THIS ACCT", account);
    nftContract.methods
      .transferFrom(brandAccount, account, 11)
      .send({ from: brandAccount })
      .then((res) => {
        console.log("Transferred NFT to buyer", res);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location =
      "https://metamask.app.link/wc?uri=wc%3A88ce919b-56ff-48f6-b7b4-7a57ff93f07c%401%3Fbridge%3Dhttps%253A%252F%252Fh.bridge.walletconnect.org%26key%3Df16b671a41cdb637ca440e2593860081319b4a79ac8a9391f827244e63eab965";
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
