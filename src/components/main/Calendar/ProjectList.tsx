import React from 'react';
import Slider from 'react-slick';
import styled from '@emotion/styled';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import VectorUp from 'assets/images/VectorUp.png';
import VectorDown from 'assets/images/VectorDown.png';

const ProjectList = () => {
  const settings = {
    infinite: false,
    centerPadding: '40px',
    slidesToShow: 3,
    swipeToSlide: true,
    vertical: true,
  };

  return (
    <ProjectListWrap>
      <ProjectListSlider {...settings}>
        {/* card box */}
        <ProjectListCardContainer>
          <ProjectListCardTextBox>
            <ProjectListCardFindUser>
              기획 3명|개발 2명 찾고 있어요!
            </ProjectListCardFindUser>
            <ProjectListCardProjectName>
              프로젝트 이름
            </ProjectListCardProjectName>
          </ProjectListCardTextBox>
          <ProjectListCardDate>
            프로젝트 모집 마감일 YYYY.MM.DD
          </ProjectListCardDate>
        </ProjectListCardContainer>
        {/*  */}
        <ProjectListCardContainer>
          <ProjectListCardTextBox>
            <ProjectListCardFindUser>
              기획 3명|개발 2명 찾고 있어요!
            </ProjectListCardFindUser>
            <ProjectListCardProjectName>
              프로젝트 이름
            </ProjectListCardProjectName>
          </ProjectListCardTextBox>
          <ProjectListCardDate>
            프로젝트 모집 마감일 YYYY.MM.DD
          </ProjectListCardDate>
        </ProjectListCardContainer>
        <ProjectListCardContainer>
          <ProjectListCardTextBox>
            <ProjectListCardFindUser>
              기획 3명|개발 2명 찾고 있어요!
            </ProjectListCardFindUser>
            <ProjectListCardProjectName>
              프로젝트 이름
            </ProjectListCardProjectName>
          </ProjectListCardTextBox>
          <ProjectListCardDate>
            프로젝트 모집 마감일 YYYY.MM.DD
          </ProjectListCardDate>
        </ProjectListCardContainer>
        <ProjectListCardContainer>
          <ProjectListCardTextBox>
            <ProjectListCardFindUser>
              기획 3명|개발 2명 찾고 있어요!
            </ProjectListCardFindUser>
            <ProjectListCardProjectName>
              프로젝트 이름
            </ProjectListCardProjectName>
          </ProjectListCardTextBox>
          <ProjectListCardDate>
            프로젝트 모집 마감일 YYYY.MM.DD
          </ProjectListCardDate>
        </ProjectListCardContainer>
        <ProjectListCardContainer>
          <ProjectListCardTextBox>
            <ProjectListCardFindUser>
              기획 3명|개발 2명 찾고 있어요!
            </ProjectListCardFindUser>
            <ProjectListCardProjectName>
              프로젝트 이름
            </ProjectListCardProjectName>
          </ProjectListCardTextBox>
          <ProjectListCardDate>
            프로젝트 모집 마감일 YYYY.MM.DD
          </ProjectListCardDate>
        </ProjectListCardContainer>
        <ProjectListCardContainer>
          <ProjectListCardTextBox>
            <ProjectListCardFindUser>
              기획 3명|개발 2명 찾고 있어요!
            </ProjectListCardFindUser>
            <ProjectListCardProjectName>
              프로젝트 이름
            </ProjectListCardProjectName>
          </ProjectListCardTextBox>
          <ProjectListCardDate>
            프로젝트 모집 마감일 YYYY.MM.DD
          </ProjectListCardDate>
        </ProjectListCardContainer>
        <ProjectListCardContainer>
          <ProjectListCardTextBox>
            <ProjectListCardFindUser>
              기획 3명|개발 2명 찾고 있어요!
            </ProjectListCardFindUser>
            <ProjectListCardProjectName>
              프로젝트 이름
            </ProjectListCardProjectName>
          </ProjectListCardTextBox>
          <ProjectListCardDate>
            프로젝트 모집 마감일 YYYY.MM.DD
          </ProjectListCardDate>
        </ProjectListCardContainer>
        <ProjectListCardContainer>
          <ProjectListCardTextBox>
            <ProjectListCardFindUser>
              기획 3명|개발 2명 찾고 있어요!
            </ProjectListCardFindUser>
            <ProjectListCardProjectName>
              프로젝트 이름
            </ProjectListCardProjectName>
          </ProjectListCardTextBox>
          <ProjectListCardDate>
            프로젝트 모집 마감일 YYYY.MM.DD
          </ProjectListCardDate>
        </ProjectListCardContainer>
        <ProjectListCardContainer>
          <ProjectListCardTextBox>
            <ProjectListCardFindUser>
              기획 3명|개발 2명 찾고 있어요!
            </ProjectListCardFindUser>
            <ProjectListCardProjectName>
              프로젝트 이름
            </ProjectListCardProjectName>
          </ProjectListCardTextBox>
          <ProjectListCardDate>
            프로젝트 모집 마감일 YYYY.MM.DD
          </ProjectListCardDate>
        </ProjectListCardContainer>
      </ProjectListSlider>
    </ProjectListWrap>
  );
};

export default ProjectList;
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
  /* or 15px */

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
  /* identical to box height, or 24px */

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
  /* identical to box height, or 15px */

  display: flex;
  align-items: center;

  color: #616161;
`;
