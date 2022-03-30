import React from "react";
import { Typography, Input, Form } from "antd";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { useNavigate, useParams } from "react-router-dom";
import Web3 from "web3";

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

const Transfer = () => {
  let navigate = useNavigate();
  let params = useParams();
  const { account, provider } = useMoralis();
  const web3Js = new Web3(provider);
  const contract = require("../contractABIs/V_Authenticate.json");
  const contractAddress = "0x9Ea4Bb6967936aA865963B43003b5bFa679C1AF3";
  const nftContract = new web3Js.eth.Contract(contract.abi, contractAddress);

  const onFinish = (values) => {
    sendNFT(values.account);
  };

  const sendNFT = async (toAccount) => {
    // https://ethereum.stackexchange.com/questions/48750/how-to-sign-a-send-method-in-web3-1-0
    // TODO - fix transfer promise / handing navigation
    console.log("account", account);
    console.log("sending to", toAccount);
    await nftContract.methods
      .transferFrom(account, toAccount, params.nftId)
      .send({ from: account });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Header title="Transfer" />

      <RowWrapper gutter={[24, 24]}>
        <WarningTextWrapper>
          <Typography style={{ color: "white", fontSize: "20px" }}>
            Please enter the address you would like to the transfer your NFT to.
            Warning: Once you sign this transaction, it is irreversible.
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
        \
      </RowWrapper>
    </>
  );
};

export default Transfer;
