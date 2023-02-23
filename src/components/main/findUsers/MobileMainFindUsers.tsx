import { useState } from 'react';
import styled from '@emotion/styled';
import MobileFindUserSlider from './MobileFindUserSlider';
import COLORS from 'assets/styles/colors';
import { positionList } from 'utils/positions';

const MobileMainFindUsers = () => {
  const [tap, setTap] = useState(positionList[0].type);

  return (
    <MainFindUsersWrap>
      <MainFindUsersContainer>
        <MainFindUsersTitleDiv>팀원이 기다리고 있어요!</MainFindUsersTitleDiv>
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
        <MobileFindUserSlider tap={tap} />
      </SlideArea>
    </MainFindUsersWrap>
  );
};
const MainFindUsersWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const MainFindUsersContainer = styled.div``;
const MainFindUsersTitleDiv = styled.div`
  width: 14.375rem;
  height: 1.5rem;

  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.5rem;
`;
const MainFindUsersButtonContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;

  width: 100%;
  height: 3rem;

  margin-top: 0.625rem;

  border-bottom: 1px solid ${COLORS.gray100};
`;
const MainFindUsersButton = styled.button<{ active: boolean }>`
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 0.375rem;

  height: 3rem;
  font-weight: 500;
  font-size: 0.9375rem;
  line-height: 1.5rem;

  color: ${(props) => (props.active ? COLORS.violetB300 : `#909599`)};
  border-bottom: ${(props) =>
    props.active ? `2px solid ${COLORS.violetB300}` : `none`};
`;
const SlideArea = styled.div`
  margin: 0 auto;
  width: 20.25rem;
`;

export default MobileMainFindUsers;
