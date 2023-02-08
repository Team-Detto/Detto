import styled from '@emotion/styled';

const ProjectDetailPage = () => {
  return (
    <ProjectDetailContainer>
      <ProjectDetailDiv>
        <ProjectTitle>모집중 프로젝트 명입니다.</ProjectTitle>
        <ProjectThumbnail></ProjectThumbnail>
        <WriterAndShareContainer>
          <WriterWrapper>
            <WriterProfileImg />
            <WriterNickname>닉네임입니다. 닉네임입니다.</WriterNickname>
          </WriterWrapper>
          <IconWrapper>조회 00 관심 00 공유 </IconWrapper>
        </WriterAndShareContainer>
        <RecruitmentInfoContainer>
          <ProjectInfoWrapper>
            <ProjectInfo>모집인원: 1명</ProjectInfo>
            <ProjectInfo>필요스택: 기획 프론트 백엔드 디자인</ProjectInfo>
            <ProjectInfo>예상기간: 2021.01.01 ~ 2021.01.01</ProjectInfo>
            <ProjectInfo>근무지: 서울 강남구</ProjectInfo>
          </ProjectInfoWrapper>
          <MemberInfoWrapper>
            <MemberInfoTitle>현재 참여중인 인원</MemberInfoTitle>
            <MemberInfoBox>
              <MemberInfo>기획 동그라미 동그라미</MemberInfo>
              <MemberInfo>기획 동그라미 동그라미</MemberInfo>
              <MemberInfo>기획 동그라미 동그라미</MemberInfo>
            </MemberInfoBox>
          </MemberInfoWrapper>
        </RecruitmentInfoContainer>
        <RecruitContentsContainer>
          <ContentTitle>모집 안내</ContentTitle>
          <ContentWrapper>내용입니당</ContentWrapper>
        </RecruitContentsContainer>
        <ApplyButton>간단 지원하기</ApplyButton>
      </ProjectDetailDiv>
    </ProjectDetailContainer>
  );
};

export default ProjectDetailPage;

const ProjectDetailContainer = styled.div`
  background-color: #fcfcfc;
`;

const ProjectDetailDiv = styled.div`
  width: 1180px;
  display: flex;
  flex-direction: column;
  margin: 150px auto;
`;

const ProjectTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ProjectThumbnail = styled.div`
  width: 1180px;
  height: 584px;
  background-color: #dadada;
`;

const WriterAndShareContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 34px;
`;

const WriterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const WriterProfileImg = styled.img`
  width: 40px;
  height: 40px;
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
  width: 1180px;
  height: 693px;
  background-color: #fff;
  margin-top: 56px;
  align-items: center;
`;

const ProjectInfoWrapper = styled.div`
  width: 1018px;
  height: 200px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProjectInfo = styled.div``;

const MemberInfoWrapper = styled.div`
  width: 1018px;
  height: 364px;
  margin-top: 44px;
  display: flex;
  flex-direction: column;
`;

const MemberInfoTitle = styled.div`
  height: 48px;
`;

const MemberInfoBox = styled.div`
  height: 100%;
  margin: 20px 200px 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MemberInfo = styled.div``;

const RecruitContentsContainer = styled.div`
  margin-top: 58px;
`;

const ContentTitle = styled.div``;

const ContentWrapper = styled.div`
  width: 1180px;
  height: 532px;
  margin-top: 27px;
  background-color: #fff;
  padding: 40px;
`;

const ApplyButton = styled.button`
  margin-top: 56px;
  width: 521px;
  height: 88px;
  background: #6f64f2;
  border-radius: 36px;
`;
