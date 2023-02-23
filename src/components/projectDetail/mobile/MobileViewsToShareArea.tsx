import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import Views from '../Views';
import Likes from '../Likes';
import Share from '../Share';
import React, { useState } from 'react';

const ViewsToShare = ({ pid, projectData }: any) => {
  const { view, like, title, content } = projectData;

  return (
    <>
      <ViewsToShareContainer>
        <Views pid={pid} view={view} />
        <Likes pid={pid} like={like} version="mobile" />
        <Share title={title} content={content} />
      </ViewsToShareContainer>
    </>
  );
};

export default ViewsToShare;

const ViewsToShareContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 1rem;
  padding: 0 1.25rem;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: ${COLORS.gray800};
`;
