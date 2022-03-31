import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import styled from "styled-components";

import { ReactComponent as WalletIcon } from "../assets/wallet.svg";
import { ReactComponent as BackIcon } from "../assets/backbutton.svg";
import { FONT_SIZES } from "../utils/global";

const PrimaryTypography = styled(Typography)`
  font-size: ${FONT_SIZES.md};
  text-transform: uppercase;
  text-align: center;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 2rem 0 1rem;
`;

const WalletWrapoer = styled.div`
  color: black;
  cursor: pointer;
`;

const BackCTA = styled.div`
  color: black;
  cursor: pointer;
`;

const Header = ({ title }) => {
  let navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  const onWalletClick = () => {
    navigate("/wallet");
  };

  return (
    <>
      <HeaderWrapper>
        <BackCTA onClick={onBack}>
          <BackIcon />
        </BackCTA>
        <PrimaryTypography>{title}</PrimaryTypography>
        <WalletWrapoer>
          <WalletIcon onClick={onWalletClick} />
        </WalletWrapoer>
      </HeaderWrapper>
    </>
  );
};

export default Header;
