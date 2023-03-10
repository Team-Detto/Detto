import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import MobileApplicantCard from './MobileApplicantCard';

interface Applicants {
  [key: string]: any;
  recruit: boolean;
}
interface MobileApplicantsListProps {
  pid: string;
  applicants: Applicants;
}

const MobileApplicantsList = ({
  pid,
  applicants,
}: MobileApplicantsListProps) => {
  let count = 0;
  return (
    <ApplicantsListWrapper>
      <ApplicantsListTitle>지원자 목록</ApplicantsListTitle>
      <ApplicantsListContainer>
        {applicants &&
          Object.keys(applicants).map((key: string) => {
            if (applicants[key]?.recruit === false) {
              count += 1;
              return (
                <MobileApplicantCard
                  key={key}
                  pid={pid}
                  applicant={applicants[key]}
                  applicantUid={key}
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
  padding-top: 1.1875rem;
`;

const ApplicantsListTitle = styled.div`
  font-size: 1.5rem;
  margin-left: 1rem;
  font-size: 0.75rem;
  line-height: 140%;
`;

const ApplicantsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.375rem;
  gap: 0.75rem;
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
