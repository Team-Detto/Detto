import { useEffect } from 'react';
import Slider from 'react-slick';
import styled from '@emotion/styled';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import VectorUp from 'assets/images/VectorUp.png';
import VectorDown from 'assets/images/VectorDown.png';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dayListState, selectedProjectState } from '../../../recoil/atoms';
import { getDate } from 'utils/date';
import COLORS from 'assets/styles/colors';

const settings = {
  initialSlide: 0,
  centerPadding: '40px',
  slidesToShow: 3,
  slidesToScroll: 3,
  swipeToSlide: true,
  vertical: true,
  draggable: true,
  verticalSwiping: true,
};

const ProjectList = () => {
  const dayList = useRecoilValue<any>(dayListState);
  const [selectedProject, setSelectedProject] =
    useRecoilState(selectedProjectState);

  useEffect(() => {
    // 슬라이더의 첫번째 프로젝트를 초기값으로 설정
    setSelectedProject(dayList[0]);
  }, [dayList]);

  return (
    <ProjectListSlider {...settings} infinite={dayList.length >= 3}>
      {dayList?.map((data: any) => {
        const cntDevelopers = data.positions.frontend + data.positions.backend;
        const cntDesingers = data.positions.designer;
        const cntPlanners = data.positions.planner;
        return (
          <ProjectListCardContainer
            key={data}
            onClick={() => setSelectedProject(data)}
            active={data.id === selectedProject?.id}
          >
            <ProjectListCardTextBox>
              <ProjectListCardFindUser>
                기획 {cntPlanners}명 | 디자이너 {cntDesingers}명 | 개발{' '}
                {cntDevelopers}명 찾고 있어요!
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
  );
};

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
    width: 26px;
    height: 26px;
    cursor: pointer;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50px);
  }
  .slick-prev:before {
    width: 26px;
    height: 26px;
    background-image: url(${VectorUp});
    background-size: 26px 26px;
    display: inline-block;
    content: '';
  }
  .slick-next {
    width: 26px;
    height: 26px;
    cursor: pointer;
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, 24px);
  }
  .slick-next:before {
    width: 26px;
    height: 26px;
    background-image: url(${VectorDown});
    background-size: 26px 26px;
    display: inline-block;
    content: '';
  }
`;
const ProjectListCardContainer = styled.div<{ active?: boolean }>`
  padding: 12px 16px;
  gap: 8px;
  width: 300px;
  height: 85px;
  margin-bottom: 0.8rem;
  background: ${COLORS.white};
  border: 1px solid;
  border-color: ${({ active }) => (active ? COLORS.violetB500 : '#e5e5e5')};
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    border: 1px solid ${COLORS.violetB500};
  }
  transition: all 100ms ease-in-out;
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
