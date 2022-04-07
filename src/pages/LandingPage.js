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
import { ReactComponent as Logo } from "../assets/logo.svg";

const Container = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;

  @media (min-width: 768px) {
    margin: 0;
  }
`;

const VideoContainer = styled.video`
  max-width: 320px;

  @media (min-width: 768px) {
    max-width: 600px;
  }
`;

const VideoWrapper = styled.div`
  margin: 4rem 0 0;
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
  font-weight: 900;
  text-transform: uppercase;
  width: 10rem;
  justify-content: center;
  font-family: Lato;
`;

const BoldTypography = styled.h2`
  color: white;
  font-weight: 700;
  font-size: ${FONT_SIZES.md};
  font-family: Lato;
`;

const HeaderTypography = styled.h2`
  color: white;
  font-weight: 900;
  margin: 0;
  font-family: Lato;
  margin: 2rem 0;
`;

const ParagraphTypography = styled.div`
  color: white;
  font-size: ${FONT_SIZES.md};
  font-family: Lato;
`;

const TitleTypography = styled.div`
  color: white;
  font-size: 32px;
  font-family: Lato;
  font-weight: 900;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 40px;
  }
`;

const RowContainer = styled(Row)`
  margin: 0 3rem 3rem 3rem;
  width: 100%;

  @media (min-width: 768px) {
    width: 600px;
  }
`;

const ImageWrapper = styled.div`
  margin: 2rem;
  width: 200px;
`;

const LandingPage = () => {
  const location = useLocation();

  return (
    <>
      <Container className={location.pathname === "/" ? "a" : ""}>
        <ImageWrapper>
          <Image src={ValtechLogo} preview={false} />
        </ImageWrapper>

        <Section>
          <Logo width="150px" />
          <TitleTypography>Lifecycle: Ownership Reimagined</TitleTypography>
          <RowContainer>
            <Col span="24">
              <HeaderTypography>BACKGROUND</HeaderTypography>
              <ParagraphTypography>
                Lifecycle connects the digital and physical ownership through
                blockchain technology. Physical luxury items are minted as NFTs
                on the Ethereum blockchain. The NFT serves as a digital
                certificate of ownership of the physical product.
              </ParagraphTypography>
              <br />
              <ParagraphTypography>
                Blockchain technology helps brands build trust, ensure high
                standards for authenticity and ownership traceability of luxury
                goods. Once a Digital Certificate of Ownership is recorded on
                the blockchain, it is available for any third-party to verify as
                the product changes ownership throughout its life.
              </ParagraphTypography>
            </Col>
          </RowContainer>

          <RowContainer>
            <Col span="24">
              <HeaderTypography>TRY OUT THE APP</HeaderTypography>
              <Timeline>
                <Timeline.Item
                  style={{ color: "white" }}
                  position="left"
                  color="white"
                >
                  <BoldTypography>Request an NFT</BoldTypography>
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
                  <BoldTypography>
                    Install MetaMask app on iOS or Android
                  </BoldTypography>
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
                  <BoldTypography>
                    Open the App from the MetaMask Browser
                  </BoldTypography>
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
                  <BoldTypography>
                    View, Transfer and Share your NFT
                  </BoldTypography>
                  <ParagraphTypography>
                    Interact with the NFT for your item's digital twin.
                  </ParagraphTypography>
                </Timeline.Item>
              </Timeline>
            </Col>
          </RowContainer>
          <Logo width="150px" />
          <RowContainer>
            <HeaderTypography>
              VIEW PRODUCT INFO AND TRANSACTION HISTORY
            </HeaderTypography>
            <ParagraphTypography>
              This demo shows how to use the Lifecycle app to view a product's
              transaction history. This includes various steps in a product's
              journey, such as a transfer of ownership, certified repair, or any
              custom event.
            </ParagraphTypography>
            <Col span="24" align="middle">
              <VideoWrapper>
                <VideoContainer controls>
                  <source src={ViewDemoVideo} type="video/mp4"></source>
                </VideoContainer>
              </VideoWrapper>
            </Col>
          </RowContainer>
          <RowContainer>
            <HeaderTypography>TRANSFER YOUR NFT</HeaderTypography>
            <ParagraphTypography>
              This demo shows the process of transferring a Digital Certificate
              of Ownership (NFT) to a different Ethereum account. Any valid ETH
              address can receive the NFT from your account.
            </ParagraphTypography>
            <Col span="24" align="middle">
              <VideoWrapper>
                <VideoContainer controls>
                  <source src={TransferDemoVideo} type="video/mp4"></source>
                </VideoContainer>
              </VideoWrapper>
            </Col>
          </RowContainer>
          <RowContainer>
            <HeaderTypography>EXPLORE THE BLOCKCHAIN</HeaderTypography>
            <ParagraphTypography>
              Etherscan is the largest blockchain exploration tool available for
              free to the public. This demo shows how the website can be used to
              view important information about the NFT, such as current token
              holders, the smart contract, and event logs.
            </ParagraphTypography>
            <Col span="24" align="middle">
              <VideoWrapper>
                <VideoContainer controls>
                  <source src={EtherscanDemoVideo} type="video/mp4"></source>
                </VideoContainer>
              </VideoWrapper>
            </Col>
          </RowContainer>
          <Logo width="150px" />
          <RowContainer>
            <Col span="24" align="middle">
              <Image src={ValtechLogo} width="200px" preview={false} />
            </Col>
          </RowContainer>
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
