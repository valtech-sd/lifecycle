import React from "react";
import { Typography, Button, Input, Form } from "antd";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { useNavigate, useParams } from "react-router-dom";
import Web3 from "web3";
import Header from "../components/Header";
import { StyledButtonSecondary, StyledButton } from "./Wallet";

import { FONT_SIZES, SIZES, COLORS } from "../utils/global";

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
    console.log("Success:", values.account);
    sendNFT(values.account);
    navigate(-1);
  };

  const sendNFT = async (toAccount) => {
    // https://ethereum.stackexchange.com/questions/48750/how-to-sign-a-send-method-in-web3-1-0
    const transfer = await nftContract.methods
      .transferFrom(account, toAccount, params.nftId)
      .send({ from: account });

    // let encoded_tx = tx_builder.encodeABI();
    // var nonce = await web3Js.eth.getTransactionCount(account);

    // const gasPrice = web3Js.eth.gasPrice;
    // const gasPriceHex = web3Js.utils.toHex(gasPrice);
    // const gasLimitHex = web3Js.utils.toHex(3000000);
    // // Create the contract creation transaction object

    // // https://ethereum.org/en/developers/docs/transactions/#the-data-field
    // var txObject = {
    //   nonce: web3Js.utils.toHex(nonce),
    //   gasPrice: gasPriceHex,
    //   gasLimit: gasLimitHex,
    //   data: encoded_tx,
    //   from: account,
    //   to: "0x9Ea4Bb6967936aA865963B43003b5bFa679C1AF3",
    // };

    // // code on item is unique hash
    // // whoever has the hash can verify the item
    // // the hash needs to be the public key of a private/public key pair so that someone with QR code needs to also have the private key

    // //rinkeby.etherscan.io/address/0x9Ea4Bb6967936aA865963B43003b5bFa679C1AF3
    // web3Js.eth.accounts
    //   .signTransaction(txObject, process.env.REACT_APP_PRIVATE_KEY)
    //   .then((signedTx) => {
    //     console.log("signed", signedTx);
    //     setLogInfo(signedTx);
    //     web3Js.eth
    //       .sendSignedTransaction(signedTx.rawTransaction)
    //       .on("transactionHash", (hash) => {
    //         setLogInfo(hash);
    //         console.log("txHash:", hash);
    //       })
    //       .on("receipt", (receipt) => {
    //         console.log("receipt", receipt);
    //       })
    //       .on("error", (error) => {
    //         console.log("error", error);
    //       });
    //   });
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
            <StyledButton
              // onClick={onDisconnectWallet}
              htmlType="submit"
              type="submit"
            >
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
