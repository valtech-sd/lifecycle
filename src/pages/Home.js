import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Space, Typography, Row, Col, Image } from "antd";
import { useMoralis, useNFTBalances } from "react-moralis";
import Header from "../components/Header";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
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

  const sendNFT = () => {
    // Steps:
    // 1. NFT is minted by brand
    // 2. NFT is purchased
    // 3. Customer accesses app, logs in to Wallet
    // 4. Customer is 'approved'
    // 5. Customer scans item, 'safeTransfer' to Customer
    // 6. Customer views item in app as an NFT

    nftContract.methods
      .transferFrom(brandAccount, account, 5)
      .send({ from: brandAccount })
      .then((res) => {
        console.log("Transferred NFT to buyer", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <Typography>NFT #2</Typography>
              <Typography>{account}</Typography>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              <Button type="primary" className="button" onClick={login}>
                Connect Wallet
              </Button>
            </Col>

            <Col span="24" align="middle">
              <Button type="primary" onClick={logOut}>
                Disconnect Wallet
              </Button>
            </Col>

            <Col span="24" align="middle">
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
              <Button type="primary" onClick={() => sendNFT()}>
                Transfer NFT
              </Button>
            </Col>

            <Col span="24" align="middle">
              <Button type="primary" onClick={() => addApprovedAccount()}>
                Set Approved Account
              </Button>
            </Col>
          </Row>
        </div>
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
      </div>
    </>
  );
};

export default Home;

// const clearWalletConnectConnection = () => {
//   if (account) {
//   }
//   window.localStorage.removeItem("walletconnect");
// };

// const handleConnectToWallet = () => {
//   // Create a connector
//   const connector = new WalletConnect({
//     bridge: "https://bridge.walletconnect.org", // Required
//     qrcodeModal: QRCodeModal,
//   });
//   // Check if connection is already established
//   if (!connector.connected) {
//     // create new session
//     connector.createSession();
//   }

//   // Subscribe to connection events
//   connector.on("connect", (error, payload) => {
//     if (error) {
//       throw error;
//     }

//     console.log("CONNECTING", payload.params[0].accounts);
//     // setAccount(payload.params[0].accounts[0]);

//     // Get provided accounts and chainId
//     const { accounts, chainId } = payload.params[0];
//   });

//   connector.on("session_update", (error, payload) => {
//     if (error) {
//       throw error;
//     }

//     // Get updated accounts and chainId
//     const { accounts, chainId } = payload.params[0];
//   });

//   connector.on("disconnect", (error, payload) => {
//     if (error) {
//       console.log("DISCONNECTING YOO");
//       throw error;
//     }

//     // setAccount("");
//   });
// };
