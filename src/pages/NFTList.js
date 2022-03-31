import React, { useContext, useEffect } from "react";
import { Typography, Row, Col, List, Image } from "antd";
import { useMoralis, useNFTBalances } from "react-moralis";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { AppContext } from "../App.js";
import Header from "../components/Header";
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
  const { account, isWeb3Enabled, enableWeb3 } = useMoralis();
  const { allVAuthNfts } = useContext(AppContext);

  useEffect(() => {
    if (!isWeb3Enabled || !account) {
      console.log("ENABLING WEB3: NFTList Page");
      enableWeb3();
    }
  }, [isWeb3Enabled, account, enableWeb3]);

  // Grabs all of this user's V_AUTH NFTs, sets to global state
  // useEffect(() => {
  //   console.log(contractAddress);
  //   const vAuthNfts =
  //     NFTBalances &&
  //     NFTBalances.result.filter((nft) => {
  //       return nft.token_address == contractAddress.toLowerCase();
  //     });
  //   setAllVAuthNfts(vAuthNfts);
  // }, [NFTBalances, setAllVAuthNfts, contractAddress]);

  return (
    <>
      <Header title="MY PRODUCTS" goBackRoute={"/"} />
      <Row>
        <Col span="24" align="middle">
          {allVAuthNfts && (
            <List
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
                      <Image width={90} src={nft.metadata.image} />
                      <Typography>{nft.metadata.name}</Typography>
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
