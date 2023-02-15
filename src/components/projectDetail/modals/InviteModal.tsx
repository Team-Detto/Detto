import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import Alert from 'components/common/Alert';
import { useModal } from 'hooks';
import { useEffect, useState } from 'react';
import { allowScroll, preventScroll } from 'utils/modal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { findWithCollectionName, updateParticipants } from 'apis/postDetail';
import { useParams } from 'react-router-dom';
interface props {
  isOpen: boolean;
  applicantData: any;
  onClickEvent: () => void;
}

const InviteModal = ({ isOpen, applicantData, onClickEvent }: props) => {
  const { isOpen: isAlertOpen, handleModalStateChange: onAlertClickEvent } =
    useModal(false);

  const [key, setKey] = useState('');

  const { data: postData } = useQuery({
    queryKey: ['6zDpuv1af8LzMlQkmceO'], //currentUser.uid로 수정
    queryFn: () => findWithCollectionName('post', '6zDpuv1af8LzMlQkmceO'), //currentUser.uid로 수정
  });
  const applicants = postData?.applicants;
  const uidArray = Object.keys(applicants).map((keys: any, idx: number) => {
    // if (keys === 'userID') {
    //   setKey(keys);
    // }
  });
  // console.log(key);

  const { mutate: applicantMutate } = useMutation(() =>
    updateParticipants(
      '6zDpuv1af8LzMlQkmceO', //pid로 수정
      'userID', //currentUser.uid로 수정
      true,
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
      <Alert
        isOpen={isAlertOpen}
        onClickEvent={onAlertClickEvent}
        mainMsg="팀원을 초대했어요!"
        subMsg="현재 참여한 인원에서 확인할 수 있어요!"
        usage="done"
        page="apply"
      />
      <ModalContainer isOpen={isOpen}>
        <ModalWrapper>
          <UserProfileImage src={applicantData?.profileURL} />
          <UserSkillsContainer>
            {applicantData?.skills.map((skill: string) => {
              return <Skills key={skill}>{skill}</Skills>;
            })}
            을/를 경험해 본 팀원이네요!
          </UserSkillsContainer>

          <InviteTitle>{applicantData?.displayName} 님을</InviteTitle>
          <InviteTitle>팀원으로 초대할까요?</InviteTitle>

          <MotiveContainer>
            <MotiveTitle>지원 동기</MotiveTitle>
            <MotiveContentWrap>
              <MotiveText>{applicantData?.motive}</MotiveText>
            </MotiveContentWrap>
            <MotiveButtonContainer>
              <MotiveButton onClick={onClickEvent}>아니오</MotiveButton>
              <MotiveButton
                onClick={() => {
                  onClickEvent();
                  onAlertClickEvent();
                  applicantMutate();
                  //데이터 추가
                  //데이터 삭제
                }}
              >
                네, 초대할게요!
              </MotiveButton>
            </MotiveButtonContainer>
          </MotiveContainer>
        </ModalWrapper>
      </ModalContainer>
    </>
  );
};

export default InviteModal;

const ModalContainer = styled.div`
  position: fixed;
  width: 705px;
  height: 652px;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
  padding: 44px 40px 24px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(117, 117, 117, 0.25);
  z-index: 999;
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  width: 625px;
  height: 492px;
`;

const UserProfileImage = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background-color: ${COLORS.gray100};
`;

const UserSkillsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 600;
  font-size: 20px;
  color: #6b7684;
  margin-top: 32px;
  margin-bottom: 11px;
  gap: 3px;
`;

const Skills = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 12px;
  gap: 10px;
  /* width: 56px; */
  height: 32px;
  width: fit-content;
  font-size: 12px;
  overflow: hidden;
  background: ${COLORS.gray100};
  border-radius: 32px;
`;

const InviteTitle = styled.div`
  font-weight: 600;
  font-size: 24px;

  color: #191f28;
`;

const MotiveContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 625px;
  height: 237px;
  margin-top: 20px;
`;

const MotiveTitle = styled.p`
  font-weight: 500;
  font-size: 20px;
`;

const MotiveContentWrap = styled.div`
  margin-top: 12px;
`;

const MotiveText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 28px;

  width: 625px;
  height: 197px;
  border: 1px solid #ced3db;
  border-radius: 4px;
`;

const MotiveButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;
  margin-top: 32px;
  width: 625px;
  height: 60px;
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
