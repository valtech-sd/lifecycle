import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Space, Typography } from "antd";
import { useMoralis, useNFTBalances } from "react-moralis";
import Header from "../components/Header";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import "./Home.css";

const Home = () => {
  const [account, setAccount] = useState("");
  const { authenticate, isAuthenticated, user, logout } = useMoralis();

  const clearWalletConnectConnection = () => {
    if (account) {
      setAccount("");
    }
    window.localStorage.removeItem("walletconnect");
  };

  const handleConnectToWallet = () => {
    // Create a connector
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });
    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      connector.createSession();
    }

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      console.log("CONNECTING", payload.params[0].accounts);
      setAccount(payload.params[0].accounts[0]);

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        console.log("DISCONNECTING YOO");
        throw error;
      }

      setAccount("");
    });
  };

  const login = async () => {
    if (!isAuthenticated) {
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

  return (
    <>
      <div className="container">
        <Header />
        <div className="section">
          <h1>Welcome !</h1>
          <Typography>{account}</Typography>

          <Space size="large">
            <Button type="primary" className="button" onClick={login}>
              Connect Wallet
            </Button>

            <Button type="primary" onClick={logOut}>
              Disconnect Wallet
            </Button>
          </Space>
          <Space size="large">
            {/* {NFTBalances.result.map((nft) => {
              <div>{nft}</div>;
            })} */}
          </Space>
        </div>
      </div>
    </>
  );
};

export default Home;
