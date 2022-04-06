import React, { useContext, useEffect, useState } from "react";
import { Typography, Row, Col, Image, Menu, Button, Divider } from "antd";
import styled from "styled-components";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import moment from "moment";

import { COLORS, SIZES, FONT_SIZES } from "../utils/global";
import { ecommerceData, repairData } from "../utils/mockData";
import Header from "../components/Header";
import { AppContext } from "../App.js";
import { StyledButton } from "./Wallet";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;

const ListContainer = styled.div`
  margin: 0 ${SIZES.xl};
`;

const TypographyHeader = styled(Typography)`
  font-weight: 900;
  font-size: ${SIZES.md};
  margin-bottom: ${SIZES.xs};
`;

const ListItem = styled.div`
  margin: ${SIZES.md} 0;
`;

const ButtonStyled = styled(Button)`
  cursor: pointer;
  background: ${({ isActive }) =>
    isActive ? COLORS.green : COLORS.grey} !important;
  color: black !important;
  border: none;
  display: flex;
  align-items: center;
  font-size: ${FONT_SIZES.xs};
  text-transform: uppercase;
  width: 7rem;
  padding: 18px 0;
  border-radius: 16px;
  justify-content: center;
  margin: 0 1rem;
  font-family: Lato;
  font-weight: 900;
  box-shadow: ${({ isActive }) =>
    isActive
      ? `rgba(0, 0, 0, 0.03) 0px 1px 1px, rgba(0, 0, 0, 0.03) 0px 2px 2px,
    rgba(0, 0, 0, 0.03) 0px 4px 4px, rgba(0, 0, 0, 0.03) 0px 8px 8px,
    rgba(0, 0, 0, 0.03) 0px 16px 16px`
      : "none"} !important;
`;

const RowContainer = styled(Row)`
  @media (min-width: 768px) {
    width: 768px;
    margin: 4rem auto 0;
  }
`;

const Footer = styled.div`
  background: ${COLORS.black};
  width: 100%;
  padding: 3rem ${SIZES.xl};
  margin: 0;
  display: flex;
  justify-content: center;
`;

const BoldTypography = styled.span`
  font-weight: bold;
  font-family: "Lato";
`;

