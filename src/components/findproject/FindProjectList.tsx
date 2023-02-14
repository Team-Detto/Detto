import React from 'react';
import ContantCard from 'components/ContentCard';
import styled from '@emotion/styled';

interface Props {
  projects: any;
}

const FindProjectList = ({ projects }: Props) => {
  return (
    <FindProjectListContainer>
      {projects.map((project: any) => (
        <ContantCard key={project.id} />
      ))}
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
