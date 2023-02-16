import React, { useEffect } from 'react';
import Slider from 'react-slick';
import styled from '@emotion/styled';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import VectorUp from 'assets/images/VectorUp.png';
import VectorDown from 'assets/images/VectorDown.png';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dayListState, detailListState } from '../../../recoil/atoms';
import { getDate } from 'utils/date';

const ProjectList = () => {
  const dayList = useRecoilValue<any>(dayListState);
  const setDetailList = useSetRecoilState(detailListState);
  const detailList = (id: string) => {
    const List = dayList.filter((el: any) => el.id === id);
    return setDetailList(List);
  };
  const settings = {
    infinite: false,
    initialSlide: 0,
    centerPadding: '40px',
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    vertical: true,
    draggable: true,
  };
  return (
    <ProjectListWrap>
      <ProjectListSlider {...settings}>
        {dayList?.map((data: any) => {
          const Developer = data.positions.frontend + data.positions.backend;
          const Designer = data.positions.designer;
          const Planner = data.positions.planner;
          return (
            <ProjectListCardContainer
              key={data}
              onClick={() => {
                detailList(data.id);
              }}
            >
              <ProjectListCardTextBox>
                <ProjectListCardFindUser>
                  기획 {Planner}명 | 디자이너 {Designer}명 | 개발 {Developer}명
                  찾고 있어요!
                </ProjectListCardFindUser>
                <ProjectListCardProjectName>
                  {data.title}
                </ProjectListCardProjectName>
              </ProjectListCardTextBox>
              <ProjectListCardDate>
                프로젝트 모집 마감일 {getDate(data.deadline)}
              </ProjectListCardDate>
            </ProjectListCardContainer>
          );
        })}
      </ProjectListSlider>
    </ProjectListWrap>
  );
};
const ProjectListWrap = styled.div`
  width: 300px;
  height: 287px;
`;
const ProjectListSlider = styled(Slider)`
  .slick-list {
    width: 300px;
    height: 287px !important;
  }
  .slick-arrow {
    display: flex;
    z-index: 10;
  }
  .slick-prev {
    left: 47%;
    top: -38px;
    cursor: pointer;
    content: 'prev';
  }
  .slick-prev:before {
    width: 24px;
    height: 24px;
    content: url(${VectorUp});
  }
  .slick-next {
    left: 47%;
    top: 324px;
    cursor: pointer;
    content: 'next';
  }
  .slick-next:before {
    width: 24px;
    height: 24px;
    content: url(${VectorDown});
    color: #000;
  }
`;
const ProjectListCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
  width: 300px;
  height: 85px;
  margin-bottom: 0.8rem;
  background: #ffffff;
  border: 1px solid #f2f4f6;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  &:hover {
    border: 1px solid #5d50f0;
  }
  &:focus {
    border: 1px solid #5d50f0;
  }
`;
const ProjectListCardTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 268px;
  height: 38px;
  margin-bottom: 5px;
`;
const ProjectListCardFindUser = styled.div`
  width: 268px;
  height: 14px;
  font-family: 'Noto Sans CJK KR';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 150%;
  display: flex;
  align-items: center;
  color: #616161;
`;
const ProjectListCardProjectName = styled.div`
  width: 268px;
  height: 24px;
  font-family: 'Noto Sans CJK KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  display: flex;
  align-items: center;
  color: #464646;
`;
const ProjectListCardDate = styled.div`
  width: 268px;
  height: 15px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 150%;
  display: flex;
  align-items: center;
  color: #616161;
`;
export default ProjectList;
