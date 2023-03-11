import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import ParticipantsProfile from 'components/projectDetail/ParticipantsProfile';

const ProjectItemMembers = ({ applicants, positions }: any) => {
  if (applicants === undefined) applicants = {};

  const members = Object?.keys(applicants).filter((key) => {
    return applicants?.[key]?.recruit === true;
  });

  return (
    <>
      <ProjectInfoLabel>함께하고 있는 팀원</ProjectInfoLabel>
      {positions.planner > 0 && (
        <ProjectMemberPositionList>
          <ProjectMemberPositionLabel>기획</ProjectMemberPositionLabel>
          <ProjectMemberList>
            {members.map((key: string) => {
              if (applicants[key].position === '기획')
                return <ParticipantsProfile key={key} participantsUid={key} />;
            })}
          </ProjectMemberList>
        </ProjectMemberPositionList>
      )}
      {positions.designer > 0 && (
        <ProjectMemberPositionList>
          <ProjectMemberPositionLabel>디자인</ProjectMemberPositionLabel>
          <ProjectMemberList>
            {members.map((key: string) => {
              if (applicants[key].position === '디자인')
                return <ParticipantsProfile key={key} participantsUid={key} />;
            })}
          </ProjectMemberList>
        </ProjectMemberPositionList>
      )}
      {positions.frontend > 0 && (
        <ProjectMemberPositionList>
          <ProjectMemberPositionLabel>프론트</ProjectMemberPositionLabel>
          <ProjectMemberList>
            {members.map((key: string) => {
              if (applicants[key].position === '프론트엔드')
                return <ParticipantsProfile key={key} participantsUid={key} />;
            })}
          </ProjectMemberList>
        </ProjectMemberPositionList>
      )}
      {positions.backend > 0 && (
        <ProjectMemberPositionList>
          <ProjectMemberPositionLabel>백엔드</ProjectMemberPositionLabel>
          <ProjectMemberList>
            {members.map((key: string) => {
              if (applicants[key].position === '백엔드')
                return <ParticipantsProfile key={key} participantsUid={key} />;
            })}
          </ProjectMemberList>
        </ProjectMemberPositionList>
      )}
    </>
  );
};

export default ProjectItemMembers;

const ProjectInfoLabel = styled.strong`
  display: block;
  font-size: 0.875rem;
  color: #464646;
  margin-right: 1rem;
  font-weight: 400;
  cursor: default;
`;

const ProjectMemberPositionList = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.75rem;
  margin-top: 0.625rem;
`;

const ProjectMemberPositionLabel = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.375rem;
  height: 2.1rem;
  padding: 0.25rem 0.5rem;
  margin-right: 1.25rem;
  font-size: 1rem;
  background-color: ${COLORS.violetB300};
  color: ${COLORS.white};
  border-radius: 0.625rem;
`;

const ProjectMemberList = styled.ul`
  display: flex;
  align-items: center;
  min-height: 3.25rem;
  gap: 1.5rem;
`;
