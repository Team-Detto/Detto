import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { EditType } from 'types/write/writeType';
import defaultThumbnail from 'assets/images/default_img.jpg';
import ProjectItemMembers from './ProjectItemMembers';
interface ProjectProps {
  category: string;
  project: EditType.EditFormType;
  pid: string;
  onNavigateToProjectDetailEvent: (path: string) => () => void;
}

const ProjectItem = ({
  category,
  project,
  pid,
  onNavigateToProjectDetailEvent,
}: ProjectProps) => {
  const { plannerStack, designerStack, developerStack, applicants }: any =
    project;

  const stacks = [].concat(plannerStack, designerStack, developerStack);

  return (
    <ProjectItemContainer onClick={onNavigateToProjectDetailEvent(pid)}>
      <ProjectThumbnailWrapper>
        <ProjectThumbnailImg
          src={project.thumbnail ?? defaultThumbnail}
          alt="썸네일이미지"
        />
      </ProjectThumbnailWrapper>
      <ProjectInfoWrapper>
        <ProjectInfoBox>
          <ProjectInfoLabel>프로젝트</ProjectInfoLabel>
          <ProjectInfoTitle>{project.title}</ProjectInfoTitle>
        </ProjectInfoBox>
        <ProjectInfoBox>
          <ProjectInfoLabel>팀원스택</ProjectInfoLabel>
          <ProjectStackList>
            {stacks
              .filter((stack, pos) => stacks.indexOf(stack) === pos)
              .map((stack, index) => {
                if (index < 8)
                  return (
                    <ProjectStackItem key={stack}>{stack}</ProjectStackItem>
                  );
              })}
          </ProjectStackList>
        </ProjectInfoBox>
        <ProjectInfoBox>
          <ProjectItemMembers category={category} applicants={applicants} />
        </ProjectInfoBox>
      </ProjectInfoWrapper>
    </ProjectItemContainer>
  );
};

export default ProjectItem;

const ProjectItemContainer = styled.div`
  width: 100%;
  height: 20.625rem;
  display: flex;

  background-color: ${COLORS.white};
  padding: 1.25rem 1rem;
  margin-bottom: 1.4rem;
`;

const ProjectThumbnailWrapper = styled.div`
  width: 7.375rem;
  height: 7.375rem;
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
  font-weight: 500;
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
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
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
  gap: 1.5rem;
`;

const ProjectMemberItem = styled.li`
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
`;

const ProjectMemberProfileImg = styled(ProjectThumbnailImg)``;
