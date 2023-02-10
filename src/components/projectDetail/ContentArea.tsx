import styled from '@emotion/styled';

const ContentArea = ({ projectData }: any) => {
  return (
    <RecruitContentsContainer>
      <ContentTitle>모집 안내</ContentTitle>
      <ContentWrapper>{projectData?.contents ?? `내용입니다`}</ContentWrapper>
    </RecruitContentsContainer>
  );
};

export default ContentArea;

const RecruitContentsContainer = styled.div`
  margin-top: 3.625rem;
`;

const ContentTitle = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
`;

const ContentWrapper = styled.div`
  width: 73.75rem;
  height: 33.25rem;
  margin-top: 1.6875rem;
  background-color: #fff;
  padding: 2.5rem;
  font-size: 1.25rem;
`;
