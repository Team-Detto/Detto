import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import Alert from 'components/common/Alert';
import PositionButton from 'components/common/ApplyPositionButton';
import { useModal } from 'hooks';
import { useEffect, useState } from 'react';
import { allowScroll, preventScroll } from 'utils/modal';
import { positionList } from 'utils/positions';
import { useMutation, useQuery } from '@tanstack/react-query';
import { findWithCollectionName, updateApplicants } from 'apis/postDetail';

interface props {
  isOpen: boolean;
  message: string;
  onClickEvent: () => void;
}

const ApplyModal = ({ isOpen, message, onClickEvent }: props) => {
  const { isOpen: isAlertOpen, handleModalStateChange: onAlertClickEvent } =
    useModal(false);
  const [usage, setUsage] = useState('done');
  const [motive, setMotive] = useState('');
  const [clickValue, setClickValue] = useState(-1);

  const { data: userData } = useQuery({
    queryKey: ['userID'], //currentUser.uid로 수정
    queryFn: () => findWithCollectionName('user', 'userID'), //currentUser.uid로 수정
  });

  const { mutate: applicantMutate } = useMutation(() =>
    updateApplicants(
      '6zDpuv1af8LzMlQkmceO', //pid로 수정
      userData?.uid,
      userData?.displayName,
      userData?.photoURL,
      userData?.skills,
      positionList[clickValue].name,
      motive,
      false,
    ),
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
            onClick={() => {
              if (motive === '' || clickValue === -1) {
                setUsage('fail');
                onAlertClickEvent();
                return;
              } else {
                setUsage('done');
                setMotive(''); //지원동기 초기화
                setClickValue(-1); //포지션 초기화
                onClickEvent(); //모달 닫기
                onAlertClickEvent(); //지원성공 모달 띄우기

                applicantMutate(userData?.uid);
                console.log(
                  '포지션:',
                  positionList[clickValue].name,
                  '지원동기:',
                  motive,
                );
                //버튼 변경 이벤트
                //데이터 삽입,삭제 이벤트
              }
            }}
          >
            지원하기
          </MotiveButton>
        </ApplyButtonContainer>
        {/* 지원실패 모달 위에 모달 띄워야해서 */}
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
  width: 657px;
  height: 523px;
  left: 50%;
  top: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  padding: 20px 16px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(117, 117, 117, 0.25);
  z-index: 999;
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
`;

const ModalTitle = styled.p`
  height: 44px;
  font-weight: 700;
  font-size: 28px;
  line-height: 44px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  margin-top: 20px;

  width: 625px;
  height: 337px;
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
  gap: 8px;
`;

const PositionNotification = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: ${COLORS.gray750};
`;

const PositionContentWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
  margin-top: 12px;
  width: 100%;
  height: 40px;
`;

const MotiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;

  width: 625px;
  height: 237px;
  margin-top: 20px;
`;

const MotiveTitle = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
`;

const MotiveContentWrap = styled.div``;

const MotiveTextArea = styled.textarea`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 28px;
  gap: 10px;

  width: 625px;
  height: 197px;
  border: 1px solid #ced3db;
  border-radius: 4px;
`;

const ApplyButtonContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;
  width: 625px;
  height: 60px;
`;

const AlertButton = styled.button`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  padding: 21px 95px;
  gap: 10px;

  width: 625px;
  height: 62px;
  background: #fafafb;
  border-radius: 16px;
`;

const MotiveButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 10px;

  width: 302.5px;
  height: 60px;
  border-radius: 8px;
  /* violet B 400 */

  background-color: ${(props: { children: string }) =>
    props.children === '아니오' ? `${COLORS.gray100}` : `${COLORS.violetB400}`};
  color: ${(props: { children: string }) =>
    props.children === '아니오' ? `${COLORS.black}` : `${COLORS.white}`};
`;
