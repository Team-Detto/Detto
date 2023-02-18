import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useCallback } from 'react';

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
}: props) => {
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
    if (motive.length > 500) {
      handleToastPopup('지원동기는 500자 이하로 입력해주세요.');
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
    onAlertClickEvent(); //지원성공 모달 띄우기
    applicantMutate(userData?.uid); //지원자 데이터 삽입
    projectMutate(); //지원한 프로젝트 데이터 삽입
  };

  return (
    <ApplyButtonContainer>
      <MotiveButton //지원 취소
        onClick={handleResetButtonClick}
      >
        아니오
      </MotiveButton>

      <MotiveButton
        onClick={(e) => {
          handleApplyButtonClick(e);
        }}
      >
        지원하기
      </MotiveButton>
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

const MotiveButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.625rem;
  gap: 0.625rem;

  width: 18.9063rem;
  height: 3.75rem;
  border-radius: 0.5rem;
  /* violet B 400 */

  background-color: ${(props: { children: string }) =>
    props.children === '아니오' ? `${COLORS.gray100}` : `${COLORS.violetB400}`};
  color: ${(props: { children: string }) =>
    props.children === '아니오' ? `${COLORS.black}` : `${COLORS.white}`};
`;
