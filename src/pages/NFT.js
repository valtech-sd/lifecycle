import React from "react";
import { Typography, Row, Col, Image } from "antd";
import { useMoralis, useNFTBalances } from "react-moralis";
import Header from "../components/Header";

const NFT = () => {
  const { account } = useMoralis();
  const { data: NFTBalances, error } = useNFTBalances();

  const contractAddress = "0xdFad5CDC3Bdef5EEf621C87847d61CC738320891";

  const nftOfInterest =
    NFTBalances &&
    NFTBalances.result.find((nft) => {
      return (
        nft.token_address == contractAddress.toLowerCase() &&
        nft.token_id == "7"
      );
    });
  console.log(nftOfInterest);

  return (
    <>
      <div className="container">
        <Header />

        <div className="section">
          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              <h1>NFT</h1>
              <Typography>{account}</Typography>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            {nftOfInterest && (
              <div className="section">
                <Typography>{nftOfInterest.metadata.name}</Typography>
                <Typography>{nftOfInterest.metadata.description}</Typography>
                <Typography>
                  {nftOfInterest.metadata.attributes.map((attribute) => {
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
                <Image width={200} src={nftOfInterest.metadata.image} />
                <pre>{JSON.stringify(NFTBalances, null, 2)}</pre>
              </div>
            )}
          </Row>
        </div>
      </div>
    </>
  );
};

export default NFT;
