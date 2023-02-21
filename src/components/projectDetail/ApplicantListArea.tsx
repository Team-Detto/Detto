import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import ApplicantCard from './ApplicantCard';

const ApplicantListArea = ({ projectData, pid }: any) => {
  const { applicants } = projectData;
  let countFlag = 0;
  return (
    <>
      <ApplicantListContainer>
        <ApplicantListTitle>지원자 목록</ApplicantListTitle>
        <ApplicantListContent>
          {applicants &&
            Object.keys(applicants).map((key) => {
              if (applicants[key]?.recruit === false) {
                countFlag += 1;
                return (
                  <ApplicantCard
                    key={key}
                    pid={pid}
                    applicant={applicants[key]}
                  />
                );
              }
            })}
          {countFlag === 0 && (
            <CannotFoundApplicant>아직 지원자가 없어요 :/</CannotFoundApplicant>
          )}
        </ApplicantListContent>
      </ApplicantListContainer>
    </>
  );
};

export default ApplicantListArea;

const ApplicantListContainer = styled.div`
  padding: 5rem 6.0625rem;
`;

const ApplicantListTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
`;

const ApplicantListContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3.625rem;
  margin-top: 3.5625rem;
`;
const CannotFoundApplicant = styled.div`
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${COLORS.gray500};
`;
