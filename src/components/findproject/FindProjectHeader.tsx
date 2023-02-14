import React from 'react';
import { positionList } from 'utils/positions';
import styled from '@emotion/styled';

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
              name={position.name}
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
            <FindProjectToggleCricle toggle={toggle} />
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
  border-bottom: 1px solid #b0b8c1;
`;
const FindProjectHeaderLeftBox = styled.div`
  width: 40%;
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
    props.name === props.category ? '2px solid #5d50f0' : 'none'};
  color: ${(props: { name: string; category: string }) =>
    props.name === props.category ? '#5d50f0' : '#b0b8c1'};
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
  height: 1.75rem;
  border-radius: 1.875rem;
  border: none;
  cursor: pointer;
  background-color: ${(props: { toggle: boolean }) =>
    !props.toggle ? '#5d50f0' : '#6B7684'};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;
const FindProjectToggleCricle = styled.div`
  background-color: #ffffff;
  width: 1.3125rem;
  height: 1.3125rem;
  border-radius: 3.125rem;
  position: absolute;
  left: 5%;
  transition: all 0.5s ease-in-out;
  ${(props: { toggle: boolean }) =>
    props.toggle ? 'transform: translateX(0)' : 'transform: translateX(100%)'};
`;
const FindProjectToggleText = styled.p`
  margin: 0rem 0.5rem 0rem 0.5rem;
  font-weight: 700;
  font-size: 1.125rem;
  color: ${(props: { toggle: boolean }) =>
    !props.toggle ? '#5d50f0' : '#4E5968'};
  transition: all 0.5s ease-in-out;
`;
const FindProjectToggleSubText = styled.p`
  font-size: 1.125rem;
`;

export default FindProjectHeader;
