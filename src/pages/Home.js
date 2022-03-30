import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col } from "antd";
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import Web3 from "web3";

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
  border: 1px white solid;
  width: 100%;
`;

const StyledButton = styled(Button)`
  cursor: pointer;
  background: ${COLORS.green};
  color: black;
  border: none;
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
  const { logout, authenticate, isAuthenticated, provider, account } =
    useMoralis();

  const web3Js = new Web3(provider);

  const logOut = async () => {
    await logout();
    console.log("Logged Out");
  };

  // https://community.metamask.io/t/deeplink-opens-appstore-when-app-installed/18199/4
  async function authWalletConnect() {
    console.log("Authenticating user");

    if (isAuthenticated) return navigate("nfts");

    authenticate({
      provider: "walletconnect",
      chainId: 4,
      mobileLinks: ["metamask", "trust", "rainbow"],
      signingMessage: "Welcome to V_Auth, please confirm your account.",
    });
  }

  async function authWalletDisconnect() {
    await web3Js.eth.currentProvider.disconnect();
    console.log("Disconnected user");
  }

  return (
    <>
      <Container className="a">
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
              <Link to="/nfts">
                {isAuthenticated && account && (
                  <StyledButton type="primary" onClick={authWalletDisconnect}>
                    Disconnect
                  </StyledButton>
                )}
                {(!isAuthenticated || !account) && (
                  <StyledButton type="primary" onClick={authWalletConnect}>
                    Login
                  </StyledButton>
                )}
              </Link>
              <a
                href="https://www.valtech.com/"
                target="_blank"
                rel="noreferrer"
              >
                <StyledButton type="primary" onClick={logOut}>
                  Register
                </StyledButton>
              </a>
            </Col>
          </Row>
        </Section>
      </Container>
    </>
  );
};

export default Home;
