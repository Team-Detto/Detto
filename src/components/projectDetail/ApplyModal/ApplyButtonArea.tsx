import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { findWithCollectionName } from 'apis/findWithCollectionName';
import COLORS from 'assets/styles/colors';
import { useIsMobile, useNotification } from 'hooks';
import { useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { amplitudeToNoneButtonClick } from 'utils/amplitude';

interface props {
  userData: any;
  motive: string;
  setMotive: (motive: string) => void;
  clickValue: number;
  setClickValue: (clickValue: number) => void;
  onClickEvent: () => void;
  onAlertClickEvent: () => void;
  applicantMutate: any;
  projectMutate: any;
  handleToastPopup: (message: string) => void;
  pid: string;
}

const ApplyButtonArea = ({
  motive,
  setMotive,
  clickValue,
  setClickValue,
  onClickEvent,
  onAlertClickEvent,
  applicantMutate,
  userData,
  projectMutate,
  handleToastPopup,
  pid,
}: props) => {
  const { sendNotification } = useNotification();

  const { data: projectData } = useQuery({
    queryKey: ['post', pid],
    queryFn: () => findWithCollectionName('post', pid),
  });

  // 글쓴이에게 지원 알림 보내기
  const sendApplyNotificationToWriter = () => {
    if (!userData || !projectData) return;
    sendNotification({
      title: `${userData.displayName}님이 프로젝트에 지원하였습니다.`,
      receiverUid: projectData.uid,
      link: {
        type: 'project',
        id: pid,
      },
    });
  };

  // 지원하기 유효성 검사
  const checkNoteValidation = useCallback(() => {
    if (clickValue === -1) {
      handleToastPopup('포지션을 선택해주세요.');
      return false;
    }
    if (motive === '') {
      handleToastPopup('지원동기를 입력해주세요.');
      return false;
    }
    if (motive.length < 10 || motive.length > 500) {
      handleToastPopup('지원동기는 10자 이상 500자 이하로 입력해주세요.');
      return false;
    }
    return true;
  }, [motive, clickValue]);

  const handleResetButtonClick = () => {
    setMotive(''); //지원동기 초기화
    setClickValue(-1); //포지션 초기화
    onClickEvent(); //모달 닫기
  };

  const handleApplyButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!checkNoteValidation()) return;

    //지원 성공
    handleResetButtonClick();
    onClickEvent();
    onAlertClickEvent(); //지원성공 모달 띄우기
    applicantMutate(userData?.uid); //지원자 데이터 삽입
    projectMutate(); //지원한 프로젝트 데이터 삽입
    sendApplyNotificationToWriter(); //글쓴이에게 지원 알림 보내기
  };

  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <MobileApplyButtonContainer>
        <MobileApplyButton
          onClick={(e) => {
            handleApplyButtonClick(e);
            amplitudeToNoneButtonClick('apply');
          }}
        >
          지원하기
        </MobileApplyButton>
      </MobileApplyButtonContainer>
    );
  }

  return (
    <ApplyButtonContainer>
      <CloseButton onClick={handleResetButtonClick} />
      <ApplyButton
        onClick={(e) => {
          handleApplyButtonClick(e);
          amplitudeToNoneButtonClick('apply');
        }}
      >
        지원하기
      </ApplyButton>
    </ApplyButtonContainer>
  );
};

export default ApplyButtonArea;

const ApplyButtonContainer = styled.div`
  width: 100%;
  margin-top: 1.25rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0rem;
  gap: 1.25rem;
  width: 39.0625rem;
  height: 3.75rem;
`;

const ApplyButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.625rem;
  gap: 0.625rem;

  width: 100%;
  height: 3.75rem;
  border-radius: 0.5rem;
  /* violet B 400 */

  background-color: ${COLORS.violetB400};
  color: ${COLORS.white};
`;

const MobileApplyButtonContainer = styled.div`
  width: 100%;
  margin-top: 0.875rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0rem;
  gap: 1rem;
  width: 100%;
  height: 3.25rem;
`;

const MobileApplyButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.625rem;
  gap: 0.625rem;

  width: 18.9063rem;
  height: 3.25rem;
  border-radius: 0.5rem;
  /* violet B 400 */

  background-color: ${COLORS.violetB400};
  color: ${COLORS.white};
`;

const CloseButton = styled(AiOutlineClose)`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  width: 1.25rem;
  height: 1.25rem;
  color: ${COLORS.gray400};
  cursor: pointer;
`;
