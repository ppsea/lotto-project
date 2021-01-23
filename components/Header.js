import React from "react";
import styled from "styled-components";
import Link from "next/link";

const index = () => {
  return (
    <Wrapper>
      <Link href="/">
        <MainLogo>Lotto Friends</MainLogo>
      </Link>
    </Wrapper>
  );
};

export default index;
`;`;

const Wrapper = styled.div`
  background: rgba(25, 28, 32, 0.5);
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  width: 100%;
  color: #fff;
  @media (max-width: 1100px) {
    padding: 15px 0;
  }
  @media (min-width: 1100px) {
    padding: 20px 0;
    font-size: 20px;
  }
`;

const MainLogo = styled.a`
  cursor: pointer;
  padding-left: 15px;
`;
