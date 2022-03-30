import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Row, Col } from "antd";
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import Web3 from "web3";

import "../utils/animate-background";

import { ReactComponent as Logo } from "../assets/logo.svg";
import { COLORS, SIZES, FONT_SIZES } from "../utils/global";
import AuthenticateMenu from "./AuthenticateMenu";

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
  width: 8rem;
  justify-content: center;
`;

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { enableWeb3, deactivateWeb3, isWeb3Enabled, logout, authenticate } =
    useMoralis();

  // const web3Js = new Web3(provider);

  const logOut = async () => {
    await logout();
    console.log("Logged Out");
  };

  // https://community.metamask.io/t/deeplink-opens-appstore-when-app-installed/18199/4
  // https://github.com/MetaMask/metamask-mobile/issues/3965
  // https://github.com/MetaMask/metamask-mobile/pull/3971/files
  async function authWalletConnect() {
    // if (!isWeb3Enabled) {
    //   // await enableWeb3();
    //   await authenticate({
    //     provider: "walletconnect",
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
  }

  async function authWalletDisconnect() {
    console.log("Disconnected user");
    await deactivateWeb3();
    await logout();
    window.localStorage.removeItem("walletconnect");
    window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
  }

  console.log(isWeb3Enabled);

  return (
    <>
      <Container className={location.pathname === "/" ? "a" : ""}>
        <Section>
          <Row gutter={[24, 80]}>
            <Col span="24" align="middle">
              <Logo />
            </Col>
            <Col
              span="24"
              align="middle"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {isWeb3Enabled && (
                <StyledButton type="primary" onClick={authWalletDisconnect}>
                  Disconnect
                </StyledButton>
              )}
              {!isWeb3Enabled && (
                <StyledButton type="primary" onClick={authWalletConnect}>
                  Login
                </StyledButton>
              )}
            </Col>
          </Row>
        </Section>
      </Container>
    </>
  );
};

export default Home;