const NFT = () => {
  // https://github.com/MoralisWeb3/react-moralis#usemoralisquery
  const { data: transferEventData } = useMoralisQuery("TransferEventsNFT");
  const { data: repairEventData } = useMoralisQuery("ProductRepairedLog");
  const { account, enableWeb3, isWeb3Enabled } = useMoralis();
  const [current, setCurrent] = useState("details");
  const [isFromScan, setIsFromScan] = useState(false);
  const [nft, setNft] = useState(null);
  const [nftTransactionsFiltered, setNftTransactionsFiltered] = useState(null);
  const [nftRepairsFiltered, setNftRepairsFiltered] = useState(null);
  const [sortedTransactions, setSortedTransactions] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { allUsersNFTs, allNFTsByContract } = useContext(AppContext);
  let params = useParams();

  useEffect(() => {
    const userOwnedNft =
      allUsersNFTs && allUsersNFTs.find((nft) => nft.token_id === params.nftId);
    if (userOwnedNft) {
      console.log("USER OWNED");
      return setNft(userOwnedNft);
    } else if (allNFTsByContract) {
      console.log(
        "User does not own this NFT, looking up all NFTS by contract",
        allNFTsByContract
      );
      let anonymousNFT = allNFTsByContract.find((nft) => {
        return nft.token_id === params.nftId;
      });
      if (anonymousNFT && typeof anonymousNFT.metadata === "string") {
        anonymousNFT.metadata = JSON.parse(anonymousNFT.metadata);
      }
      return setNft(anonymousNFT);
    }
  }, [allUsersNFTs, params.nftId, allNFTsByContract]);

  useEffect(() => {
    if (searchParams.get("source") === "scan") {
      setIsFromScan(true);
      console.log("FROM SCAN ");
    }
  }, [setIsFromScan, searchParams]);

  useEffect(() => {
    if (!isWeb3Enabled || !account) {
      console.log("ENABLING WEB3: NFT Page");
      enableWeb3();
    }
  }, [isWeb3Enabled, account, enableWeb3]);

  useEffect(() => {
    const filteredNFTTransactions = transferEventData.filter((event) => {
      return (
        event.attributes.tokenId === params.nftId ||
        (event.attributes.tokenId === params.nftId &&
          event.attributes.from.includes("0x000"))
      );
    });
    setNftTransactionsFiltered(filteredNFTTransactions);
  }, [transferEventData, params.nftId]);

  useEffect(() => {
    const repairsFiltered = repairEventData.filter((event) => {
      return event.attributes.token_id === params.nftId;
    });
    setNftRepairsFiltered(repairsFiltered);
  }, [repairEventData, params.nftId]);

  const handleMenuClick = (e) => {
    setCurrent(e.key);
  };

  const truncate = (input) =>
    input.length > 6 ? `${input.substring(0, 6)}...` : input;

  const onTransferClick = () => {
    navigate(`transfer`);
  };

  const getEventTitle = (transfer) => {
    if (transfer.eventTitle) return transfer.eventTitle;
    if (transfer?.from) {
      if (transfer.from.includes("0x000")) {
        return "DIGITAL CERTIFICATE OF AUTHENTICITY MINTED";
      } else {
        return "OWNERSHIP TRANSFER";
      }
    }
    return "CERTIFIED REPRAIR";
  };

  useEffect(() => {
    let allTransactions =
      nftTransactionsFiltered &&
      nftTransactionsFiltered.concat(nftRepairsFiltered).map((transfer) => {
        const dateObj = new Date(transfer.attributes.block_timestamp);
        const date = moment(dateObj, "YYYY-MM-DD").format("MM/DD/YYYY hh:mm a");
        return { ...transfer.attributes, transfer, date };
      });

    if (allTransactions) {
      const finalizedTransactions = allTransactions.concat(ecommerceData);
      setSortedTransactions(
        finalizedTransactions.sort((a, b) =>
          moment(b.date, "MM/DD/YYYY HH:mm").diff(
            moment(a.date, "MM/DD/YYYY HH:mm")
          )
        )
      );
    }
  }, [nftTransactionsFiltered, nftRepairsFiltered]);

  return (
    <>
      {nft ? (
        <>
          <Header
            title={isFromScan ? "Scanned Item" : "Your Item"}
            goBackRoute={isFromScan ? "/app" : "/app/nfts"}
            showWalletIcon={isFromScan ? false : true}
          />
          <ImageContainer>
            <Image width={200} src={nft.metadata.image} preview={false} />
          </ImageContainer>
          <Menu
            onClick={handleMenuClick}
            selectedKeys={[current]}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "3rem",
            }}
          >
            <ButtonStyled
              onClick={() => setCurrent("details")}
              isActive={current === "details"}
            >
              Details
            </ButtonStyled>
            <ButtonStyled
              onClick={() => setCurrent("journey")}
              isActive={current === "journey"}
            >
              Journey
            </ButtonStyled>
          </Menu>
          <RowContainer style={{ marginTop: "32px" }}>
            <Col span="24" align="middle">
              {nft && current === "details" && (
                <ListContainer>
                  <ListItem>
                    <Row>
                      <Col span={24} align="left">
                        <TypographyHeader
                          style={{
                            textTransform: "uppercase",
                            fontFamily: "Lato",
                          }}
                        >
                          {nft.metadata.name}
                        </TypographyHeader>
                        <Typography style={{ fontFamily: "Lato" }}>
                          <BoldTypography>Ref:</BoldTypography> AS3260 B08037
                          NH627
                        </Typography>
                        <Typography style={{ fontFamily: "Lato" }}>
                          <BoldTypography>Price:</BoldTypography> $5,100
                        </Typography>
                        <Typography style={{ fontFamily: "Lato" }}>
                          <BoldTypography>Description:</BoldTypography>
                          {` A member
                          of the House's Beloved lines, the ${nft.metadata.name} is
                          characterized by the brand's emblematic monogram
                          hardware and matelassé leather. For The Gucci Aria
                          collection, the style is reimagined with a new
                          geometric approach to the signature material while its
                          Double G hardware is presented with an antique
                          silver-toned finish. The design appears here in the
                          shape of a mini bag in black.`}
                        </Typography>
                        <Typography style={{ fontFamily: "Lato" }}>
                          <BoldTypography>Color:</BoldTypography> Mahogany
                        </Typography>
                        <Typography style={{ fontFamily: "Lato" }}>
                          <BoldTypography>Collection:</BoldTypography> Summer
                          Handbag Edition
                        </Typography>
                        <Typography style={{ fontFamily: "Lato" }}>
                          <BoldTypography>Designed by:</BoldTypography> Lindsey
                          Eckhart
                        </Typography>
                        <Typography style={{ fontFamily: "Lato" }}>
                          <BoldTypography>Manufactured:</BoldTypography> France
                        </Typography>

                        <Divider />

                        <TypographyHeader>
                          DIGITAL CERTIFICATE OF AUTHENTICITY
                        </TypographyHeader>
                        <Typography style={{ fontFamily: "Lato" }}>
                          <BoldTypography>Token Standard:</BoldTypography>{" "}
                          ERC721
                        </Typography>
                        <Typography style={{ fontFamily: "Lato" }}>
                          <BoldTypography>Chain:</BoldTypography> ETH
                        </Typography>
                        <Typography style={{ fontFamily: "Lato" }}>
                          <BoldTypography>Contract:</BoldTypography>{" "}
                          0x43b92b42ee33fC01f4d9A3249E478F7bc0cFCC0c
                        </Typography>
                        <Typography align="left">
                          <BoldTypography>Token ID:</BoldTypography>{" "}
                          {nft.token_id}
                        </Typography>
                      </Col>
                    </Row>
                  </ListItem>
                </ListContainer>
              )}
            </Col>
            <Col span="24" align="middle">
              {current === "journey"
                ? sortedTransactions
                  ? sortedTransactions.map((transfer) => {
                      const repairDataObj =
                        repairData[
                          Math.floor(Math.random() * repairData.length)
                        ];
                      return (
                        <ListContainer>
                          <ListItem>
                            <Row>
                              <Col span={16} align="left">
                                <TypographyHeader>
                                  {getEventTitle(transfer)}
                                </TypographyHeader>
                              </Col>
                              <Col span={8} align="right">
                                <Typography style={{ fontFamily: "Lato" }}>
                                  {transfer.date}
                                </Typography>
                              </Col>
                            </Row>
                            <Row>
                              {transfer.from && transfer.to && (
                                <Col span={24} align="left">
                                  <Typography style={{ fontFamily: "Lato" }}>
                                    From:{" "}
                                    {truncate(
                                      transfer.from === account
                                        ? "You"
                                        : transfer.from
                                    )}
                                  </Typography>
                                  <Typography style={{ fontFamily: "Lato" }}>
                                    To:{" "}
                                    {truncate(
                                      transfer.to === account
                                        ? "You"
                                        : transfer.from
                                    )}
                                  </Typography>
                                </Col>
                              )}
                            </Row>
                            <Row>
                              {transfer.repairURI && (
                                <Col span={24} align="left">
                                  <Typography style={{ fontFamily: "Lato" }}>
                                    {Object.keys(repairDataObj).map(function (
                                      key
                                    ) {
                                      // Capitalize camel-case fields in object
                                      const result = key.replace(
                                        /([A-Z])/g,
                                        " $1"
                                      );
                                      const capitalizedKey =
                                        result.charAt(0).toUpperCase() +
                                        result.slice(1);
                                      return (
                                        <div>
                                          <span style={{ fontWeight: "bold" }}>
                                            {capitalizedKey}
                                          </span>
                                          : {repairDataObj[key]}
                                          <br />
                                        </div>
                                      );
                                    })}
                                  </Typography>
                                </Col>
                              )}
                            </Row>
                          </ListItem>
                          {nftTransactionsFiltered.length > 1 && <Divider />}
                        </ListContainer>
                      );
                    })
                  : "LOADING"
                : null}
            </Col>
          </RowContainer>
          <Row
            style={{
              marginTop: "32px",
            }}
          >
            <Footer>
              {!isFromScan && (
                <StyledButton onClick={onTransferClick}>TRANSFER</StyledButton>
              )}
            </Footer>
          </Row>
        </>
      ) : null}
    </>
  );
};

export default NFT;
