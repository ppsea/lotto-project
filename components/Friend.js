import React, { useState, useCallback } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import html2canvas from "html2canvas";
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

  function downloadResult() {
    let el = document.getElementById("download");
    html2canvas(el, {
      // scale: 2,
      // scrollY: -50,
      // width: el.scrollWidth,
      // height: el.scrollHeight,
      // backgroundColor: null,
    }).then((canvas) => {
      canvas.setAttribute("style", "display: block");
      var data = canvas.toDataURL("image/png");
      saveAs(data, "lotto.png");
    });
  }

  //FUNCTION 이미지 저장하기.
  function saveAs(uri, fileName) {
    var link = document.createElement("a");
    if (typeof link.download === "string") {
      link.href = uri;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }
  if (name != undefined) {
    return (
      <Wrapper id="download">
        <Name>
          <span>{name}!</span> 로또 1등 가즈아!
        </Name>
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
            Best
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
            {buttonState == "trend" ? (
              <Accent buttonState={buttonState}>최근 잘 나오는</Accent>
            ) : buttonState == "many" ? (
              <Accent buttonState={buttonState}>가장 잘 나오는</Accent>
            ) : buttonState == "random" ? (
              <Accent buttonState={buttonState}>랜덤한</Accent>
            ) : buttonState == "like" ? (
              <Accent buttonState={buttonState}>좋아하는</Accent>
            ) : (
              <></>
            )}
            {buttonState == "trend"
              ? ` 숫자들로 번호를 추천합니다`
              : buttonState == "many"
              ? ` 숫자들로 번호를 추천합니다`
              : buttonState == "random"
              ? ` 숫자들로 번호를 추천합니다`
              : buttonState == "like"
              ? ` 숫자들로 번호를 추천합니다`
              : ""}
          </h3>
          {renderRecommendList()}
        </RecommendBlock>
        <DownloadBlock>
          <DownloadIcon onClick={downloadResult} />
        </DownloadBlock>
      </Wrapper>
    );
  }
  return <></>;
};

export default index;

const Wrapper = styled.div`
  background-image: url("/static/friend.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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

const ButtonBlock = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: row wrap;
  & > div {
    margin-right: 15px;
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
  @media (max-width: 1100px) {
    padding-bottom: 50px;
  }
  @media (min-width: 1100px) {
    padding-bottom: 30px;
  }
`;
const Accent = styled.span`
  color: ${(props) =>
    props.buttonState == "trend"
      ? "#fbc400"
      : (props) =>
          props.buttonState == "many"
            ? "#69c8f2"
            : (props) =>
                props.buttonState == "random"
                  ? "#ff7272"
                  : (props) => (props.buttonState == "like" ? "#b0d840" : "")};
`;

const RecommendTable = styled.table`
  margin: 50px auto 0 auto;
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
    props.number <= 10
      ? "#fbc400"
      : props.number <= 20
      ? "#69c8f2"
      : props.number <= 30
      ? "#ff7272"
      : props.number <= 40
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
const DownloadBlock = styled.div`
  width: 100%;
  @media (min-width: 1100px) {
    padding-bottom: 20px;
  }
`;
const DownloadIcon = styled.div`
  background-image: url("/static/download.svg");
  background-size: 100% 100%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin: 0 auto;
`;
