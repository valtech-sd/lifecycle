import React from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Typography } from "antd";
import Header from "../components/Header";
import { useMoralis } from "react-moralis";

const AuthenticateMenu = () => {
  const { authenticate, account } = useMoralis();

  async function authWalletConnect() {
    console.log("Authenticating user");
    authenticate({
      provider: "walletconnect",
      chainId: 4,
      mobileLinks: ["metamask", "trust", "rainbow"],
      signingMessage: "Welcome to V_Auth, please confirm your account.",
    });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    }
  });

  const clearWalletConnectConnection = () => {
    window.localStorage.removeItem("walletconnect");
    window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    console.log("Wallet Disconnected");
  };

  return (
    <>
      <div className="container">
        <Header />

        <div className="section">
          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              <h1>Welcome to V_AUTH !!</h1>
              {account && (
                <Typography style={{ fontFamily: "Lato" }}>
                  You are logged in, {account}
                </Typography>
              )}
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
