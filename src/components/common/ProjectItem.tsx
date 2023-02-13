import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import defaultProfile from 'assets/images/default_profile.jpg';
import { Project } from 'pages/MyPage';

interface ProjectProps {
  project: Project;
}

const ProjectItem = ({ project }: ProjectProps) => {
  return (
    <ProjectItemContainer>
      <ProjectThumbnailWrapper>
        <ProjectThumbnailImg src={project.thumbnail} alt="썸네일이미지" />
      </ProjectThumbnailWrapper>
      <ProjectInfoWrapper>
        <ProjectInfoBox>
          <ProjectInfoLabel>프로젝트</ProjectInfoLabel>
          <ProjectInfoTitle>{project.title}</ProjectInfoTitle>
        </ProjectInfoBox>
        <ProjectInfoBox>
          <ProjectInfoLabel>팀원스택</ProjectInfoLabel>
          <ProjectStackList>
            {project.skills.map((skill) => (
              <ProjectStackItem key={skill}>{skill}</ProjectStackItem>
            ))}
          </ProjectStackList>
        </ProjectInfoBox>
        <ProjectInfoBox>
          <ProjectInfoLabel>함께하고 있는 팀원</ProjectInfoLabel>
          <ProjectMemberPositionBox>
            {project.participants.map((participant) => (
              <ProjectMemberPositionList key={participant.type}>
                <ProjectMemberPositionLabel>
                  {participant.type} {/* 포지션 라벨 ex.기획, 개발, 디자인*/}
                </ProjectMemberPositionLabel>

                <ProjectMemberList>
                  {participant.members.map((m) => (
                    <ProjectMemberItem key={m.uid}>
                      <ProjectMemberProfileImg
                        src={m.profile ?? defaultProfile}
                        alt="멤버닉네임"
                      />
                    </ProjectMemberItem>
                  ))}
                </ProjectMemberList>
              </ProjectMemberPositionList>
            ))}
          </ProjectMemberPositionBox>
        </ProjectInfoBox>
      </ProjectInfoWrapper>
    </ProjectItemContainer>
  );
};

export default ProjectItem;

const ProjectItemContainer = styled.div`
  width: 100%;
  height: 13.75rem;
  display: flex;
  align-items: center;
  background-color: ${COLORS.white};
  padding: 1.25rem 1rem;
  margin-bottom: 1.4rem;
`;

const ProjectThumbnailWrapper = styled.div`
  width: 11.25rem;
  height: 11.25rem;
  margin-right: 2.25rem;
`;

const ProjectThumbnailImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProjectInfoWrapper = styled.div``;

const ProjectInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;

  &:last-child {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0;
  }
`;

const ProjectInfoLabel = styled.span`
  display: block;
  font-size: 1rem;
  color: #464646;
  margin-right: 1rem;
  cursor: default;
`;

const ProjectInfoTitle = styled.h3`
  font-size: 1rem;
  color: ${COLORS.black};
`;

const ProjectStackList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ProjectStackItem = styled.li`
  display: flex;
  align-items: center;

  height: 2rem;
  padding: 0 0.75rem;
  background-color: ${COLORS.gray100};
  border-radius: 2rem;

  font-size: 0.75rem;
  color: ${COLORS.black};

  cursor: default;
`;

const ProjectMemberPositionBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 0.625rem;
`;

const ProjectMemberPositionList = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.75rem;
`;

const ProjectMemberPositionLabel = styled.span`
  display: flex;
  align-items: center;
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
  gap: 1.5rem;
`;

const ProjectMemberItem = styled.li`
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
`;

const ProjectMemberProfileImg = styled(ProjectThumbnailImg)``;
