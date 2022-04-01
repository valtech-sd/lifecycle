import React, { useContext, useEffect, useState } from "react";
import { Typography, Row, Col, Image, Menu, Button, Divider } from "antd";
import styled from "styled-components";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import { COLORS, SIZES, FONT_SIZES } from "../utils/global";
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
  font-weight: 700;
  text-transform: uppercase;
  width: 7rem;
  padding: 18px 0;
  border-radius: 16px;
  justify-content: center;
  margin: 0 1rem;
  box-shadow: ${({ isActive }) =>
    isActive
      ? `rgba(0, 0, 0, 0.03) 0px 1px 1px, rgba(0, 0, 0, 0.03) 0px 2px 2px,
    rgba(0, 0, 0, 0.03) 0px 4px 4px, rgba(0, 0, 0, 0.03) 0px 8px 8px,
    rgba(0, 0, 0, 0.03) 0px 16px 16px`
      : "none"} !important;
`;

const Footer = styled.div`
  background: ${COLORS.black};
  width: 100%;
  padding: 3rem ${SIZES.xl};
  margin: 0;
`;

const NFT = () => {
  // https://github.com/MoralisWeb3/react-moralis#usemoralisquery
  const { data: transferEventData } = useMoralisQuery("TransferEventsNFT");
  const { data: repairEventData } = useMoralisQuery("ProductRepairedLog");
  const { account, enableWeb3, isWeb3Enabled } = useMoralis();
  const [current, setCurrent] = useState("details");
  const [nft, setNft] = useState(null);
  const [nftTransactionsFiltered, setNftTransactionsFiltered] = useState(null);
  const [nftRepairsFiltered, setNftRepairsFiltered] = useState(null);
  const [sortedTransactions, setSortedTransactions] = useState(null);
  const navigate = useNavigate();

  const { allVAuthNfts } = useContext(AppContext);
  let params = useParams();

  useEffect(() => {
    allVAuthNfts &&
      setNft(allVAuthNfts.find((nft) => nft.token_id === params.nftId));
  }, [allVAuthNfts, params.nftId, nft]);

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
  console.log("nftRepairsFiltered", nftRepairsFiltered);

  useEffect(() => {
    const allTransactions =
      nftTransactionsFiltered &&
      nftTransactionsFiltered.concat(nftRepairsFiltered).map((transfer) => {
        const dateParts = transfer.attributes.block_timestamp
          .toString()
          .split(" ");
        const dateObj = new Date(transfer.attributes.block_timestamp);
        const date = moment(dateObj, "YYYY-MM-DD").format("MM/DD/YYYY hh:mm a");
        console.log(date);
        return { ...transfer.attributes, transfer, date };
      });

    if (allTransactions) {
      setSortedTransactions(
        allTransactions.sort((a, b) =>
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
          <Header title={nft.metadata.name} />
          <ImageContainer>
            <Image width={200} src={nft.metadata.image} />
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
          <Row style={{ marginTop: "32px" }}>
            <Col span="24" align="middle">
              {nft && current === "details" && (
                <ListContainer>
                  <ListItem>
                    <Row>
                      <Col span={24} align="left">
                        <TypographyHeader>YOUR ITEM</TypographyHeader>
                        <Typography>{nft.metadata.description}</Typography>
                        <Typography align="left" style={{ fontWeight: "bold" }}>
                          ID# {nft.token_id}
                        </Typography>

                        <Divider />

                        <TypographyHeader>
                          DIGITAL PROOF OF OWNERSHIP
                        </TypographyHeader>
                        <Typography>Token Standard: ERC721</Typography>
                        <Typography>Chain: ETH</Typography>
                        <Typography>Contract: 0x9Ea4...</Typography>
                        <Typography>
                          {nft.metadata.attributes.map((attribute) => {
                            const value =
                              attribute.display_type === "date"
                                ? new Date(attribute.value).toLocaleDateString(
                                    "en-US"
                                  )
                                : attribute.value;
                            return (
                              <div>
                                {`${attribute.trait_type}: ${value}`}
                                <br />
                              </div>
                            );
                          })}
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
                      return (
                        <ListContainer>
                          <ListItem>
                            <Row>
                              <Col span={8} align="left">
                                <TypographyHeader>
                                  {transfer.from
                                    ? transfer.from.includes("0x000")
                                      ? "MINT"
                                      : "TRANSFER"
                                    : "REPAIRED"}
                                </TypographyHeader>
                              </Col>
                              <Col span={8} offset={8} align="right">
                                <Typography>{transfer.date}</Typography>
                              </Col>
                            </Row>
                            <Row>
                              {transfer.from && transfer.to && (
                                <Col span={24} align="left">
                                  <Typography>
                                    From:{" "}
                                    {truncate(
                                      transfer.from === account
                                        ? "You"
                                        : transfer.from
                                    )}
                                  </Typography>
                                  <Typography>
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
                          </ListItem>
                          {nftTransactionsFiltered.length > 1 && <Divider />}
                        </ListContainer>
                      );
                    })
                  : "LOADING"
                : null}
            </Col>
          </Row>
          <Row
            style={{
              marginTop: "32px",
            }}
          >
            <Footer>
              <StyledButton onClick={onTransferClick}>TRANSFER</StyledButton>
            </Footer>
          </Row>
        </>
      ) : null}
    </>
  );
};

export default NFT;
