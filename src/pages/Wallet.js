import React from "react";
import { Typography, Button } from "antd";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import Header from "../components/Header";
import { FONT_SIZES, SIZES, COLORS } from "../utils/global";
import { useNavigate } from "react-router-dom";

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

export const StyledButton = styled(Button)`
  cursor: pointer;
  background: ${COLORS.green};
  color: black;
  border: none;
  margin: 0;
  margin-bottom: 1rem;
  padding: ${SIZES.lg} ${SIZES.md};
  display: flex;
  align-items: center;
  font-size: ${FONT_SIZES.xs};
  font-weight: 700;
  text-transform: uppercase;
  width: 100%;
  justify-content: center;
  border-radius: 6px;
`;

export const StyledButtonSecondary = styled(Button)`
  cursor: pointer;
  background: ${COLORS.black};
  border: 1px solid white;
  color: white;
  margin: 0;
  padding: ${SIZES.lg} ${SIZES.md};
  display: flex;
  align-items: center;
  font-size: ${FONT_SIZES.xs};
  font-weight: 700;
  text-transform: uppercase;
  width: 100%;
  justify-content: center;
  border-radius: 6px;
`;

const Wallet = () => {
  let navigate = useNavigate();
  const { enableWeb3, deactivateWeb3, isWeb3Enabled, logout } = useMoralis();

  const onDisconnectWallet = async () => {
    // await web3Js.eth.currentProvider.disconnect();
    console.log("Disconnected user");
    await deactivateWeb3();
    window.localStorage.removeItem("walletconnect");
    window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    navigate("/");
  };

  const onCancel = () => {
    navigate("/nfts");
  };

  return (
    <>
      <Header title="Wallet" />

      <RowWrapper gutter={[24, 24]}>
        <WarningTextWrapper>
          <Typography style={{ color: "white", fontSize: "20px" }}>
            You are about to disconnect your wallet. Are you sure you want to
            disconnect?
          </Typography>
        </WarningTextWrapper>
        <StyledButton onClick={onDisconnectWallet}>
          Disconnect Wallet
        </StyledButton>
        <StyledButtonSecondary onClick={onCancel}>Cancel</StyledButtonSecondary>
      </RowWrapper>
    </>
  );
};

export default Wallet;
