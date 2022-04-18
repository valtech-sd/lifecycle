import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Row, Col, Typography } from "antd";
import { useMoralis } from "react-moralis";
import styled from "styled-components";

import "../utils/animate-background";

import { ReactComponent as Logo } from "../assets/logo.svg";
import { COLORS, SIZES, FONT_SIZES } from "../utils/global";

const Container = styled.div`
  background-color: ${COLORS.black};
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Section = styled.div`
  margin: ${SIZES.xl};
  width: 100%;
`;

const StyledButton = styled(Button)`
  cursor: pointer;
  background: ${COLORS.green};
  color: black;
  border: solid 1px ${COLORS.green};
  margin: 0 ${SIZES.xs};
  padding: ${SIZES.lg} ${SIZES.md};
  display: flex;
  align-items: center;
  font-size: ${FONT_SIZES.xs};
  font-weight: 700;
  text-transform: uppercase;
  width: 10rem;
  justify-content: center;
  font-family: Lato;
`;

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [browserErrorMessage, setBrowserErrorMessage] = useState("");

  const { deactivateWeb3, isWeb3Enabled, logout, authenticate, account } =
    useMoralis();

  // https://community.metamask.io/t/deeplink-opens-appstore-when-app-installed/18199/4
  // https://github.com/MetaMask/metamask-mobile/issues/3965
  // https://github.com/MetaMask/metamask-mobile/pull/3971/files
  async function authWalletConnect() {
    setBrowserErrorMessage("");
    await authenticate({
      provider: "metamask",
      chainId: 4,
      signingMessage:
        "Welcome to Future Studio Lifecycle, please confirm your wallet.",
    })
      .then(function (user) {
        console.log("logged in user:", user);
        if (user) {
          navigate("/app/nfts");
        } else {
          setBrowserErrorMessage(
            "Please try again, using the MetaMask in-app browser."
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function authWalletDisconnect() {
    console.log("Disconnected user");
    await deactivateWeb3();
    await logout();
    window.localStorage.removeItem("walletconnect");
    window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
  }

  const onClaimOwnership = async () => {
    if (!account || !isWeb3Enabled) {
      await authenticate({
        provider: "metamask",
        chainId: 4,
        signingMessage:
          "Welcome to Future Studio Lifecycle, please confirm your wallet.",
      })
        .then(function (user) {
          console.log("logged in user:", user);
          if (user) {
            navigate("/app/claim-ownership");
          } else {
            setBrowserErrorMessage(
              "Please try again, using the MetaMask in-app browser."
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      navigate("/app/claim-ownership");
    }
  };

  return (
    <>
      <Container className={location.pathname === "/app" ? "a" : ""}>
        <Section>
          <Row>
            <Col span="24" align="middle">
              <Logo />
            </Col>
            <Col
              span="24"
              align="middle"
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "4rem",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {isWeb3Enabled && account && (
                <>
                  <StyledButton
                    type="primary"
                    onClick={authWalletDisconnect}
                    style={{ marginBottom: "1.5rem" }}
                  >
                    Disconnect
                  </StyledButton>
                  <StyledButton
                    type="primary"
                    onClick={() => {
                      navigate("/app/nfts");
                    }}
                  >
                    View Your Products
                  </StyledButton>
                </>
              )}
              {!isWeb3Enabled && (
                <StyledButton type="primary" onClick={authWalletConnect}>
                  Login
                </StyledButton>
              )}
              <StyledButton
                type="primary"
                onClick={() => {
                  navigate("/app/scan");
                }}
                style={{ marginTop: "1.5rem" }}
              >
                SCAN PRODUCT
              </StyledButton>
              <StyledButton
                type="primary"
                onClick={onClaimOwnership}
                style={{ marginTop: "1.5rem" }}
              >
                CLAIM OWNERSHIP
              </StyledButton>
            </Col>
            {browserErrorMessage && (
              <Col span="24" align="middle">
                <Typography
                  style={{
                    color: "white",
                    paddingTop: "2rem",
                    fontSize: "1rem",
                    width: "260px",
                    textAlign: "left",
                  }}
                >
                  {browserErrorMessage}
                </Typography>
              </Col>
            )}
          </Row>
        </Section>
      </Container>
    </>
  );
};

export default Home;

// if (!isWeb3Enabled) {
//   // await enableWeb3();
//   await authenticate({
//     provider: "metamask",
//     chainId: 4,
//     mobileLinks: ["defi", "metamask", "coinbase"],
//     signingMessage: "Welcome to V_Auth, please confirm your account.",
//   });
//   navigate("/nfts");
// }
//   console.log("Authenticating user", account, isAuthenticated);
//   if (isAuthenticated && account) {
//     return navigate("nfts");
//   }
//   authenticate({
//     provider: "walletconnect",
//     chainId: 4,
//     mobileLinks: ["metamask", "trust", "rainbow"],
//     signingMessage: "Welcome to V_Auth, please confirm your account.",
//   });
