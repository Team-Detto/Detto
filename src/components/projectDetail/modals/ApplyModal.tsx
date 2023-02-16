import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import Alert from 'components/common/Alert';
import PositionButton from 'components/common/ApplyPositionButton';
import { useAuth, useModal } from 'hooks';
import React, { useEffect, useState } from 'react';
import { allowScroll, preventScroll } from 'utils/modal';
import { positionList } from 'utils/positions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateApplicants, updateAppliedProject } from 'apis/postDetail';
import { findWithCollectionName } from 'apis/findWithCollectionName';

interface props {
  isOpen: boolean;
  message: string;
  onClickEvent: () => void;
  pid: string;
}

const ApplyModal = ({ isOpen, message, onClickEvent, pid }: props) => {
  const { isOpen: isAlertOpen, handleModalStateChange: onAlertClickEvent } =
    useModal(false);
  const [usage, setUsage] = useState('done');
  const [motive, setMotive] = useState('');
  const [clickValue, setClickValue] = useState(-1);
  const { uid } = useAuth();
  const queryClient = useQueryClient();

  const { data: userData } = useQuery({
    queryKey: ['users', uid],
    queryFn: () => findWithCollectionName('users', uid),
  });
  //userData 구조 분해 할당

  const ApplyFunction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (motive === '' || clickValue === -1) {
      //지원 실패
      setUsage('fail');
      onAlertClickEvent();
      return;
    } else {
      //지원 성공
      setUsage('done');
      setMotive(''); //지원동기 초기화
      setClickValue(-1); //포지션 초기화
      onClickEvent(); //모달 닫기
      onAlertClickEvent(); //지원성공 모달 띄우기
      applicantMutate(userData?.uid); //지원자 데이터 삽입
      projectMutate(); //지원한 프로젝트 데이터 삽입
    }
  };

  let skills: string[] = [];
  switch (clickValue) {
    case 0: //기획
      skills = userData?.plannerStack;
      break;
    case 1: //디자인
      skills = userData?.designerStack;
      break;
    case 2: //프론트엔드
      skills = userData?.developerStack;
      break;
    case 3: //백엔드
      skills = userData?.developerStack;
      break;

    default:
      skills = [];
      break;
  }

  const { mutate: applicantMutate } = useMutation(() =>
    updateApplicants(
      pid, //pid로 수정
      uid,
      userData?.displayName,
      userData?.photoURL,
      skills,
      positionList[clickValue].name,
      motive,
      false,
    ),
  );

  //지원하기 클릭 시 appliedProject에 추가
  const { mutate: projectMutate } = useMutation(
    () =>
      updateAppliedProject(
        uid, //현재 유저의 uid
        pid, //현재 프로젝트의 pid
        false, //초대 여부
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post', pid]);
      },
    },
  );

  useEffect(() => {
    if (isOpen) {
      const prevScrollY = preventScroll();
      return () => {
        allowScroll(prevScrollY);
      };
    }
  }, [isOpen]);

  return (
    <>
      <ModalContainer isOpen={isOpen}>
        <ModalTitle>{message}</ModalTitle>
        <ContentContainer>
          <PositionContainer>
            <PositionTitle>
              포지션
              <PositionNotification>
                (중복 선택이 불가능 해요)
              </PositionNotification>
            </PositionTitle>
            <PositionContentWrap>
              <PositionButton
                clickValue={clickValue}
                setClickValue={setClickValue}
              />
            </PositionContentWrap>
          </PositionContainer>
          <MotiveContainer>
            <MotiveTitle>지원동기</MotiveTitle>
            <MotiveContentWrap>
              <MotiveTextArea
                placeholder="지원동기를 입력해주세요"
                onChange={(e: any) => setMotive(e.target.value)}
                value={motive}
              />
            </MotiveContentWrap>
          </MotiveContainer>
        </ContentContainer>
        <ApplyButtonContainer>
          <MotiveButton
            onClick={() => {
              setMotive(''); //지원동기 초기화
              setClickValue(-1); //포지션 초기화
              onClickEvent(); //모달 닫기
            }}
          >
            아니오
          </MotiveButton>

          <MotiveButton
            onClick={(e) => {
              ApplyFunction(e);
            }}
          >
            지원하기
          </MotiveButton>
        </ApplyButtonContainer>
        {/* 지원실패 : 모달 위에 모달 띄워야해서 Container 내부에 있어야함 */}
        <Alert
          isOpen={isAlertOpen}
          onClickEvent={onAlertClickEvent}
          mainMsg="지원에 실패했어요!!"
          subMsg="입력을 확인해주세요!"
          usage={usage}
          page="apply"
        />
      </ModalContainer>
      {/* 지원성공 */}
      <Alert
        isOpen={isAlertOpen}
        onClickEvent={onAlertClickEvent}
        mainMsg="지원이 완료되었어요!"
        subMsg="알림으로 결과를 알려드릴게요!"
        usage={usage}
        page="apply"
      />
    </>
  );
};

export default ApplyModal;

const ModalContainer = styled.div`
  position: fixed;
  width: 41.0625rem;
  height: 32.6875rem;
  left: 50%;
  top: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  padding: 1.25rem 1rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0rem 0.25rem 0.625rem rgba(117, 117, 117, 0.25);
  z-index: 999;
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
`;

const ModalTitle = styled.p`
  height: 2.75rem;
  font-weight: 700;
  font-size: 1.75rem;
  line-height: 2.75rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  margin-top: 1.25rem;

  width: 39.0625rem;
  height: 21.0625rem;
`;

const PositionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3.5rem;
  margin-bottom: 1.5rem;
`;

const PositionTitle = styled.p`
  display: flex;

  width: 100%;
  text-align: start;
  height: 1.5rem;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
  gap: 0.5rem;
`;

const PositionNotification = styled.span`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.75rem;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: ${COLORS.gray750};
`;

const PositionContentWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0rem;
  gap: 0.75rem;
  margin-top: 0.75rem;
  width: 100%;
  height: 2.5rem;
`;

const MotiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  gap: 0.75rem;

  width: 39.0625rem;
  height: 14.8125rem;
  margin-top: 1.25rem;
`;

const MotiveTitle = styled.p`
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

const MotiveContentWrap = styled.div``;

const MotiveTextArea = styled.textarea`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0.625rem 1.75rem;
  gap: 0.625rem;

  width: 39.0625rem;
  height: 12.3125rem;
  border: 0.0625rem solid #ced3db;
  border-radius: 0.25rem;
`;

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

const AlertButton = styled.button`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  padding: 1.3125rem 5.9375rem;
  gap: 0.625rem;

  width: 39.0625rem;
  height: 3.875rem;
  background: #fafafb;
  border-radius: 1rem;
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
