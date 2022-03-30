import React, { useContext, useEffect, useState } from "react";
import { Typography, Row, Col, Image, Menu, Button, Divider } from "antd";
import styled from "styled-components";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import { COLORS, SIZES, FONT_SIZES } from "../utils/global";
import Header from "../components/Header";
import { AppContext } from "../App.js";
import { StyledButtonSecondary, StyledButton } from "./Wallet";

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
  border-radius: 16px;
  justify-content: center;
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
  const { account } = useMoralis();
  const [current, setCurrent] = useState("details");
  const [nft, setNft] = useState(null);
  const [nftTransactionsFiltered, setNftTransactionsFiltered] = useState(null);
  const navigate = useNavigate();

  const { allVAuthNfts } = useContext(AppContext);
  let params = useParams();

  useEffect(() => {
    allVAuthNfts &&
      setNft(allVAuthNfts.find((nft) => nft.token_id === params.nftId));
  }, [allVAuthNfts, params.nftId, nft]);

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

  const handleMenuClick = (e) => {
    setCurrent(e.key);
  };

  const truncate = (input) =>
    input.length > 6 ? `${input.substring(0, 6)}...` : input;

  const onTransferClick = () => {
    navigate(`transfer`);
  };

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
              justifyContent: "space-evenly",
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
                ? nftTransactionsFiltered
                  ? nftTransactionsFiltered.map((transfer) => {
                      const dateParts = transfer.attributes.block_timestamp
                        .toString()
                        .split(" ");
                      const date = moment(
                        `${dateParts[3]} ${dateParts[2]} ${dateParts[1]}`
                      ).format("MM/DD/YYYY");

                      return (
                        <ListContainer>
                          <ListItem>
                            <Row>
                              <Col span={8} align="left">
                                <TypographyHeader>
                                  {transfer.attributes.from.includes("0x000")
                                    ? "MINT"
                                    : "TRANSFER"}
                                </TypographyHeader>
                              </Col>
                              <Col span={8} offset={8} align="right">
                                <Typography>{date}</Typography>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={24} align="left">
                                <Typography>
                                  From:{" "}
                                  {truncate(
                                    transfer.attributes.from === account
                                      ? "You"
                                      : transfer.attributes.from
                                  )}
                                </Typography>
                                <Typography>
                                  To:{" "}
                                  {truncate(
                                    transfer.attributes.to === account
                                      ? "You"
                                      : transfer.attributes.from
                                  )}
                                </Typography>
                              </Col>
                            </Row>
                          </ListItem>
                          <Divider />
                        </ListContainer>
                      );
                    })
                  : "LOADING"
                : null}
            </Col>
          </Row>
          <Row style={{ marginTop: "32px" }}>
            <Footer>
              <StyledButton onClick={onTransferClick}>TRANSFER</StyledButton>
              <a href="www.valtech.com">
                <StyledButtonSecondary>COMMUNITY ACCESS</StyledButtonSecondary>
              </a>
            </Footer>
          </Row>
        </>
      ) : null}
    </>
  );
};

export default NFT;
