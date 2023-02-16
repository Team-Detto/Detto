import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

const ProjectItemMembers = ({ applicants }: any) => {
  if (applicants === undefined) applicants = {};

  const members = Object?.keys(applicants).filter((key) => {
    return applicants?.[key]?.recruit === true;
  });

  return (
    <>
      <ProjectInfoLabel>함께하고 있는 팀원</ProjectInfoLabel>
      <ProjectMemberPositionList>
        <ProjectMemberPositionLabel>기획</ProjectMemberPositionLabel>
        <ProjectMemberList>
          {members?.map((key: any) => {
            if (applicants[key].position === '기획')
              return (
                <ProjectMemberItem key={key}>
                  <ProjectMemberProfileImg
                    src={applicants[key].profileURL}
                    alt="멤버프로필이미지"
                  />
                </ProjectMemberItem>
              );
          })}
        </ProjectMemberList>
      </ProjectMemberPositionList>
      <ProjectMemberPositionList>
        <ProjectMemberPositionLabel>디자인</ProjectMemberPositionLabel>
        <ProjectMemberList>
          {members.map((key) => {
            if (
              applicants[key].position === '프론트엔드' ||
              applicants[key].position === '백엔드'
            )
              return (
                <ProjectMemberItem key={key}>
                  <ProjectMemberProfileImg
                    src={applicants[key].profileURL}
                    alt="멤버프로필이미지"
                  />
                </ProjectMemberItem>
              );
          })}
        </ProjectMemberList>
      </ProjectMemberPositionList>
      <ProjectMemberPositionList>
        <ProjectMemberPositionLabel>개발</ProjectMemberPositionLabel>
        <ProjectMemberList>
          {members.map((key) => {
            if (applicants[key].position === '디자인')
              return (
                <ProjectMemberItem key={key}>
                  <ProjectMemberProfileImg
                    src={applicants[key].profileURL}
                    alt="멤버프로필이미지"
                  />
                </ProjectMemberItem>
              );
          })}
        </ProjectMemberList>
      </ProjectMemberPositionList>
    </>
  );
};

export default ProjectItemMembers;

const ProjectMemberProfileImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProjectInfoLabel = styled.span`
  display: block;
  font-size: 1rem;
  color: #464646;
  margin-right: 1rem;
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
  height: 2rem;
  padding: 0 0.75rem;
  margin-right: 1.25rem;
  font-size: 1rem;
  background-color: ${COLORS.gray850};
  color: ${COLORS.white};
  border-radius: 2rem;
`;

const ProjectMemberList = styled.ul`
  display: flex;
  align-items: center;
  min-height: 3.25rem;
  gap: 1.5rem;
`;

const ProjectMemberItem = styled.li`
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
  overflow: hidden;
`;
