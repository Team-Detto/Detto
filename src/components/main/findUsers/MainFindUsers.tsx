import React, { useState } from 'react';
import styled from '@emotion/styled';
import FindUserSlider from './FindUserSlider';
const MainFindUsers = () => {
  const buttonType = [
    { type: 'planner', name: '기획' },
    { type: 'designer', name: '디자인' },
    { type: 'frontend', name: '프론트' },
    { type: 'backend', name: '백엔드' },
  ];
  const [tap, setTap] = useState('기획');
  return (
    <MainFindUsersWrap>
      <MainFindUsersContainer>
        <MainFindUsersTitleDiv>
          이런 팀원 분들이 기다리고 있어요!
        </MainFindUsersTitleDiv>
        <MainFindUsersButtonContainer>
          {buttonType.map((position) => {
            return (
              <MainFindUsersButton
                key={position.type}
                name={position.name}
                value={tap}
                onClick={() => setTap(position.name)}
              >
                {position.name}
              </MainFindUsersButton>
            );
          })}
        </MainFindUsersButtonContainer>
      </MainFindUsersContainer>
      <SlideArea>
        <FindUserSlider />
      </SlideArea>
    </MainFindUsersWrap>
  );
};
const MainFindUsersWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 104px;
  width: 1180px;
  height: 442px;
  margin: 0px auto 289px auto;
`;
const MainFindUsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 45px;
  width: 625px;
  height: 137px;
`;
const MainFindUsersTitleDiv = styled.div`
  width: 470px;
  height: 44px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: 44px;
  display: flex;
  align-items: center;
  color: #4e5968;
`;
const MainFindUsersButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 19px;
  width: 625px;
  height: 48px;
`;
const MainFindUsersButton = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 48px;
  gap: 10px;
  width: 150px;
  height: 48px;
  background: ${(props: { name: string; value: string }) =>
    props.name === props.value ? '#5d50f0' : '#ffffff'};
  color: ${(props: { name: string; value: string }) =>
    props.name === props.value ? '#ffffff' : '#4e5968'};
  border-radius: 36px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  &:hover {
    width: 150px;
    height: 48px;
    background: #6f64f2;
    border-radius: 36px;
    color: #ffffff;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 32px;
  }
`;
const SlideArea = styled.div`
  padding: 0px;
  gap: 134px;
  width: 1180px;
  height: 201px;
`;

export default MainFindUsers;
