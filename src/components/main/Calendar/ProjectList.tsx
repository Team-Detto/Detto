import { useEffect, useRef } from 'react';
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
  const sliderRef = useRef<Slider>(null);

  const dayListFilter = dayList.filter((el: any) => el.isRecruiting === true);
  useEffect(() => {
    // 날짜를 변경하면 첫번째 프로젝트를 선택하고, 첫번째 페이지로 이동
    setSelectedProject(dayList[0]);
    sliderRef.current?.slickGoTo(0);
  }, [dayList]);

  if (dayList.length === 0)
    return (
      <NoDataMessage>
        NO DATA :/
        <span style={{ fontSize: '1rem' }}>다른 날짜를 선택해주세요</span>
      </NoDataMessage>
    );

  return (
    <ProjectListSlider
      {...settings}
      infinite={dayList.length >= 3}
      ref={sliderRef}
    >
      {dayListFilter?.map((data: any) => {
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
                {cntPlanners > 0 && `기획 ${cntPlanners}명 `}
                {cntPlanners > 0 && cntDesingers > 0 && `| `}
                {cntPlanners > 0 &&
                  cntDesingers == 0 &&
                  cntDevelopers > 0 &&
                  `| `}
                {cntDesingers > 0 && `디자이너 ${cntDesingers}명 `}
                {cntDesingers > 0 && cntDevelopers > 0 && `| `}
                {cntDevelopers > 0 && `개발 ${cntDevelopers}명`}
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

export default ProjectList;

const ProjectListSlider = styled(Slider)`
  .slick-list {
    width: 18.75rem;
    height: 17.9375rem !important;
  }
  .slick-arrow {
    display: flex;
    z-index: 10;
  }
  .slick-prev {
    width: 1.625rem;
    height: 1.625rem;
    cursor: pointer;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50px);
    &:hover {
      opacity: 0.8;
    }
  }
  .slick-prev:before {
    width: 1.625rem;
    height: 1.625rem;
    background-image: url(${VectorUp});
    background-size: 26px 26px;
    display: inline-block;
    content: '';
    opacity: 1;
  }
  .slick-next {
    width: 1.625rem;
    height: 1.625rem;
    cursor: pointer;
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, 24px);
    &:hover {
      opacity: 0.8;
    }
  }
  .slick-next:before {
    width: 1.625rem;
    height: 1.625rem;
    background-image: url(${VectorDown});
    background-size: 26px 26px;
    display: inline-block;
    content: '';
    opacity: 1;
  }
`;

const ProjectListCardContainer = styled.div<{ active?: boolean }>`
  padding: 12px 16px;
  gap: 8px;
  width: 18.75rem;
  height: 5.3125rem;
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
  width: 16.75rem;
  height: 2.375rem;
  margin-bottom: 5px;
`;

const ProjectListCardFindUser = styled.div`
  width: 16.75rem;
  height: 0.875rem;
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
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: #464646;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProjectListCardDate = styled.div`
  width: 268px;
  height: 15px;
  font-weight: 400;
  font-size: 10px;
  line-height: 150%;
  display: flex;
  align-items: center;
  color: #616161;
`;

const NoDataMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 300px;
  height: 287px;

  font-size: 1.25rem;
  font-weight: 700;
  line-height: 200%;
  color: ${COLORS.gray300};
`;
