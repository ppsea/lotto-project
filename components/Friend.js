import React, { useState, useCallback } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import recommend from "../util/recommend";
const index = () => {
  const { name } = useRouter().query;
  const [buttonState, setButtonState] = useState("trend");

  const renderRecommendList = useCallback(() => {
    let resultArray = [];
    if (buttonState == "trend") {
      resultArray = recommend("trend");
    } else if (buttonState == "many") {
      resultArray = recommend("many");
    } else if (buttonState == "random") {
      resultArray = recommend("random");
    } else if (buttonState == "like") {
    }
    if (resultArray.length > 0) {
      return (
        <RecommendTable>
          <RecommendTBody>
            <Tr>
              <Th>추천번호</Th>
            </Tr>
            {resultArray.map((array, index) => (
              <Tr key={index}>
                <Td>
                  {array.map((ball, bIndex) => (
                    <Ball key={bIndex} number={ball}>
                      {ball}
                    </Ball>
                  ))}
                </Td>
              </Tr>
            ))}
          </RecommendTBody>
        </RecommendTable>
      );
    }
    return <></>;
  }, [buttonState]);
  if (name != undefined) {
    return (
      <Wrapper>
        <Name>
          <span>{name}!</span> 로또 1등 가즈아!
        </Name>
        <Img />
        <ButtonBlock>
          <Button
            onClick={() => setButtonState("trend")}
            inverted={buttonState == "trend"}
            color={"#fbc400"}
          >
            Trend
          </Button>
          <Button
            onClick={() => setButtonState("many")}
            inverted={buttonState == "many"}
            color={"#69c8f2"}
          >
            Many
          </Button>
          <Button
            onClick={() => setButtonState("random")}
            inverted={buttonState == "random"}
            color={"#ff7272"}
          >
            Random
          </Button>
          {/* <Button
            onClick={() => setButtonState("like")}
            inverted={buttonState == "like"}
            color={"#b0d840"}
          >
            Like
          </Button> */}
        </ButtonBlock>
        <RecommendBlock>
          <h3>
            {buttonState == "trend"
              ? `최근 잘나오는 숫자들로 번호를 추천합니다`
              : buttonState == "many"
              ? `가장 잘나오는 숫자들로 번호를 추천합니다`
              : buttonState == "random"
              ? `무작위 숫자들로 번호를 추천합니다`
              : buttonState == "like"
              ? `좋아하는 숫자들로 번호를 추천합니다`
              : ""}
          </h3>
          {renderRecommendList()}
        </RecommendBlock>
      </Wrapper>
    );
  }
  return <></>;
};

export default index;

const Wrapper = styled.div`
  @media (max-width: 1100px) {
    font-size: 18px;
    padding-top: 48px;
    min-height: calc(100vh - 76px);
  }
  @media (min-width: 1100px) {
    font-size: 32px;
    padding-top: 60px;
    min-height: calc(100vh - 120px);
  }
`;

const Name = styled.h2`
  margin: 20px 0;
  font-size: 22px;
  text-align: center;
  & > span {
    color: red;
  }
`;

const Img = styled.div`
  background-image: url("/static/gazua.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 auto;
  @media (max-width: 1100px) {
    width: 100vw;
    height: 100vw;
  }
  @media (min-width: 1100px) {
    width: 400px;
    height: 400px;
  }
`;
const ButtonBlock = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: row wrap;
  & > div {
    margin-right: 10px;
  }
  & > div:last-child {
    margin: 0;
  }
`;
const Button = styled.div`
  cursor: pointer;
  ${(props) =>
    props.inverted &&
    css`
      color: ${(props) => props.color};
    `}
`;

const RecommendBlock = styled.div`
  & > h3 {
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
    color: #aaa;
  }
`;

const RecommendTable = styled.table`
  margin: 30px auto;
  border-collapse: collapse;
  @media (max-width: 1100px) {
    width: 100vw;
  }
  @media (min-width: 1100px) {
    width: 30vw;
  }
`;
const RecommendTBody = styled.tbody``;

const Th = styled.th`
  padding: 10px 0;
`;
const Tr = styled.tr`
  border-bottom: 1px solid #d8dce3;
  padding: 5px 0;
`;
const Td = styled.td`
  text-align: center;
  padding: 10px 0;
`;
const Ball = styled.span`
  border-radius: 50% 50%;
  display: inline-block;
  text-align: center;
  background-color: ${(props) =>
    props.number < 10
      ? "#fbc400"
      : props.number < 20
      ? "#69c8f2"
      : props.number < 30
      ? "#ff7272"
      : props.number < 40
      ? "#aaa"
      : "#b0d840"};
  padding: 6px;
  @media (max-width: 1100px) {
    font-size: 12px;
    margin: 0 2px 0 0;
    min-width: 26px;
  }
  @media (min-width: 1100px) {
    font-size: 14px;
    margin: 0 3px 0 0;
    min-width: 25px;
  }
`;
