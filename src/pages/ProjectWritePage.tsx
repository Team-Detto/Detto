import React from 'react';
import { useState } from 'react';
import useModal from 'hooks/useModal';
import ConfirmAlert from 'components/common/ConfirmAlert';
import WebContainer from 'components/common/WebContainer';
import ProjectWritePageBody from 'components/writepage/ProjectWritePageBody';
import ProjectWritePageFooter from 'components/writepage/ProjectWritePageFooter';
import ProjectWritePageHeader from 'components/writepage/ProjectWritePageHeader';
import styled from '@emotion/styled';

export interface WriteFormValueType {
  [key: string]: string | number | string[];
}

const ProjectWritePage = () => {
  const { isOpen, handleOpenButtonClick, handleCloseButtonClick } =
    useModal(false);

  const [writeFormValue, setWriteFormValue] = useState({
    title: '',
    content: '',
    plannerPosition: 0,
    developerPosition: 0,
    designerPosition: 0,
    plannerStack: [''],
    developerStack: [''],
    designerStack: [''],
    startDate: '',
    endDate: '',
    deadline: '',
  });

  const handleFormValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWriteFormValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <WebContainer>
      <ProjectWritePageWrapper isOpen={isOpen}>
        <ProjectWritePageHeader
          writeFormValue={writeFormValue}
          onFormValueChangeEvent={handleFormValueChange}
        />
        <ProjectWritePageBody
          writeFormValue={writeFormValue}
          onFormValueChagneEvent={handleFormValueChange}
        />
        <ProjectWritePageFooter
          onOpenButtonClickEvent={handleOpenButtonClick}
        />
        <ConfirmAlert
          isOpen={isOpen}
          onClickEvent={handleCloseButtonClick}
          message="게시글을 작성하시겠습니까?"
        />
      </ProjectWritePageWrapper>
    </WebContainer>
  );
};

const ProjectWritePageWrapper = styled.div`
  height: 133.5625rem;
  position: ${(props: { isOpen: boolean }) =>
    props.isOpen ? 'fixed' : 'static'};
  top: ${(props: { isOpen: boolean }) =>
    props.isOpen ? `-${window.scrollY}px` : '0'};
  overflow-y: ${(props: { isOpen: boolean }) =>
    props.isOpen ? 'scroll' : 'hidden'};
`;

export default ProjectWritePage;
