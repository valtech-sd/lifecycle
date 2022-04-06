import React from "react";
import { Button, Typography, Row, Col } from "antd";
import Header from "../components/Header";
import "./Admin.css";
import { useMoralis } from "react-moralis";

import Web3 from "web3";

const Admin = () => {
  const { account, provider } = useMoralis();

  // Enable web3 and get the initialized web3 instance from Web3.js
  const web3Js = new Web3(provider);

  const brandAccount = "0xfe679bdf8d36C2d9742B6F5366d13D068E556A4c";
  const contract = require("../contractABIs/V_Authenticate.json");

  const contractAddress = "0x43b92b42ee33fC01f4d9A3249E478F7bc0cFCC0c";
  const nftContract = new web3Js.eth.Contract(contract.abi, contractAddress, {
    from: "0xfe679bdf8d36C2d9742B6F5366d13D068E556A4c", // default from address
  });

  const mintNFT = async () => {
    nftContract.methods
      .mintNFT(
        brandAccount,
        "https://gateway.pinata.cloud/ipfs/QmUuykidbcxAyQXnoAQAojupaABfz1sXjgRLhfLezhhjYp/nft-1.json"
      )
      .send({ from: brandAccount })
      .then((res) => {
        console.log("Finished minting an NFT", res);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location =
      "https://metamask.app.link/wc?uri=wc%3A88ce919b-56ff-48f6-b7b4-7a57ff93f07c%401%3Fbridge%3Dhttps%253A%252F%252Fh.bridge.walletconnect.org%26key%3Df16b671a41cdb637ca440e2593860081319b4a79ac8a9391f827244e63eab965";
  };

  return (
    <>
      <div className="container">
        <Header />

        <div className="section">
          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              <h1>Admin</h1>
              <Typography style={{ fontFamily: "Lato" }}>{account}</Typography>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              <Button type="primary" onClick={() => mintNFT()}>
                Mint a new NFT
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Admin;
