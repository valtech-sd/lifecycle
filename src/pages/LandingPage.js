import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button, Row, Col, Image, Timeline } from "antd";
import styled from "styled-components";

import ValtechLogo from "../assets/valtechLogo.png";
import TransferDemoVideo from "../assets/demo-app-transfer.mp4";
import ViewDemoVideo from "../assets/demo-app-overview.mp4";
import EtherscanDemoVideo from "../assets/demo-view-etherscan.mp4";
import "../utils/animate-background";
import { COLORS, SIZES, FONT_SIZES } from "../utils/global";

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

const VideoContainer = styled.video`
  max-width: 400px;
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

const ParagraphTypography = styled.div`
  color: white;
`;

const LandingPage = () => {
  const location = useLocation();

  return (
    <>
      <Container className={location.pathname === "/" ? "a" : ""}>
        <Section>
          <Row>
            <Col span="24" align="middle">
              <Image src={ValtechLogo} width="200px" />
              <HeaderTypography>
                Lifecycle: The Future of Digital Ownership
              </HeaderTypography>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <HeaderTypography>Check it out</HeaderTypography>
              <HeaderTypography>Check it out</HeaderTypography>
              <HeaderTypography>Check it out</HeaderTypography>
            </Col>
            <Col span="12">
              <HeaderTypography>Check it out</HeaderTypography>
              <Timeline>
                <Timeline.Item
                  style={{ color: "white" }}
                  position="left"
                  color="white"
                >
                  <HeaderTypography>Request an NFT</HeaderTypography>
                  <ParagraphTypography>
                    Email (max.mcgee@valtech.com) with your Ethereum account
                    address, full name, and company name.
                  </ParagraphTypography>
                </Timeline.Item>
                <Timeline.Item
                  style={{ color: "white" }}
                  position="left"
                  color="white"
                >
                  <HeaderTypography>
                    Install MetaMask app on iOS or Android
                  </HeaderTypography>
                  <Col span="24">
                    <a
                      href="https://metamask.io/download/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <StyledButton type="primary">
                        Download MetaMask
                      </StyledButton>
                    </a>
                  </Col>
                </Timeline.Item>
                <Timeline.Item
                  style={{ color: "white" }}
                  position="left"
                  color="white"
                >
                  <HeaderTypography>
                    Open the App from the MetaMask Browser
                  </HeaderTypography>
                  <Col span="24">
                    <Link to="app">
                      <StyledButton type="primary">Link to App</StyledButton>
                    </Link>
                  </Col>
                </Timeline.Item>
                <Timeline.Item
                  style={{ color: "white" }}
                  position="left"
                  color="white"
                >
                  <HeaderTypography>
                    View, Transfer and Share your NFT
                  </HeaderTypography>
                </Timeline.Item>
              </Timeline>
            </Col>
          </Row>
          <Row>
            <Col span="12" align="middle">
              <HeaderTypography>Demo: Transfer the Product</HeaderTypography>
              <VideoWrapper>
                <VideoContainer controls>
                  <source src={TransferDemoVideo} type="video/mp4"></source>
                </VideoContainer>
              </VideoWrapper>
            </Col>
            <Col span="12" align="middle">
              <HeaderTypography>Demo: View the Product</HeaderTypography>
              <VideoWrapper>
                <VideoContainer controls>
                  <source src={ViewDemoVideo} type="video/mp4"></source>
                </VideoContainer>
              </VideoWrapper>
            </Col>
          </Row>
          <Row>
            <Col span="24" align="middle">
              <HeaderTypography>Demo: View on Etherscan</HeaderTypography>
              <VideoWrapper>
                <VideoContainer controls>
                  <source src={EtherscanDemoVideo} type="video/mp4"></source>
                </VideoContainer>
              </VideoWrapper>
            </Col>
          </Row>
          <Row>
            <Col span="24" align="middle">
              <Image src={ValtechLogo} width="200px" />
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
