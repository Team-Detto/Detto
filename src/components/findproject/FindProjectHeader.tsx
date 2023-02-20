import { positionList } from 'utils/positions';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

interface Props {
  toggle: boolean;
  category: string;
  onCategoryClickEvent: (e: any) => void;
  onToggleClickEvent: () => void;
}

const FindProjectHeader = ({
  category,
  toggle,
  onCategoryClickEvent,
  onToggleClickEvent,
}: Props) => {
  return (
    <FindProjectHeaderContainer>
      <FindProjectHeaderLeftBox>
        <FindProjectCategoryBox>
          {positionList.map((position) => (
            <FindProjectCategoryButton
              key={position.type}
              name={position.type}
              category={category}
              onClick={onCategoryClickEvent}
            >
              {position.name}
            </FindProjectCategoryButton>
          ))}
        </FindProjectCategoryBox>
      </FindProjectHeaderLeftBox>
      <FindProjectHeaderRightBox>
        <FindProjectToggleBox>
          <FindProjectToggleButton onClick={onToggleClickEvent} toggle={toggle}>
            <FindProjectToggleCircle toggle={toggle} />
          </FindProjectToggleButton>
          <FindProjectToggleText toggle={toggle}>모집 중</FindProjectToggleText>
          <FindProjectToggleSubText> 글만 보기</FindProjectToggleSubText>
        </FindProjectToggleBox>
      </FindProjectHeaderRightBox>
    </FindProjectHeaderContainer>
  );
};

const FindProjectHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 13rem;
  border-bottom: 1px solid ${COLORS.gray400};
`;
const FindProjectHeaderLeftBox = styled.div`
  width: 40%;
  height: 2.5rem;
`;
const FindProjectCategoryBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const FindProjectCategoryButton = styled.button`
  width: 100%;
  height: 2rem;
  padding-bottom: 2.5rem;
  border-bottom: ${(props: { name: string; category: string }) =>
    props.name === props.category ? `2px solid ${COLORS.violetB500}` : 'none'};
  color: ${(props: { name: string; category: string }) =>
    props.name === props.category
      ? `${COLORS.violetB500}`
      : `${COLORS.gray400}`};
  transition: all 0.3s ease-in-out;
`;
const FindProjectHeaderRightBox = styled.div`
  width: 60%;
`;
const FindProjectToggleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const FindProjectToggleButton = styled.button`
  width: 3.125rem;
  border-radius: 1.875rem;
  border: none;
  cursor: pointer;
  background-color: ${(props: { toggle: boolean }) =>
    props.toggle ? `${COLORS.gray750}` : `${COLORS.violetB500}`};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 300ms ease-in-out;
`;
const FindProjectToggleCircle = styled.div`
  background-color: ${COLORS.white};
  width: 1.3125rem;
  height: 1.3125rem;
  border-radius: 3.125rem;
  position: absolute;
  left: 5%;
  transition: all 0.3s ease-in-out;
  ${(props: { toggle: boolean }) =>
    props.toggle ? 'transform: translateX(0)' : 'transform: translateX(100%)'};
`;
const FindProjectToggleText = styled.p`
  margin: 0rem 0.5rem 0rem 0.5rem;
  font-weight: 700;
  font-size: 1.125rem;
  color: ${(props: { toggle: boolean }) =>
    props.toggle ? `${COLORS.gray800}` : `${COLORS.violetB500}`};
  transition: all 0.3s ease-in-out;
`;
const FindProjectToggleSubText = styled.p`
  font-size: 1.125rem;
`;

export default FindProjectHeader;
