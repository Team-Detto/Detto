import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import ConfirmAlert from 'components/common/ConfirmAlert';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject, updateRecruiting } from 'apis/postDetail';
import { useAuth, useModal } from 'hooks';
import { useEffect } from 'react';
import defaultThumbnail from 'assets/images/thumbnail_big.jpg';
import {
  amplitudeToNoneButtonClick,
  amplitudeNeedToButtonClick,
} from 'utils/amplitude';

const TitleThumbnailArea = ({ projectData, pid }: any) => {
  const { thumbnail, title, isRecruiting, deadline } = projectData;
  const today = new Date().getTime();

  const { isOpen, handleModalStateChange } = useModal(false);
  const queryClient = useQueryClient();
  //글 삭제하기 useMutation
  const { mutate: deleteProjectMutate } = useMutation(
    () => deleteProject(pid),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post', 'projectIdList']);
      },
    },
  );

  const { uid } = useAuth();
  const handleDeleteProject = () => {
    deleteProjectMutate(pid); //post 컬렉션에서 프로젝트 삭제
    amplitudeToNoneButtonClick('delete_project');
  };

  const { mutate: updateRecruitingMutate } = useMutation(() =>
    updateRecruiting(pid as string, false),
  );
  useEffect(() => {
    if (today > deadline) {
      updateRecruitingMutate(pid, false as any);
    }
  }, []);

  return (
    <>
      <ConfirmAlert
        isOpen={isOpen}
        message="정말 삭제할까요?"
        subMessage="게시글은 바로 사라집니다!"
        onClickEvent={() => {
          handleDeleteProject();
          window.history.back();
        }}
        onCloseEvent={() => {
          handleModalStateChange();
          amplitudeToNoneButtonClick('delete_project_cancel');
        }}
      />
      <TitleToModifyButtonWrap>
        <ProjectTitleWrapper>
          <RecruitingDiv>{isRecruiting ? `모집중` : `모집완료`}</RecruitingDiv>

          <ProjectTitle>{title}</ProjectTitle>
        </ProjectTitleWrapper>

        {uid === projectData.uid && (
          <ModifyDeleteButtonWrap>
            <ModifyDeleteButton onClick={handleModalStateChange}>
              글 삭제하기
            </ModifyDeleteButton>
            <Link to={`/project/write/${pid}`} state={projectData}>
              <ModifyDeleteButton
                onClick={() =>
                  amplitudeNeedToButtonClick('edit', 'project_edit')
                }
              >
                수정하기
              </ModifyDeleteButton>
            </Link>
          </ModifyDeleteButtonWrap>
        )}
      </TitleToModifyButtonWrap>
      <ProjectThumbnail src={thumbnail || defaultThumbnail} />
    </>
  );
};

export default TitleThumbnailArea;

const TitleToModifyButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16.125rem;
`;

const ProjectTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const RecruitingDiv = styled.div`
  background-color: ${({ children }) =>
    children === '모집중' ? COLORS.violetB400 : COLORS.gray100};
  color: ${({ children }) =>
    children === '모집중' ? COLORS.white : COLORS.gray600};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;

  width: ${({ children }) => (children === '모집중' ? '6rem' : '7.125rem')};
  height: 2.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  border-radius: 1rem;
`;

const ProjectTitle = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
  color: ${COLORS.gray900};
`;

const ModifyDeleteButtonWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const ModifyDeleteButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  gap: 0.625rem;
  background: ${COLORS.gray100};
  color: ${COLORS.gray400};
  border-radius: 0.25rem;
  min-width: 5.6875rem;
  height: 1.75rem;
  font-weight: 500;
  font-size: 0.875rem;
`;

const ProjectThumbnail = styled.img`
  width: 73.75rem;
  height: 36.5rem;
  margin-top: 1rem;
  background-color: #dadada; //영역 표시용 임시 색상
  object-fit: cover;
`;
