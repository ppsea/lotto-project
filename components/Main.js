import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import About from "./About";
import LottoList from "./LottoList";
const index = () => {
  const router = useRouter();
  const [friendName, setFriendName] = useState("");
  const onChangeFriendName = useCallback((e) => {
    setFriendName(e.target.value);
  }, []);
  const pressEnter = useCallback(
    (e) => {
      if (e.key == "Enter") {
        if (friendName.length > 0) {
          router.push("/friends/[name]", `/friends/${friendName}`);
        }
      }
    },
    [friendName]
  );
  const onClickFriend = useCallback(() => {
    if (friendName.length > 0) {
      router.push("/friends/[name]", `/friends/${friendName}`);
    } else {
      router.push("/friends/[name]", `/friends/친구야`);
    }
  }, [friendName]);

  return (
    <Wrapper>
      <Img>
        <InnerBlock>
          <Greeting>
            <Input
              value={friendName}
              onChange={onChangeFriendName}
              onKeyDown={pressEnter}
              placeholder="친구 이름(별명)을 입력해주세요"
            />
            <GreetingButton onClick={onClickFriend}></GreetingButton>
          </Greeting>
        </InnerBlock>
      </Img>
      <About />
      <LottoList />
    </Wrapper>
  );
};

export default index;
const Wrapper = styled.div`
  width: 100vw;
  padding-bottom: 50px;
`;
const Img = styled.div`
  position: relative;
  background-image: url("/static/main.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.9;
  @media (max-width: 1100px) {
    width: 100vw;
    height: 100vw;
  }
  @media (min-width: 1100px) {
    width: 100vw;
    height: 60vh;
  }
`;
const InnerBlock = styled.div`
  position: absolute;
  color: #fff;
  left: 0;
  right: 0;
  width: 80vw;
  margin: 0 auto;
  @media (max-width: 1100px) {
    top: 45vw;
  }
  @media (min-width: 1100px) {
    top: 25vh;
  }
`;

const Greeting = styled.div`
  display: flex;
  align-items: center;
`;
const GreetingButton = styled.div`
  background-image: url("/static/right.svg");
  background-size: 100% 100%;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
const Input = styled.input`
  color: #fff;
  ::placeholder {
    color: #fff;
  }
  @media (max-width: 1100px) {
    font-size: 20px;
    width: 80vw;
  }
  @media (min-width: 1100px) {
    font-size: 42px;
    height: 56px;
    line-height: 55px;
    width: 500px;
  }
`;
