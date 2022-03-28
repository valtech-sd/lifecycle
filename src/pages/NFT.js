import React, { useContext, useEffect, useState } from "react";
import { Typography, Row, Col, Image, Menu, Button } from "antd";
import styled from "styled-components";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { useParams } from "react-router-dom";

import { COLORS, SIZES, FONT_SIZES } from "../utils/global";
import Header from "../components/Header";
import { AppContext } from "../App.js";
import metadata from "./nftmeta";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const NFT = () => {
  // https://github.com/MoralisWeb3/react-moralis#usemoralisquery
  const { data: transferEventData } = useMoralisQuery("TransferEvents");
  const [current, setCurrent] = useState("details");
  const [nft, setNft] = useState(null);
  const [nftTransactionsFiltered, setNftTransactionsFiltered] = useState(null);

  const { allVAuthNfts } = useContext(AppContext);
  let params = useParams();

  useEffect(() => {
    console.log("ALL NFTs", allVAuthNfts);
    setNft(allVAuthNfts.find((nft) => nft.token_id == params.nftId));
  }, [allVAuthNfts, params.nftId, nft]);

  useEffect(() => {
    const filteredNFTTransactions = transferEventData.filter((event) => {
      return (
        event.attributes.tokenId == params.nftId ||
        (event.attributes.tokenId == params.nftId &&
          event.attributes.from.includes("0x000"))
      );
    });
    setNftTransactionsFiltered(filteredNFTTransactions);
  }, [transferEventData, params.nftId]);

  // useEffect(() => {
  //   console.log("pastContractEventData", pastContractEventData);
  //   if (pastContractEventData) {
  //     const nftEvents = pastContractEventData.filter((pastEvent) => {
  //       return pastEvent.returnValues.tokenId == params.nftId;
  //     });
  //     setNFTHistory(nftEvents);
  //   }
  // }, [pastContractEventData, params.nftId]);

  const handleMenuClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  console.log(current);

  return (
    <>
      <Header title="Product Name" />
      <Container>
        <Image width={200} src={metadata.image} />
      </Container>
      <Menu
        onClick={handleMenuClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{ display: "flex", justifyContent: "space-between" }}
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
      <Row gutter={[24, 24]}>
        <Col span="24" align="middle">
          {nft && current === "details" && (
            <div className="section">
              <Typography>{metadata.name}</Typography>
              <Typography>{metadata.description}</Typography>
              <Typography>
                {metadata.attributes.map((attribute) => {
                  const value =
                    attribute.display_type == "date"
                      ? new Date(attribute.value).toLocaleDateString("en-US")
                      : attribute.value;
                  return (
                    <div>
                      {`${attribute.trait_type}: ${value}`}
                      <br />
                    </div>
                  );
                })}
              </Typography>
            </div>
          )}
        </Col>
        <Col span="24" align="middle">
          {current === "journey"
            ? nftTransactionsFiltered
              ? nftTransactionsFiltered.map((transfer) => {
                  return (
                    <div className="section">
                      <Typography>
                        Date: {transfer?.attributes.block_timestamp.toString()}
                      </Typography>
                      <Typography>
                        Event:{" "}
                        {transfer.attributes.from.includes("0x000")
                          ? "Mint"
                          : "Transfer"}
                      </Typography>
                      <Typography>From: {transfer.attributes.from}</Typography>
                      <Typography>To: {transfer.attributes.to}</Typography>
                    </div>
                  );
                })
              : "LOADING"
            : null}
        </Col>
      </Row>
    </>
  );
};

export default NFT;

// Note: the empty deps array [] means
// this useEffect will run once
// similar to componentDidMount()
// useEffect(() => {
//   fetch(
//     `https://api-rinkeby.etherscan.io/api?module=logs&sort=desc&action=getLogs&fromBlock=0&toBlock=latest&address=0xdFad5CDC3Bdef5EEf621C87847d61CC738320891&apikey=S3CPW31X8X8VCPGKBEXNB4ECUF8XJTPCKB`
//   )
//     .then((res) => res.json())
//     .then(
//       (result) => {
//         console.log("RESULT", result);
//         setIsLoaded(true);
//         setItems(result);
//       },
//       // Note: it's important to handle errors here
//       // instead of a catch() block so that we don't swallow
//       // exceptions from actual bugs in components.
//       (error) => {
//         setIsLoaded(true);
//         setError(error);
//       }
//     );
// }, []);
