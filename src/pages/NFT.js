import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Row, Col, Image } from "antd";
import { useMoralis, useNFTBalances } from "react-moralis";
import Header from "../components/Header";
import "./NFT.css";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const NFT = () => {
  const { authenticate, isAuthenticated, logout, account } = useMoralis();
  const { data: NFTBalances, error } = useNFTBalances();

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

  return (
    <>
      <div className="container">
        <Header />

        <div className="section">
          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              <h1>NFT</h1>
              <Typography>{account}</Typography>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            {nftOfInterest && (
              <div className="section">
                <Typography>{nftOfInterest.metadata.name}</Typography>
                <Typography>{nftOfInterest.metadata.description}</Typography>
                <Typography>
                  {nftOfInterest.metadata.attributes.map((attribute) => {
                    const value =
                      attribute.display_type == "date"
                        ? new Date(attribute.value).toLocaleDateString("en-US")
                        : attribute.value;
                    return (
                      <div>
                        {`${attribute.trait_type}: ${value}`}
                        <br />
                      </div>
                    );
                  })}
                </Typography>
                <Image width={200} src={nftOfInterest.metadata.image} />
                <pre>{JSON.stringify(NFTBalances, null, 2)}</pre>
              </div>
            )}
          </Row>
        </div>
      </div>
    </>
  );
};

export default NFT;
