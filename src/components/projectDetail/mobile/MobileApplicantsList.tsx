import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import MobileApplicantCard from './MobileApplicantCard';

const MobileApplicantsList = ({ pid, applicants }: any) => {
  let count = 0;
  return (
    <ApplicantsListWrapper>
      <ApplicantsListTitle>지원자 목록</ApplicantsListTitle>
      <ApplicantsListContainer>
        {applicants &&
          Object.keys(applicants).map((key: any) => {
            if (applicants[key]?.recruit === false) {
              count += 1;
              return (
                <MobileApplicantCard
                  key={key}
                  pid={pid}
                  applicant={applicants[key]}
                />
              );
            }
          })}
      </ApplicantsListContainer>
      {count === 0 && (
        <CannotFoundApplicant>아직 지원자가 없어요 :/</CannotFoundApplicant>
      )}
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

const CannotFoundApplicant = styled.div`
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 8rem;
  color: ${COLORS.gray500};
`;
