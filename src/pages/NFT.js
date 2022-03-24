import React, { useContext, useEffect, useState } from "react";
import { Typography, Row, Col, Image, Menu } from "antd";
import { useMoralis, useNFTBalances } from "react-moralis";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { AppContext } from "../App.js";
import Web3 from "web3";

const NFT = () => {
  const [transfers, setTransfers] = useState([]);
  const { account, provider } = useMoralis();

  const [current, setCurrent] = useState("details");
  const [nft, setNft] = useState(null);

  const { allVAuthNfts } = useContext(AppContext);
  let params = useParams();

  const web3Js = new Web3(provider);

  const contract = require("../contractABIs/V_Auth_NFT.json");
  const contractAddress = "0xdFad5CDC3Bdef5EEf621C87847d61CC738320891";

  useEffect(() => {
    const nftContract = new web3Js.eth.Contract(contract.abi, contractAddress);

    nft &&
      nftContract
        .getPastEvents(
          "Transfer",
          {
            filter: { tokenId: nft.token_id },
            fromBlock: 0,
            toBlock: "latest",
          },
          function (error, events) {}
        )
        .then(async function (events) {
          const response = new Promise((resolve, reject) => {
            events.forEach(async (event, index, array) => {
              web3Js.eth.getBlock(event.blockNumber).then((block) => {
                console.log("ADDING TIMESTAMP");
                event.timestamp = new Date(
                  block.timestamp * 1000
                ).toLocaleString();
              });
              if (index === array.length - 1) resolve();
            });
          });
          response.then(() => {
            console.log("DONE", events);
          });

          setTransfers(events);
        });
  }, [nft]);

  useEffect(() => {
    setNft(allVAuthNfts.find((nft) => nft.token_id == params.nftId));
  }, [allVAuthNfts, params.nftId, nft]);

  const handleMenuClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  console.log("tttt", transfers);

  return (
    <>
      <div className="container">
        <Header />

        <div className="section">
          <Menu
            onClick={handleMenuClick}
            selectedKeys={[current]}
            mode="horizontal"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Menu.Item key="details">Details</Menu.Item>
            <Menu.Item key="journey">Journey</Menu.Item>
          </Menu>
          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              <h1>My NFT</h1>
              <Typography>{account}</Typography>
            </Col>

            <Col span="24" align="middle">
              {nft && current === "details" && (
                <div className="section">
                  <Typography>{nft.metadata.name}</Typography>
                  <Typography>{nft.metadata.description}</Typography>
                  <Typography>
                    {nft.metadata.attributes.map((attribute) => {
                      const value =
                        attribute.display_type == "date"
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
                  <Image width={200} src={nft.metadata.image} />
                  {/* <pre>{JSON.stringify(NFTBalances, null, 2)}</pre> */}
                </div>
              )}
            </Col>
            <Col span="24" align="middle">
              {current === "journey"
                ? transfers
                  ? transfers.map((transfer) => {
                      return (
                        <div className="section">
                          <Typography>Date: {transfer.timestamp}</Typography>
                          <Typography>Event: {transfer.event}</Typography>
                          <Typography>
                            From: {transfer.returnValues.from}
                          </Typography>
                          <Typography>
                            To: {transfer.returnValues.to}
                          </Typography>
                        </div>
                      );
                    })
                  : "LOADING"
                : null}
            </Col>
          </Row>
        </div>
      </div>
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
