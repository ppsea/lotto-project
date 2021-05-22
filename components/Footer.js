import React, { useCallback } from "react";
import styled from "styled-components";
const index = () => {
  const clickHenry = useCallback(() => {
    var win = window.open("https://github.com/ppsea", "_blank");
  }, []);

  const clickDonation = useCallback(() => {
    var win = window.open(
      "https://donaricano.com/mypage/1407538213_sx6MXH",
      "_blank"
    );
  }, []);
  return (
    <Wrapper>
      © <Span onClick={clickHenry}>개발자 애용</Span>
      <Donation onClick={clickDonation}>Support</Donation>
    </Wrapper>
  );
};

export default index;

const Wrapper = styled.div`
  background: rgba(25, 28, 32, 0.5);
  width: 100%;
  color: #fff;
  text-align: center;
  @media (max-width: 1100px) {
    padding: 30px 0;
  }
  @media (min-width: 1100px) {
    padding: 50px 0;
    font-size: 20px;
  }
`;
const Span = styled.span`
  cursor: pointer;
`;
const Donation = styled.span`
  cursor: pointer;
  margin-left: 50px;
`;
