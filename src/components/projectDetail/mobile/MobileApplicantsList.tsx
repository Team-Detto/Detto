import styled from '@emotion/styled';
import MobileApplicantCard from './MobileApplicantCard';

const MobileApplicantsList = ({ applicants }: any) => {
  return (
    <ApplicantsListWrapper>
      <ApplicantsListTitle>지원자 목록</ApplicantsListTitle>
      <ApplicantsListContainer>
        {applicants &&
          Object.keys(applicants).map((key: any) => {
            return (
              <MobileApplicantCard key={key} applicant={applicants[key]} />
            );
          })}
      </ApplicantsListContainer>
    </ApplicantsListWrapper>
  );
};

export default MobileApplicantsList;

const ApplicantsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 19px;
`;

const ApplicantsListTitle = styled.div`
  font-size: 1.5rem;
  margin-left: 16px;
  font-size: 12px;
  line-height: 140%;
`;

const ApplicantsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6px;
  gap: 12px;
`;
