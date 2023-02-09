import SwiperCore, { Navigation, Pagination, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import styled from '@emotion/styled';

SwiperCore.use([Navigation, Pagination, Mousewheel]);

const ProjectList = () => {
  return (
    <>
      <ProjectListSwiperContainer
        spaceBetween={16}
        slidesPerView={3}
        navigation={true}
        pagination={{ clickable: true }}
        direction="vertical"
        mousewheel={true}
      >
        <SwiperSlide>
          <ProjectListTextContainer>
            <ProjectRecruitment>
              기획 3명 | 개발 2명 찾고 있어요!
            </ProjectRecruitment>
            <ProjectName>프로젝트 이름</ProjectName>
            <ProjectDeadline>프로젝트 모집 마감일 YYYY.MM.DD</ProjectDeadline>
          </ProjectListTextContainer>
        </SwiperSlide>
        <SwiperSlide>
          <ProjectListTextContainer>
            <ProjectRecruitment>
              기획 3명 | 개발 2명 찾고 있어요!
            </ProjectRecruitment>
            <ProjectName>프로젝트 이름</ProjectName>
            <ProjectDeadline>프로젝트 모집 마감일 YYYY.MM.DD</ProjectDeadline>
          </ProjectListTextContainer>
        </SwiperSlide>
        <SwiperSlide>
          <ProjectListTextContainer>
            <ProjectRecruitment>
              기획 3명 | 개발 2명 찾고 있어요!
            </ProjectRecruitment>
            <ProjectName>프로젝트 이름</ProjectName>
            <ProjectDeadline>프로젝트 모집 마감일 YYYY.MM.DD</ProjectDeadline>
          </ProjectListTextContainer>
        </SwiperSlide>
        <SwiperSlide>
          <ProjectListTextContainer>
            <ProjectRecruitment>
              기획 3명 | 개발 2명 찾고 있어요!
            </ProjectRecruitment>
            <ProjectName>프로젝트 이름</ProjectName>
            <ProjectDeadline>프로젝트 모집 마감일 YYYY.MM.DD</ProjectDeadline>
          </ProjectListTextContainer>
        </SwiperSlide>
        <SwiperSlide>
          <ProjectListTextContainer>
            <ProjectRecruitment>
              기획 3명 | 개발 2명 찾고 있어요!
            </ProjectRecruitment>
            <ProjectName>프로젝트 이름</ProjectName>
            <ProjectDeadline>프로젝트 모집 마감일 YYYY.MM.DD</ProjectDeadline>
          </ProjectListTextContainer>
        </SwiperSlide>
        <SwiperSlide>
          <ProjectListTextContainer>
            <ProjectRecruitment>
              기획 3명 | 개발 2명 찾고 있어요!
            </ProjectRecruitment>
            <ProjectName>프로젝트 이름</ProjectName>
            <ProjectDeadline>프로젝트 모집 마감일 YYYY.MM.DD</ProjectDeadline>
          </ProjectListTextContainer>
        </SwiperSlide>
      </ProjectListSwiperContainer>
    </>
  );
};

const ProjectListSwiperContainer = styled(Swiper)`
  .swiper-wrapper {
    width: 18.75rem;
    height: 26rem;
    /* background: #f2f4f6; */
  }

  .swiper-slide {
    width: 290px;
    height: 85px;
    background: #ffffff;
    border-radius: 0.75rem;
    margin: 0 auto;
    box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.04);
    &:hover {
      border: 1px solid #5d50f0;
    }
  }

  .swiper-button-prev {
    display: none;
  }
  .swiper-button-next {
    display: none;
  }
  .swiper-pagination-bullet {
    background: #5d50f0;
  }
`;
const ProjectListTextContainer = styled.div`
  margin: 12px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const ProjectRecruitment = styled.div`
  font-size: 12px;
  color: #616161;
`;
const ProjectName = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;
const ProjectDeadline = styled.div`
  font-size: 12px;
  color: #616161;
`;
export default ProjectList;
