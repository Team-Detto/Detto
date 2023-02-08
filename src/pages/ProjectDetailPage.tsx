import styled from '@emotion/styled';
import WebContainer from '../components/common/WebContainer';
import { RiHeartAddLine, RiHeartAddFill, RiShareBoxLine } from 'react-icons/ri';

const ProjectDetailPage = () => {
  return (
    <ProjectDetailContainer>
      <WebContainer>
        <ProjectDetailWrapper>
          <ProjectTitleWrapper>
            <RecruitmentDiv>모집중</RecruitmentDiv>
            <ProjectTitle>프로젝트 명입니다.</ProjectTitle>
          </ProjectTitleWrapper>
          <ProjectThumbnail />
          <WriterAndShareContainer>
            <WriterWrapper>
              {/* 게시글 작성자 프로필 이미지/ Todo: 클릭시 공개프로필로 연결 */}
              <WriterProfileImg />
              <WriterNickname>내 이름은 고난, 탐정이죠</WriterNickname>
            </WriterWrapper>
            <IconWrapper>
              조회 131
              <IconButton>
                {/* Todo: 관심버튼 false->true이면 RiHeartAddFill아이콘으로 변경해주고 +1, true->false이면 RiHeartAddLine아이콘으로 변경해주고 -1*/}
                <RiHeartAddLine />
                관심 00
              </IconButton>
              {/* Todo: 공유기능 추가하기 */}
              <IconButton>
                <RiShareBoxLine />
                공유
              </IconButton>
            </IconWrapper>
          </WriterAndShareContainer>
          <RecruitmentInfoContainer>
            <ProjectInfoWrapper>
              <ProjectInfoObject>
                <ProjectInfoKey>모집인원</ProjectInfoKey>
                <ProjectInfoValue> 00명</ProjectInfoValue>
              </ProjectInfoObject>
              <ProjectInfoObject>
                <ProjectInfoKey>필요스택</ProjectInfoKey>
                <ProjectInfoValue> 기획 개발 디자인</ProjectInfoValue>
              </ProjectInfoObject>
              <ProjectInfoObject>
                <ProjectInfoKey>예상기간</ProjectInfoKey>
                <ProjectInfoValue> 2023.01.01~2023.01.01</ProjectInfoValue>
              </ProjectInfoObject>
              <ProjectInfoObject>
                <ProjectInfoKey>근무지</ProjectInfoKey>
                <ProjectInfoValue> 서울시 강남구</ProjectInfoValue>
              </ProjectInfoObject>
            </ProjectInfoWrapper>
            <MemberInfoWrapper>
              <MemberInfoTitle>현재 참여중인 인원</MemberInfoTitle>
              <MemberInfoBox>
                <MemberInfoDiv>
                  <PositionDiv>기획</PositionDiv>
                  {/*  Todo: 클릭시 공개프로필로 연결 */}
                  <MemberProfileImg />
                  <MemberProfileImg />
                </MemberInfoDiv>
                <MemberInfoDiv>
                  <PositionDiv>개발</PositionDiv>
                  <MemberProfileImg />
                  <MemberProfileImg />
                  <MemberProfileImg />
                </MemberInfoDiv>
                <MemberInfoDiv>
                  <PositionDiv>디자인</PositionDiv>
                  <MemberProfileImg />
                  <MemberProfileImg />
                </MemberInfoDiv>
              </MemberInfoBox>
            </MemberInfoWrapper>
          </RecruitmentInfoContainer>
          <RecruitContentsContainer>
            <ContentTitle>모집 안내</ContentTitle>
            <ContentWrapper>내용입니당</ContentWrapper>
          </RecruitContentsContainer>
          <ButtonWrapper>
            <ApplyButton>간단 지원하기</ApplyButton>
          </ButtonWrapper>
        </ProjectDetailWrapper>
      </WebContainer>
    </ProjectDetailContainer>
  );
};

export default ProjectDetailPage;

const ProjectDetailContainer = styled.div`
  background-color: #fcfcfc;
  height: 163.25rem;
`;

const ProjectDetailWrapper = styled.div`
  width: 73.75rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const ProjectTitleWrapper = styled.div`
  margin-top: 16.125rem;
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const RecruitmentDiv = styled.div`
  background-color: #6f64f2;
  color: #fff;
  padding: 0.625rem 1.875rem;
  border-radius: 2.5rem;
`;

const ProjectTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
`;

const ProjectThumbnail = styled.div`
  width: 73.75rem;
  height: 36.5rem;
  margin-top: 1rem;
  background-color: #dadada;
`;

const WriterAndShareContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.125rem;
`;

const WriterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 279px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const WriterProfileImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #aaaaaa;
`;

const WriterNickname = styled.p`
  font-size: 1rem;
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`;

const RecruitmentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 73.75rem;
  height: 43.3125rem;
  background-color: #fff;
  margin-top: 3.5rem;
  align-items: center;
  padding: 40px;
`;

const ProjectInfoWrapper = styled.div`
  width: 63.625rem;
  height: 12.5rem;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProjectInfoObject = styled.div`
  display: flex;
  align-items: center;
  gap: 45px;
`;

const ProjectInfoKey = styled.div`
  width: 88px;
`;

const ProjectInfoValue = styled.div``;

const MemberInfoWrapper = styled.div`
  width: 63.625rem;
  height: 22.75rem;
  margin-top: 2.75rem;
  display: flex;
  flex-direction: column;
`;

const MemberInfoTitle = styled.div`
  height: 32px;
  font-weight: 500;
  font-size: 20px;
`;

const MemberInfoBox = styled.div`
  height: 100%;
  margin: 36px 0 1.25rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MemberInfoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const PositionDiv = styled.div`
  font-size: 24px;
  background-color: #6f64f2;
  width: 127px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 18px;
`;

const MemberProfileImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #aaaaaa;
`;

const RecruitContentsContainer = styled.div`
  margin-top: 3.625rem;
`;

const ContentTitle = styled.div`
  font-weight: 500;
  font-size: 24px;
`;

const ContentWrapper = styled.div`
  width: 73.75rem;
  height: 33.25rem;
  margin-top: 1.6875rem;
  background-color: #fff;
  padding: 2.5rem;
  font-size: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3.5rem;
`;

const ApplyButton = styled.button`
  width: 32.5625rem;
  height: 5.5rem;
  background: #6f64f2;
  border-radius: 2.25rem;
  font-size: 1.75rem;
  color: #fff;
`;
