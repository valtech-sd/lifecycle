import React, { useContext, useEffect, useState } from "react";
import { Typography, Row, Col, Image, Menu, List } from "antd";
import { useMoralis, useNFTBalances } from "react-moralis";
import Header from "../components/Header";
import { BrowserRouter, Link, Outlet } from "react-router-dom";
import { AppContext } from "../App.js";

const NFTList = () => {
  const { account } = useMoralis();

  const { data: NFTBalances, error } = useNFTBalances();
  const { allVAuthNfts, setAllVAuthNfts, contractAddress } =
    useContext(AppContext);

  console.log("CONTRACT ADDRESS", contractAddress);

  useEffect(() => {
    const vAuthNfts =
      NFTBalances &&
      NFTBalances.result.filter((nft) => {
        return nft.token_address == contractAddress.toLowerCase();
      });
    // Runs ONCE after initial rendering
    setAllVAuthNfts(vAuthNfts);
    console.log("RAN NFT UPDATE");
  }, [NFTBalances, setAllVAuthNfts, contractAddress]);

  console.log("allVAuthNfts", allVAuthNfts);

  return (
    <>
      <div className="container">
        <Header />

        <div className="section">
          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              <h1>My NFTs</h1>
              <Typography>{account}</Typography>
            </Col>
            <Col span="24" align="middle"></Col>
            <Col span="24" align="middle">
              {allVAuthNfts && (
                <List
                  bordered
                  dataSource={allVAuthNfts}
                  renderItem={(nft) => (
                    <Link to={nft.token_id}>
                      <List.Item>
                        <Typography>{nft.metadata.name}</Typography>
                        <Typography>{nft.token_id}</Typography>
                      </List.Item>
                    </Link>
                  )}
                />
              )}
            </Col>
          </Row>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default NFTList;
