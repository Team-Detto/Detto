import MobileContentCard from 'components/MobileContentCard';
import styled from '@emotion/styled';

interface Props {
  projects: EditType.EditFormType[];
  toggle: boolean;
  category: string;
  likedProjects: string[];
  onNavigateToProjectDetailEvent: (path: string) => () => void;
}

const FindProjectMobileList = ({
  projects,
  toggle,
  category,
  likedProjects,
  onNavigateToProjectDetailEvent,
}: Props) => {
  return (
    <FindProjectMobileListContainer>
      {projects
        .filter((project: any) => project.positions[category] !== 0)
        .map((project) =>
          !toggle ? (
            project.isRecruiting && (
              <MobileContentCard
                key={project.id}
                project={project}
                likedProjects={likedProjects}
                onNavigateToProjectDetailEvent={onNavigateToProjectDetailEvent}
              />
            )
          ) : (
            <MobileContentCard
              key={project.id}
              project={project}
              likedProjects={likedProjects}
              onNavigateToProjectDetailEvent={onNavigateToProjectDetailEvent}
            />
          ),
        )}
    </FindProjectMobileListContainer>
  );
};

const FindProjectMobileListContainer = styled.div`
  padding: 0 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.9px;
`;

export default FindProjectMobileList;
