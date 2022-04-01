import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  align-items: center;
`;

const WalletWrapoer = styled.div`
  color: black;
  cursor: pointer;
  border: ${({ isActive }) =>
    isActive ? "3px solid #ffffff" : "3px solid transparent"};
  height: 36px;
  width: 38px;
  text-align: center;
  border-radius: ${({ isActive }) => (isActive ? "4rem" : "none")};
  box-shadow: ${({ isActive }) =>
    isActive ? "0px 0px 20px rgba(61, 156, 123, 0.7)" : "none"};
`;

const BackCTA = styled.div`
  color: black;
  cursor: pointer;
  display: flex;
`;

const Header = ({ title, goBackRoute }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onBack = () => {
    navigate(goBackRoute ? goBackRoute : -1);
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
        <WalletWrapoer isActive={location.pathname === "/wallet"}>
          <WalletIcon
            onClick={location.pathname === "/wallet" ? onBack : onWalletClick}
          />
        </WalletWrapoer>
      </HeaderWrapper>
    </>
  );
};

export default Header;
