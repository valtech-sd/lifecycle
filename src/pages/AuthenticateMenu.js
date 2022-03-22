import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Row, Col } from "antd";
import { useMoralis } from "react-moralis";
import Header from "../components/Header";
import WalletConnect from "@walletconnect/client";
// import QRCodeModal from "@walletconnect/qrcode-modal";

import WalletConnectClient, { CLIENT_EVENTS } from "@walletconnect/client";
import EthereumProvider from "@walletconnect/ethereum-provider";
import { PairingTypes, SessionTypes } from "@walletconnect/types";
import QRCodeModal from "@walletconnect/qrcode-modal";

const AuthenticateMenu = () => {
  const { authenticate, isAuthenticated, logout, account } = useMoralis();

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

  const clearWalletConnectConnection = () => {    
    window.localStorage.removeItem("walletconnect");
    window.localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE'); 

  };

  const handleConnectToWallet2 = async () => {
    // 1. Create a WalletConnect Client
    const client = await WalletConnectClient.init({
      projectId: "6fa38957f6fdd7e4324b5002dceeca3f",
      relayUrl: "wss://relay.walletconnect.com",
    });

    // 2. Subscribe to client events

    client.on(
      CLIENT_EVENTS.pairing.proposal,
      async (proposal: PairingTypes.Proposal) => {
        // Display the QRCode modal on a new pairing request.
        const { uri } = proposal.signal.params;
        console.log("EVENT", "QR Code Modal opened");
        QRCodeModal.open(uri, () => {
          console.log("EVENT", "QR Code Modal closed");
        });
      }
    );

    client.on(
      CLIENT_EVENTS.session.deleted,
      (deletedSession: SessionTypes.Settled) => {
        // Perform some cleanup after session was deleted (e.g. via `provider.disconnect()`)
      }
    );

    // 3. Create EthereumProvider (with default RPC configuration) by passing in the `client` instance.
    const provider = new EthereumProvider({
      chainId: 4,
      client,
    });

    // 4. Enable session (triggers `CLIENT_EVENTS.pairing.proposal` event).
    await provider.enable();
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
      // setAccount(payload.params[0].accounts[0]);

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

      // setAccount("");
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
              {account && (
                <Link to="/claim-ownership" className="categories">
                  <Button type="primary" className="button">
                    Claim Ownership
                  </Button>
                </Link>
              )}
            </Col>
            <Col span="24" align="middle">
              <Button
                type="primary"
                className="button"
                onClick={handleConnectToWallet2}
              >
                Connect Your Wallet
              </Button>
            </Col>

            <Col span="24" align="middle">
              <Button type="primary" onClick={clearWalletConnectConnection}>
                Disconnect Your Wallet
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default AuthenticateMenu;
