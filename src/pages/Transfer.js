import React, { useState, useEffect } from "react";
import { Typography, Input, Form } from "antd";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { useNavigate, useParams } from "react-router-dom";
import Web3 from "web3";
import { ThreeCircles } from "react-loader-spinner";

import Header from "../components/Header";
import { StyledButton } from "./Wallet";
import { SIZES, COLORS } from "../utils/global";

const WarningTextWrapper = styled(Typography)`
  padding: 4rem 0;
`;

const RowWrapper = styled.div`
  padding: ${SIZES.xl};
  background: ${COLORS.black};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const LoaderWrapper = styled.div`
  display: flex;
  margin-top: 4rem;
  align-items: center;
  flex-direction: column;
`;

const Transfer = () => {
  let navigate = useNavigate();
  let params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(
    "Confirming your transaction on the blockchain..."
  );
  const { account, provider } = useMoralis();
  const web3Js = new Web3(provider);
  const contract = require("../contractABIs/V_Authenticate.json");
  const contractAddress = "0x43b92b42ee33fC01f4d9A3249E478F7bc0cFCC0c";
  const nftContract = new web3Js.eth.Contract(contract.abi, contractAddress);

  const onFinish = (values) => {
    sendNFT(values.account);
  };

  const sendNFT = async (toAccount) => {
    // https://ethereum.stackexchange.com/questions/48750/how-to-sign-a-send-method-in-web3-1-0
    // TODO - fix transfer promise / handing navigation
    console.log("account", account);
    console.log("sending to", toAccount);
    setIsLoading(true);
    await nftContract.methods
      .transferFrom(account, toAccount, params.nftId)
      .send({ from: account })
      .then((receipt) => {
        setLoadingText("Your transaction was successful !");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/nfts");
        }, 3000);
        console.log("RECEIPTS!!!", receipt);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header title="Transfer" goBackRoute={isLoading ? "/nfts" : null} />
      <RowWrapper gutter={[24, 24]}>
        {isLoading ? (
          <LoaderWrapper>
            <Typography
              style={{ color: "white", fontSize: "20px", marginBottom: "4rem" }}
            >
              {loadingText}
            </Typography>
            <ThreeCircles
              color="#a9a9a9"
              outerCircleColor="#00fea6"
              innerCircleColor="#000"
              height={110}
              width={110}
              ariaLabel="three-circles-rotating"
            />
          </LoaderWrapper>
        ) : (
          <>
            <WarningTextWrapper>
              <Typography style={{ color: "white", fontSize: "20px" }}>
                Please enter the address you would like to the transfer your NFT
                to. Warning: Once you sign this transaction, it is irreversible.
              </Typography>
            </WarningTextWrapper>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              style={{ color: "white" }}
            >
              <Form.Item
                name="account"
                label={
                  <label style={{ color: "white" }}>
                    Enter a receiving ETH address
                  </label>
                }
              >
                <Input size="large" placeholder="ETH Account" />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                <StyledButton htmlType="submit" type="submit">
                  Tranfer NFT
                </StyledButton>
              </Form.Item>
            </Form>
          </>
        )}
      </RowWrapper>
    </>
  );
};

export default Transfer;
