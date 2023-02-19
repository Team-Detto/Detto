import ContentCard from 'components/ContentCard';
import styled from '@emotion/styled';
import { EditType } from 'types/write/writeType';

interface Props {
  projects: EditType.EditFormType[];
  toggle: boolean;
  category: string;
  likedProjects: string[];
  onNavigateToProjectDetailEvent: (path: string) => () => void;
}

const FindProjectList = ({
  projects,
  toggle,
  category,
  likedProjects,
  onNavigateToProjectDetailEvent,
}: Props) => {
  return (
    <FindProjectListContainer>
      {projects
        .filter((project: any) => project.positions[category] !== 0)
        .map((project) =>
          toggle ? (
            project.isRecruiting && (
              <ContentCard
                key={project.id}
                project={project}
                likedProjects={likedProjects}
                onNavigateToProjectDetailEvent={onNavigateToProjectDetailEvent}
              />
            )
          ) : (
            <ContentCard
              key={project.id}
              project={project}
              likedProjects={likedProjects}
              onNavigateToProjectDetailEvent={onNavigateToProjectDetailEvent}
            />
          ),
        )}
    </FindProjectListContainer>
  );
};

const FindProjectListContainer = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  justify-items: center;
`;

export default FindProjectList;
