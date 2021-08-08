import React from "react";
import styled, { css } from "styled-components";
import useSWR from "swr";
import fetch from "unfetch";
import * as dateFns from "date-fns";
import { measureUp } from "../util/money";

const fetcher = (url) => fetch(url).then((r) => r.json());

const index = () => {
  const { data, error } = useSWR(
    `${process.env.API_URL}?offset=0&limit=8`,
    fetcher
  );
  if (!data) {
    return <Loading>데이터를 불러오는 중입니다...</Loading>;
  }
  return (
    <Wrapper>
      {/* 모바일용 */}
      <MobileView>
        <table>
          <tbody>
            <Tr>
              <Th>회차</Th>
              <Th>1등당첨금</Th>
              <Th>당첨번호</Th>
            </Tr>
            {data.data
              .sort((a, b) => b.drwNo - a.drwNo)
              .map(
                (item, index) =>
                  index < 9 && (
                    <Tr key={index}>
                      <Td>{item.drwNo}</Td>
                      <Td>{measureUp(item.firstWinamnt)}원</Td>
                      <Td>
                        <Ball number={item.drwtNo1}>{item.drwtNo1}</Ball>
                        <Ball number={item.drwtNo2}>{item.drwtNo2}</Ball>
                        <Ball number={item.drwtNo3}>{item.drwtNo3}</Ball>
                        <Ball number={item.drwtNo4}>{item.drwtNo4}</Ball>
                        <Ball number={item.drwtNo5}>{item.drwtNo5}</Ball>
                        <Ball number={item.drwtNo6}>{item.drwtNo6}</Ball> +{" "}
                        <Ball number={item.bnusNo}>{item.bnusNo}</Ball>
                      </Td>
                    </Tr>
                  )
              )}
          </tbody>
        </table>
      </MobileView>
      {/* 데스크톱용 테이블.모바일에선 테이블 안보임 */}
      <DesktopView>
        <table>
          <tbody>
            <Tr>
              <Th>회차</Th>
              <Th>1등당첨금</Th>
              <Th>당첨번호</Th>
              <Th>보너스</Th>
              <Th>개표일</Th>
            </Tr>
            {data.data
              .sort((a, b) => b.drwNo - a.drwNo)
              .map(
                (item, index) =>
                  index < 5 && (
                    <Tr key={index}>
                      <Td>{item.drwNo}</Td>
                      <Td>{measureUp(item.firstWinamnt)}원</Td>
                      <Td>
                        <Ball number={item.drwtNo1}>{item.drwtNo1}</Ball>
                        <Ball number={item.drwtNo2}>{item.drwtNo2}</Ball>
                        <Ball number={item.drwtNo3}>{item.drwtNo3}</Ball>
                        <Ball number={item.drwtNo4}>{item.drwtNo4}</Ball>
                        <Ball number={item.drwtNo5}>{item.drwtNo5}</Ball>
                        <Ball number={item.drwtNo6}>{item.drwtNo6}</Ball>
                      </Td>
                      <Td>
                        <Ball number={item.bnusNo}>{item.bnusNo}</Ball>
                      </Td>
                      <Td>
                        {dateFns.format(new Date(item.drwNoDate), "yyyy-MM-dd")}
                      </Td>
                    </Tr>
                  )
              )}
          </tbody>
        </table>
      </DesktopView>
    </Wrapper>
  );
};

export default index;

const Wrapper = styled.div`
  & table {
    border-collapse: collapse;
    width: 100%;
  }
  & tbody {
  }
`;

const Loading = styled.p`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileView = styled.div`
  font-size: 14px;
  @media (min-width: 1100px) {
    display: none;
  }
`;
const DesktopView = styled.div`
  font-size: 17px;
  @media (max-width: 1100px) {
    display: none;
  }
`;
const Th = styled.th`
  padding: 10px 0;
`;
const Tr = styled.tr`
  border-bottom: 1px solid #d8dce3;
  padding: 5px 0;
  background-color: #fdfdfd;
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
