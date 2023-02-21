import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import MobileApplicantCard from './MobileApplicantCard';

const MobileApplicantsList = ({ applicants }: any) => {
  let countFlag = 0;
  return (
    <ApplicantsListWrapper>
      <ApplicantsListTitle>지원자 목록</ApplicantsListTitle>
      <ApplicantsListContainer>
        {applicants &&
          Object.keys(applicants).map((key: any) => {
            // if (applicants[key]?.recruit === false) countFlag++;

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
  /* padding: 23px 17px 37px 17px; */
  gap: 12px;
`;
