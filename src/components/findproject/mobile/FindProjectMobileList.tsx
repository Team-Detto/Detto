import MobileContentCard from 'components/MobileContentCard';
import { EditType } from 'types/write/writeType';
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

const FindProjectMobileListContainer = styled.div``;

export default FindProjectMobileList;
