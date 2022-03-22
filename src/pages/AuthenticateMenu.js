import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "antd";
import Header from "../components/Header";
import { useMoralis } from "react-moralis";
import Web3 from "web3";

import WalletConnectProvider from "@walletconnect/web3-provider";

const AuthenticateMenu = () => {
  const {
    authenticate,
    isWeb3Enabled,
    isAuthenticated,
    user,
    enableWeb3,
    Moralis,
  } = useMoralis();

  async function authWalletConnect() {
    const user = authenticate({
      provider: "walletconnect",
      chainId: 4,
      mobileLinks: ["metamask", "trust", "rainbow"],
      signingMessage: "Welcome!",
    });
    console.log(user);
  }

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      enableWeb3({ provider: "walletconnect", chainId: 4 });
      console.log("web3 activated");
    }
  }, [isWeb3Enabled, isAuthenticated, enableWeb3]);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    }
  });

  const clearWalletConnectConnection = () => {
    window.localStorage.removeItem("walletconnect");
    window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
  };

  const handleConnectToWallet2 = async () => {
    const user = await Moralis.authenticate({
      provider: "walletconnect",
      chainId: 4,
      mobileLinks: ["rainbow", "metamask", "argent", "trust"],
    });

    // //  Create WalletConnect Provider
    // provider = new WalletConnectProvider({
    //   infuraId: "7037ffa8d58e4057b98827b5a66ec722",
    //   qrcodeModalOptions: {
    //     mobileLinks: [
    //       "rainbow",
    //       "metamask",
    //       "argent",
    //       "trust",
    //       "imtoken",
    //       "pillar",
    //     ],
    //   },
    // });

    // //  Enable session (triggers QR Code modal)
    // await provider.enable();

    // const web3 = new Web3(provider);
  };

  return (
    <>
      <div className="container">
        <Header />

        <div className="section">
          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              <h1>Welcome to V_AUTH !!</h1>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              <Link to="/claim-ownership" className="categories">
                <Button type="primary" className="button">
                  Claim Ownership
                </Button>
              </Link>
            </Col>
            <Col span="24" align="middle">
              <Button
                type="primary"
                className="button"
                onClick={authWalletConnect}
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

// const { authenticate, isAuthenticated, logout, account } = useMoralis();

// const login = async () => {
//   console.log(isAuthenticated, account);
//   if (!isAuthenticated || !account) {
//     await authenticate({ provider: "walletconnect" })
//       .then(function (user) {
//         console.log("logged in user:", user);
//         console.log(user.get("ethAddress"));
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }
// };

// const logOut = async () => {
//   await logout();
//   console.log("Logged Out");
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
