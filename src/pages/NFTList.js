import React, { useContext, useEffect } from "react";
import { Typography, Row, Col, List, Image } from "antd";
import { useMoralis, useNFTBalances } from "react-moralis";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { AppContext } from "../App.js";
import Header from "../components/Header";
import metadata from "./nftmeta";
import { SIZES } from "../utils/global";

const ListItem = styled.div`
  background-color: #f1f4fb;
  border-radius: 30px;
  margin: ${SIZES.sm};
  padding: ${SIZES.sm};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NFTList = () => {
  const { account } = useMoralis();
  const { data: NFTBalances } = useNFTBalances();
  const { allVAuthNfts, setAllVAuthNfts, contractAddress } =
    useContext(AppContext);

  // Grabs all of this user's V_AUTH NFTs, sets to global state
  useEffect(() => {
    console.log(contractAddress);
    const vAuthNfts =
      NFTBalances &&
      NFTBalances.result.filter((nft) => {
        return nft.token_address == contractAddress.toLowerCase();
      });
    setAllVAuthNfts(vAuthNfts);
  }, [NFTBalances, setAllVAuthNfts, contractAddress]);

  return (
    <>
      <Header title="MY PRODUCTS" />
      <Row gutter={[24, 24]}>
        <Typography>{account}</Typography>
        <Col span="24" align="middle">
          {allVAuthNfts && (
            <List
              bordered
              dataSource={allVAuthNfts}
              grid={{
                xs: 2,
                sm: 2,
                md: 2,
                lg: 4,
              }}
              renderItem={(nft) => (
                <Link to={nft.token_id}>
                  <ListItem>
                    <List.Item>
                      <Image width={120} src={metadata.image} />
                      <Typography>{metadata.name}</Typography>
                      <Typography>ID# {nft.token_id}</Typography>
                    </List.Item>
                  </ListItem>
                </Link>
              )}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default NFTList;
