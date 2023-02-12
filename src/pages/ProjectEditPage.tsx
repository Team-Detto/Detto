import { useModal } from 'hooks';
import ConfirmAlert from 'components/common/ConfirmAlert';
import WebContainer from 'components/common/WebContainer';
import ProjectEditPageHeader from 'components/editpage/ProjectEditPageHeader';
import ProjectEditPageBody from 'components/editpage/ProjectEditPageBody';
import ProjectEditPageFooter from 'components/editpage/ProjectEditPageFooter';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { firebaseGetProjectDataRequest } from 'apis/boardService';

const ProjectEditPage = () => {
  const { isOpen, handleModalStateChange } = useModal(false);

  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    firebaseGetProjectDataRequest(setProjectData);
  }, [setProjectData]);

  return (
    <WebContainer>
      <EditPageWrapper isOpen={isOpen}>
        <ProjectEditPageHeader />
        <ProjectEditPageBody />
        <ProjectEditPageFooter />
        <ConfirmAlert
          isOpen={isOpen}
          message="게시글을 수정하시겠습니까?"
          onClickEvent={handleModalStateChange}
          onCloseEvent={handleModalStateChange}
        />
      </EditPageWrapper>
    </WebContainer>
  );
};

const EditPageWrapper = styled.div`
  height: 133.5625rem;
  position: ${(props: { isOpen: boolean }) =>
    props.isOpen ? 'fixed' : 'static'};
  top: ${(props: { isOpen: boolean }) =>
    props.isOpen ? `-${window.scrollY}px` : '0'};
  overflow-y: ${(props: { isOpen: boolean }) =>
    props.isOpen ? 'scroll' : 'hidden'};
`;

export default ProjectEditPage;
