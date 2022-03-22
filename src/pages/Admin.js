import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Row, Col } from "antd";
import Header from "../components/Header";
import "./Admin.css";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { useMoralis } from "react-moralis";

const Admin = () => {
  const { account } = useMoralis();

  const contract = require("../contractABIs/V_Auth_NFT.json");

  console.log("ACCOUNT", account);

  const brandAccount = "0xfe679bdf8d36C2d9742B6F5366d13D068E556A4c";

  const web3 = createAlchemyWeb3(
    "https://eth-rinkeby.alchemyapi.io/v2/zCr9eFAjZ5vhp8RTZRLO-6LnJz2axXTv"
  );

  const contractAddress = "0xdFad5CDC3Bdef5EEf621C87847d61CC738320891";
  const nftContract = new web3.eth.Contract(contract.abi, contractAddress, {
    from: "0xfe679bdf8d36C2d9742B6F5366d13D068E556A4c", // default from address
  });

  const mintNFT = async () => {
    console.log("Minting NFT:", brandAccount);

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
  };

  return (
    <>
      <div className="container">
        <Header />

        <div className="section">
          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              <h1>Admin</h1>
              <Typography>{account}</Typography>
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
