import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Space, Typography, Row, Col, Image } from "antd";
import { useMoralis, useNFTBalances } from "react-moralis";
import Header from "../components/Header";
import WalletConnect from "@walletconnect/client";
import "./Home.css";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { mnemonicToSeed } from "ethers/lib/utils";
import { Wallet } from "ethers";
import Item from "antd/lib/list/Item";
// import { mintNFT } from "../nft-app-eth/scripts/mint-nft.js";

const Home = () => {
  const { authenticate, isAuthenticated, logout, account } = useMoralis();
  const { data: NFTBalances, error } = useNFTBalances();
  const [owner, setOwner] = useState("");
  const [approved, setApproved] = useState("");
  const brandAccount = "0xfe679bdf8d36C2d9742B6F5366d13D068E556A4c";

  const web3 = createAlchemyWeb3(
    "https://eth-rinkeby.alchemyapi.io/v2/zCr9eFAjZ5vhp8RTZRLO-6LnJz2axXTv"
  );

  const contract = require("../contractABIs/V_Auth_NFT.json");
  const contractAddress = "0xdFad5CDC3Bdef5EEf621C87847d61CC738320891";
  // https://rinkeby.etherscan.io/address/0xdFad5CDC3Bdef5EEf621C87847d61CC738320891
  const nftContract = new web3.eth.Contract(contract.abi, contractAddress, {
    from: "0xfe679bdf8d36C2d9742B6F5366d13D068E556A4c", // default from address
  });

  const nftOfInterest =
    NFTBalances &&
    NFTBalances.result.find((nft) => {
      return (
        nft.token_address == contractAddress.toLowerCase() &&
        nft.token_id == "5"
      );
    });
  console.log(nftOfInterest);

  // console.log(nftContract.methods);

  const login = async () => {
    console.log(isAuthenticated, account);
    if (!isAuthenticated || !account) {
      await authenticate({ provider: "walletconnect" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("Logged Out");
  };

  const addApprovedAccount = async () => {
    console.log("Logged in:", brandAccount);

    nftContract.methods
      .approve(brandAccount, 2)
      .send({ from: account })
      .then((res) => {
        console.log("Finished adding approved account", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const checkOwner = async () => {
    console.log("Logged in:", account);
    nftContract.methods
      .ownerOf(2)
      .call()
      .then((res) => {
        console.log("Owner Of NFT: ID 2", res);
        setOwner(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkApproved = async () => {
    console.log("Logged in:", account);
    nftContract.methods
      .getApproved(2)
      .call()
      .then((res) => {
        console.log("Approved for ID 1", res);
        setApproved(res);
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
              <h1>Welcome to V_AUTH !!</h1>
              <Typography>{account}</Typography>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              <Link to="/input-pin" className="categories">
                <Button type="primary" className="button">
                  New User
                </Button>
              </Link>
            </Col>

            <Col span="24" align="middle">
              <Button type="primary" onClick={logOut}>
                Existing User
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Home;

{
  /* <Col span="24" align="middle">
              <Button type="primary" onClick={() => checkOwner()}>
                Who is Owner?
              </Button>
            </Col>
            <Col span="24" align="middle">
              {owner}
            </Col>

            <Col span="24" align="middle">
              <Button type="primary" onClick={() => checkApproved()}>
                Who is Approved?
              </Button>
            </Col>
            <Col span="24" align="middle">
              {approved}
            </Col>

            <Col span="24" align="middle">
              <Button type="primary" onClick={() => mintNFT()}>
                Mint a new NFT
              </Button>
            </Col>

            <Col span="24" align="middle">
              <Button type="primary" onClick={() => addApprovedAccount()}>
                Set Approved Account
              </Button>
            </Col> */
}
