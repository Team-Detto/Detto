import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { EditType } from 'types/write/writeType';
import defaultThumbnail from 'assets/images/thumbnail_small.jpg';
import ProjectItemMembers from './ProjectItemMembers';
import { concatSkills } from 'utils/skills';
import UserStacks from 'components/publicProfile/UserStacks';
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
  const {
    plannerStack,
    designerStack,
    developerStack,
    applicants,
    positions,
  }: any = project;

  const stacks = concatSkills(plannerStack, designerStack, developerStack);

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
          <ProjectInfoLabel>프로젝트 스택</ProjectInfoLabel>
          <UserStacks stacks={stacks} />
        </ProjectInfoBox>
        <ProjectInfoBox>
          <ProjectItemMembers
            category={category}
            applicants={applicants}
            positions={positions}
          />
        </ProjectInfoBox>
      </ProjectInfoWrapper>
    </ProjectItemContainer>
  );
};

export default ProjectItem;

const ProjectItemContainer = styled.div`
  width: 100%;
  min-height: 14.25rem;
  display: flex;

  background-color: ${COLORS.white};
  padding: 1.5rem 2.5rem 0.625rem;
  margin-bottom: 1.4rem;
`;

const ProjectThumbnailWrapper = styled.div`
  min-width: 6.25rem;
  max-width: 6.25rem;
  height: 6.25rem;
  margin-right: 1.625rem;
  border-radius: 50%;
  overflow: hidden;
`;

const ProjectThumbnailImg = styled.img`
  display: block;
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 6.25rem;
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

const ProjectInfoLabel = styled.strong`
  display: block;
  font-size: 0.875rem;
  margin-right: 1rem;
  font-weight: 400;
  color: #464646;

  min-width: 5.625rem;
  &:nth-of-type(2) {
  }
`;

const ProjectInfoTitle = styled.h3`
  font-size: 1rem;
  color: ${COLORS.black};
  font-weight: 500;
`;
