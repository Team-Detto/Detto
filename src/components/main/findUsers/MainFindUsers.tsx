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
  padding: 0rem;
  gap: 6.5rem;
  width: 73.75rem;
  margin: 0rem auto;
  padding-bottom: 15rem;
`;
const MainFindUsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem;
  gap: 2.8125rem;
  width: 39.0625rem;
  height: 8.5625rem;
`;
const MainFindUsersTitleDiv = styled.div`
  width: 29.375rem;
  height: 2.75rem;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.75rem;
  display: flex;
  align-items: center;
  color: ${COLORS.gray800};
`;
const MainFindUsersButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0rem;
  gap: 1.1875rem;
  width: 39.0625rem;
  height: 3rem;
`;
const MainFindUsersButton = styled.button<{ active: boolean }>`
  width: 9.375rem;
  height: 3rem;

  font-weight: ${(props) => (props.active ? '700' : '400')};
  font-size: 1rem;
  line-height: 2rem;

  color: ${(props) => (props.active ? COLORS.white : COLORS.black)};
  background-color: ${(props) =>
    props.active ? COLORS.violetB400 : COLORS.gray50};
  border-radius: 2.25rem;

  &:hover {
    background-color: ${(props) =>
      props.active ? COLORS.violetB300 : COLORS.gray100};
  }
`;
const SlideArea = styled.div`
  width: 73.75rem;
`;

export default MainFindUsers;
