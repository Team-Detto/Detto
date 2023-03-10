import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import Views from '../Views';
import Likes from '../Likes';
import Share from '../Share';
import { DocumentData } from 'firebase/firestore';

interface ViewsToShareProps {
  pid: string;
  projectData: DocumentData;
}

const ViewsToShare = ({ pid, projectData }: ViewsToShareProps) => {
  const { view, title, content, thumbnail } = projectData;

  return (
    <ViewsToShareContainer>
      <Views pid={pid} view={view} />
      <Likes pid={pid} version="mobile" />
      <Share title={title} content={content} thumbnail={thumbnail} />
    </ViewsToShareContainer>
  );
};

export default ViewsToShare;

const ViewsToShareContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1.25rem;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: ${COLORS.gray800};
`;
