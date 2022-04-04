import React from "react";
import {
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
  Link,
} from "react-router-dom";
import { Button, Row, Col, Typography, Image } from "antd";
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import ValtechLogo from "../assets/valtechLogo.png";
import TransferDemoVideo from "../assets/demo-app-transfer.mp4";
import ViewDemoVideo from "../assets/demo-app-overview.mp4";
import EtherscanDemoVideo from "../assets/demo-view-etherscan.mp4";
import Web3 from "web3";

import "../utils/animate-background";

import { COLORS, SIZES, FONT_SIZES } from "../utils/global";
import AuthenticateMenu from "./AuthenticateMenu";
import { useEffect } from "react/cjs/react.production.min";

const Container = styled.div`
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Section = styled.div`
  margin: ${SIZES.xl};
  width: 100%;
  height: 100%;
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
`;

const VideoWrapper = styled.div`
  max-width: 320px;
`;

const HeaderTypography = styled.h2`
  color: white;
  font-weight: 700;
`;

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Section>
          <Row gutter={[24, 80]}>
            <Col span="24" align="middle">
              <Image src={ValtechLogo} width="200px" />
            </Col>

            <Col span="24">
              <HeaderTypography>Demo: Transfer the Product</HeaderTypography>
              <VideoWrapper>
                <video controls>
                  <source src={TransferDemoVideo} type="video/mp4"></source>
                </video>
              </VideoWrapper>
            </Col>

            <HeaderTypography>Demo: View the NFT</HeaderTypography>
            <Col span="24">
              <Link to="app">
                <StyledButton type="primary">Link to App</StyledButton>
              </Link>
            </Col>

            <HeaderTypography>Demo: Transfer the Product</HeaderTypography>
            <Col span="24">
              <VideoWrapper>
                <video controls>
                  <source src={ViewDemoVideo} type="video/mp4"></source>
                </video>
              </VideoWrapper>
            </Col>

            <HeaderTypography>Demo: View on Etherscan</HeaderTypography>
            <Col span="24">
              <VideoWrapper>
                <video controls>
                  <source src={EtherscanDemoVideo} type="video/mp4"></source>
                </video>
              </VideoWrapper>
            </Col>
          </Row>
        </Section>
      </Container>
    </>
  );
};

export default LandingPage;

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
