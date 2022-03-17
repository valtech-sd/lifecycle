import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "antd";
import Header from "../components/Header";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import "./Home.css";

const { Paragraph } = Typography;

const Home = () => {
  const [account, setAccount] = useState("");

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

      console.log("PAYLOAD", payload);
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
        throw error;
      }

      // Delete connector
    });
  };

  return (
    <>
      <div className="container">
        <Header />
        <div className="section">
          <h1>Welcome !</h1>
          <Typography>{account}</Typography>

          <Button type="primary" onClick={() => handleConnectToWallet()}>
            Connect Wallet
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
