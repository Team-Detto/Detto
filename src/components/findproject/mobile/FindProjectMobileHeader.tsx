import { MouseEvent } from 'react';
import { mobilePositionList } from 'utils/positions';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  toggle: boolean;
  category: string;
  onCategoryClickEvent: (e: MouseEvent<HTMLButtonElement>) => void;
  onToggleClickEvent: () => void;
}

const FindProjectMobileHeader = ({
  toggle,
  category,
  onCategoryClickEvent,
  onToggleClickEvent,
}: Props) => {
  return (
    <FindProjectMobileHeaderContainer>
      <FindProjectMobileCategoryBox>
        {mobilePositionList.map((position) => (
          <FindProjectMobileCategoryButton
            key={position.type}
            name={position.type}
            category={category}
            onClick={onCategoryClickEvent}
          >
            {position.name}
          </FindProjectMobileCategoryButton>
        ))}
      </FindProjectMobileCategoryBox>
      <FindProjectMobileToggleBox>
        <FindProjectMobileToggleButton
          onClick={onToggleClickEvent}
          toggle={toggle}
        >
          <FindProjectMobileToggleCircle toggle={toggle} />
        </FindProjectMobileToggleButton>
        <FindProjectMobileToggleText toggle={toggle}>
          모집 중
        </FindProjectMobileToggleText>
        <FindProjectMobileToggleSubText>
          글만 보기
        </FindProjectMobileToggleSubText>
      </FindProjectMobileToggleBox>
    </FindProjectMobileHeaderContainer>
  );
};

const FindProjectMobileHeaderContainer = styled.div`
  width: 100%;
  padding-top: 1.5rem;
`;
const FindProjectMobileCategoryBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding-left: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;
const FindProjectMobileCategoryButton = styled.button<{
  name: string;
  category: string;
}>`
  height: 3rem;
  font-weight: 500;
  font-size: 0.9375rem;
  line-height: 1.5rem;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 0.75rem 0.375rem;
  border-bottom: ${({ name, category }) =>
    name === category ? `2px solid ${COLORS.violetB500}` : 'none'};
  color: ${({ name, category }) =>
    name === category ? `${COLORS.violetB500}` : `${COLORS.gray500}`};
`;
const FindProjectMobileToggleBox = styled.div`
  width: 100%;
  height: 3rem;
  background-color: ${COLORS.gray100};
  display: flex;
  align-items: center;
  padding-right: 1rem;
  justify-content: flex-end;
`;
const FindProjectMobileToggleButton = styled.button`
  width: 2.25rem;
  height: 1.25rem;
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
const FindProjectMobileToggleCircle = styled.div`
  background-color: ${COLORS.white};
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 3.125rem;
  position: absolute;
  left: 10%;
  transition: all 0.3s ease-in-out;
  ${(props: { toggle: boolean }) =>
    props.toggle ? 'transform: translateX(0)' : 'transform: translateX(100%)'};
`;
const FindProjectMobileToggleText = styled.p`
  margin: 0rem 0.5rem 0rem 0.5rem;
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 2rem;
  color: ${(props: { toggle: boolean }) =>
    props.toggle ? `${COLORS.gray800}` : `${COLORS.violetB500}`};
  transition: all 0.3s ease-in-out;
`;
const FindProjectMobileToggleSubText = styled.p`
  font-size: 0.875rem;
`;

export default FindProjectMobileHeader;
