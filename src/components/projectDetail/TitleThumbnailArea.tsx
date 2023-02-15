import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useMutation } from '@tanstack/react-query';
import { deleteProject } from 'apis/postDetail';
import ConfirmAlert from 'components/common/ConfirmAlert';
import { useModal } from 'hooks';
import { useNavigate } from 'react-router-dom';

const TitleThumbnailArea = (props: any) => {
  const navigate = useNavigate();
  const { projectData, pid } = props;
  const { thumbnail, title, isRecruiting } = projectData;
  console.log('projectData :', projectData);
  const { isOpen, handleModalStateChange } = useModal(false);
  //글 삭제하기
  const { mutate: deleteProjectMutate } = useMutation(() => deleteProject(pid));

  const handleDeleteProject = () => {
    //삭제하기 버튼 클릭시
    //1. 프로젝트 삭제
    deleteProjectMutate(pid);
    //2. 프로젝트에 참여중인 멤버들의 참여중인 프로젝트 목록에서 삭제
    //3. 프로젝트에 지원한 멤버들의 지원한 프로젝트 목록에서 삭제
    // => 모든 user데이터 조회???
  };

  return (
    <>
      <ConfirmAlert
        isOpen={isOpen}
        message="정말 삭제할까요?"
        subMessage="게시글은 바로 사라집니다!"
        onClickEvent={() => {
          handleDeleteProject();
          navigate('/');
        }}
        onCloseEvent={handleModalStateChange}
      />
      <TitleToModifyButtonWrap>
        <ProjectTitleWrapper>
          {isRecruiting ? (
            <RecruitingDiv>모집중</RecruitingDiv>
          ) : (
            <RecruitedDiv>모집완료</RecruitedDiv>
          )}
          <ProjectTitle>{title}</ProjectTitle>
        </ProjectTitleWrapper>
        {/* currentUser가 글쓴이인지 비교 true이면 수정하기 버튼 보여주기  */}
        <ModifyDeleteButtonWrap>
          <ModifyDeleteButton onClick={handleModalStateChange}>
            글 삭제하기
          </ModifyDeleteButton>
          <Link to={`/project/write/${pid}`} state={projectData}>
            <ModifyDeleteButton>수정하기</ModifyDeleteButton>
          </Link>
        </ModifyDeleteButtonWrap>
      </TitleToModifyButtonWrap>
      <ProjectThumbnail src={thumbnail} />
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
  background-color: ${COLORS.violetB400};
  color: ${COLORS.white};
  padding: 0.625rem 1.875rem;
  border-radius: 2.5rem;
  font-size: 1.5rem;
`;

const RecruitedDiv = styled.div`
  background-color: ${COLORS.gray100};
  color: ${COLORS.gray400};
  padding: 0.625rem 1.875rem;
  border-radius: 2.5rem;
  font-size: 1.5rem;
`;

const ProjectTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
`;

const ModifyDeleteButtonWrap = styled.div`
  display: flex;
  gap: 1.25rem;
`;

const ModifyDeleteButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 10px;
  background: ${COLORS.gray100};
  color: ${COLORS.gray400};
  border-radius: 4px;
  min-width: 91px;
  height: 48px;
`;

const ProjectThumbnail = styled.img`
  width: 73.75rem;
  height: 36.5rem;
  margin-top: 1rem;
  background-color: #dadada; //영역 표시용 임시 색상
`;
