import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import MobileConfirmAlert from 'components/common/mobile/MobileConfirmAlert';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from 'apis/postDetail';
import { useModal } from 'hooks';
import { Link } from 'react-router-dom';
import {
  amplitudeToNoneButtonClick,
  amplitudeNeedToButtonClick,
} from 'utils/amplitude';
import { DocumentData } from 'firebase/firestore';

interface ModifyDeleteDropDownProps {
  pid: string;
  popup: boolean;
  setPopup: (popup: boolean) => void;
  projectData: DocumentData;
}

const ModifyDeleteDropDown = ({
  pid,
  popup,
  setPopup,
  projectData,
}: ModifyDeleteDropDownProps) => {
  const { isOpen, handleModalStateChange } = useModal(false);
  const queryClient = useQueryClient();
  const { mutate: deleteProjectMutate } = useMutation(
    () => deleteProject(pid),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post', 'projectIdList']);
      },
    },
  );
  return (
    <>
      <MobileConfirmAlert
        isOpen={isOpen}
        message="정말 삭제할까요?"
        subMessage="게시글은 바로 사라집니다!"
        onClickEvent={() => {
          deleteProjectMutate();
          window.history.back();
          amplitudeToNoneButtonClick('delete_project_yes');
        }}
        onCloseEvent={() => {
          handleModalStateChange();
          amplitudeToNoneButtonClick('delete_project_no');
        }}
      />
      {popup && (
        <Backdrop
          onClick={() => {
            setPopup(false);
          }}
        >
          <DropdownBox>
            <DropdownList>
              <Link to={`/project/write/${pid}`} state={projectData}>
                <DropdownItem
                  onClick={() =>
                    amplitudeNeedToButtonClick('project_edit', 'edit')
                  }
                >
                  수정하기
                </DropdownItem>
              </Link>

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
  padding: 1.25rem 0;
  box-shadow: 0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
  z-index: 99;
`;

const DropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const DropdownItem = styled.li`
  height: 2.5rem;
  padding: 0.625rem;
  line-height: 1.25rem;
  font-size: 0.875rem;
  text-align: center;
  font-weight: 500;
  color: ${COLORS.gray850};

  &:hover {
    color: ${COLORS.violetB500};
  }
`;
