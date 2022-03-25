import React, { useContext, useEffect } from "react";
import { Typography, Row, Col, List, Image } from "antd";
import { useMoralis, useNFTBalances } from "react-moralis";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { AppContext } from "../App.js";
import metadata from "./nftmeta";

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
  console.log(allVAuthNfts);
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
                        <pre>{JSON.stringify(nft)}</pre>
                        <Typography>{metadata.name}</Typography>
                        <Image width={600} src={metadata.image} />
                        <Typography>{nft.token_id}</Typography>
                      </List.Item>
                    </Link>
                  )}
                />
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default NFTList;
