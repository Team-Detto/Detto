import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { deleteProject } from 'apis/postDetail';
import COLORS from 'assets/styles/colors';
import MobileConfirmAlert from 'components/common/mobile/MobileConfirmAlert';
import { useModal } from 'hooks';
import { useNavigate, Link } from 'react-router-dom';

const ModifyDeleteDropDown = ({ pid, popup, setPopup, projectData }: any) => {
  const { isOpen, handleModalStateChange } = useModal(false);
  const navigate = useNavigate();
  const { mutate: deleteProjectMutate } = useMutation(() => deleteProject(pid));
  return (
    <>
      <MobileConfirmAlert
        isOpen={isOpen}
        message="정말 삭제할까요?"
        subMessage="게시글은 바로 사라집니다!"
        onClickEvent={() => {
          deleteProjectMutate(pid);
          window.history.back();
        }}
        onCloseEvent={handleModalStateChange}
      />
      {popup && (
        <Backdrop
          onClick={() => {
            setPopup(false);
          }}
        >
          <DropdownBox>
            <DropdownList>
              <DropdownItem>
                <Link to={`/project/write/${pid}`} state={projectData}>
                  수정하기
                </Link>
              </DropdownItem>

              <DropdownItem onClick={handleModalStateChange}>
                삭제하기
              </DropdownItem>
            </DropdownList>
          </DropdownBox>
        </Backdrop>
      )}
    </>
  );
};

export default ModifyDeleteDropDown;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const DropdownBox = styled.div`
  position: absolute;
  top: 7rem;
  right: 1.5rem;
  width: 7.75rem;
  min-height: 7.75rem;
  background-color: ${COLORS.white};
  padding: 20px 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 99;
`;

const DropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const DropdownItem = styled.li`
  height: 2.5rem;
  padding: 10px;
  line-height: 1.25rem;
  font-size: 0.875rem;
  text-align: center;
  font-weight: 500;
  color: ${COLORS.gray850};

  &:hover {
    color: ${COLORS.violetB500};
  }
`;
