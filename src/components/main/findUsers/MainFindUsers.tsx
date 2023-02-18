import { useState } from 'react';
import styled from '@emotion/styled';
import FindUserSlider from './FindUserSlider';
import COLORS from 'assets/styles/colors';
import { positionList } from 'utils/positions';

const MainFindUsers = () => {
  const [tap, setTap] = useState(positionList[0].type);

  return (
    <MainFindUsersWrap>
      <MainFindUsersContainer>
        <MainFindUsersTitleDiv>
          이런 팀원 분들이 기다리고 있어요!
        </MainFindUsersTitleDiv>
        <MainFindUsersButtonContainer>
          {positionList.map((position) => (
            <MainFindUsersButton
              key={position.type}
              name={position.type}
              value={tap}
              onClick={() => setTap(position.type)}
              active={position.type === tap}
            >
              {position.name}
            </MainFindUsersButton>
          ))}
        </MainFindUsersButtonContainer>
      </MainFindUsersContainer>
      <SlideArea>
        <FindUserSlider tap={tap} />
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
  margin: 0px auto;
  padding-bottom: 453px;
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
const MainFindUsersButton = styled.button<{ active: boolean }>`
  width: 150px;
  height: 48px;

  font-weight: ${(props) => (props.active ? '700' : '400')};
  font-size: 16px;
  line-height: 32px;

  color: ${(props) => (props.active ? COLORS.white : COLORS.black)};
  background-color: ${(props) =>
    props.active ? COLORS.violetB400 : COLORS.gray50};
  border-radius: 36px;

  &:hover {
    background-color: ${(props) =>
      props.active ? COLORS.violetB300 : COLORS.gray100};
  }
`;
const SlideArea = styled.div`
  width: 1180px;
`;

export default MainFindUsers;
