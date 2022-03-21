import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { Row, Col, Button, Typography } from "antd";
import Header from "../components/Header";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const ClaimOwnership = () => {
  const [data, setData] = useState("No result");
  const { account } = useMoralis();

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

  const sendNFT = () => {
    // Steps:
    // 1. NFT is minted by brand
    // 2. NFT is purchased
    // 3. Customer accesses app, logs in to Wallet
    // 4. Customer is 'approved'
    // 5. Customer scans item, 'safeTransfer' to Customer
    // 6. Customer views item in app as an NFT

    // Mechanism to authorize and transfer NFT to yourself.
    // You have to enter a passphrase we provide in an email.
    // when you enter the passphrase, and successfully authenticate, we remove the passphrase from the list of approved passphrases
    // You are transferred the NFT and can view

    // If you want to transfer to someone else, you can enter an email address of the person you are transferring to
    // That person opens the email, and has access to a new passphrase.... that passphrase allows them to transfer the NFT to themself.
    // Once they enter the new passphrase, the previous owner's passphrase is deleted so they cannot reclaim

    console.log("BRAND ACCT", brandAccount);
    console.log("THIS ACCT", account);

    nftContract.methods
      .transferFrom(brandAccount, account, 6)
      .send({ from: brandAccount })
      .then((res) => {
        console.log("Transferred NFT to buyer", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClick = () => {
    const dataQR = JSON.parse(data);
    console.log(dataQR.id);
    console.log(dataQR.c_id);
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
              <Typography>{account}</Typography>
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
