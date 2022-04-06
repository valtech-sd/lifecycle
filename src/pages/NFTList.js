import React, { useContext, useEffect } from "react";
import { Typography, Row, Col, List, Image } from "antd";
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";

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

const RowContainer = styled(Row)`
  @media (min-width: 768px) {
    width: 60%;
    margin: 4rem auto 0;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const NFTList = () => {
  const { account, isWeb3Enabled, enableWeb3 } = useMoralis();
  const { allUsersNFTs } = useContext(AppContext);

  useEffect(() => {
    if (!isWeb3Enabled || !account) {
      console.log("ENABLING WEB3: NFTList Page");
      enableWeb3();
    }
  }, [isWeb3Enabled, account, enableWeb3]);

  return (
    <>
      <Header title="YOUR PRODUCTS" goBackRoute={"/app"} />
      <RowContainer>
        <Col span="24" align="middle">
          {allUsersNFTs ? (
            <List
              dataSource={allUsersNFTs}
              grid={{
                xs: 2,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 3,
                xxl: 3,
              }}
              renderItem={(nft) => (
                <Link to={nft.token_id}>
                  <ListItem>
                    <List.Item>
                      <Image
                        width={90}
                        src={nft.metadata?.image}
                        preview={false}
                      />
                      <Typography style={{ fontFamily: "Lato" }}>
                        {nft.metadata?.name}
                      </Typography>
                      <Typography style={{ fontFamily: "Lato" }}>
                        ID# {nft.token_id}
                      </Typography>
                    </List.Item>
                  </ListItem>
                </Link>
              )}
            />
          ) : (
            <LoaderContainer>
              <ThreeCircles
                color="#a9a9a9"
                outerCircleColor="#00fea6"
                innerCircleColor="#000"
                height={110}
                width={110}
                ariaLabel="three-circles-rotating"
              />
            </LoaderContainer>
          )}
        </Col>
      </RowContainer>
    </>
  );
};

export default NFTList;
