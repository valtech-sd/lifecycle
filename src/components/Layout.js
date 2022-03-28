import React from "react";
import styled from "styled-components";

import { COLORS, SIZES } from "../utils/global";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Container className="a">{children}</Container>
    </>
  );
};

export default Layout;
