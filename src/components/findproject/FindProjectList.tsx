import ContantCard from 'components/ContentCard';
import styled from '@emotion/styled';
import { EditType } from 'types/write/writeType';

interface Props {
  projects: EditType.EditFormType[];
  toggle: boolean;
  onNavigateToProjectDetailEvent: (path: string) => () => void;
}

const FindProjectList = ({
  projects,
  toggle,
  onNavigateToProjectDetailEvent,
}: Props) => {
  return (
    <FindProjectListContainer>
      {projects.map((project) =>
        toggle ? (
          project.isRecruiting && (
            <ContantCard
              key={project.id}
              project={project}
              onNavigateToProjectDetailEvent={onNavigateToProjectDetailEvent}
            />
          )
        ) : (
          <ContantCard
            key={project.id}
            project={project}
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
