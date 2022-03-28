import React from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "antd";
import { useMoralis } from "react-moralis";
import "./Home.css";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { COLORS, SIZES, FONT_SIZES } from "../utils/global";
import { useNavigate } from "react-router-dom";

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
  const { logout, authenticate, isAuthenticated } = useMoralis();

  const logOut = async () => {
    await logout();
    console.log("Logged Out");
  };

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
                <StyledButton type="primary" onClick={authWalletConnect}>
                  Login
                </StyledButton>
              </Link>
              <a href="https://www.valtech.com/" target="_blank">
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
