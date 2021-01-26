import React from "react";
import styled from "styled-components";
const index = () => {
  return (
    <Wrapper>
      <h1>
        Lotto Friends는 확률을 기반으로 로또 번호를 추천하는 무료 서비스입니다.
      </h1>
    </Wrapper>
  );
};

export default index;

const Wrapper = styled.div`
  background-color: #fdfdfd;
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
  & h1 {
    color: #000;
  }
  @media (max-width: 1100px) {
    font-size: 14px;
    white-space: pre-wrap;
    text-align: center;
    word-break: keep-all;
    line-height: 24px;
  }
  @media (min-width: 1100px) {
    font-size: 24px;
  }
`;
