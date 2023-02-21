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
  height: 16px;
  padding: 0 20px;
  gap: 12px;
  font-size: 12px;
  color: ${COLORS.gray800};
`;
