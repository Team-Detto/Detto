import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { modalTypes } from 'components/common/modal/modalTypes';
import { DocumentData } from 'firebase/firestore';
import { useAuth, useGlobalModal } from 'hooks';
import { HiMail } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { logEvent } from 'utils/amplitude';
import { getDate } from 'utils/date';
import { positionList } from 'utils/positions';

interface WriterToProjectInfoContainerProps {
  projectData: DocumentData;
  userData: DocumentData;
}

const WriterToProjectInfoArea = ({
  projectData,
  userData,
}: WriterToProjectInfoContainerProps) => {
  const {
    uid: receiverUid,
    positions,
    plannerStack,
    developerStack,
    designerStack,
    startDate,
    endDate,
    deadline,
  } = projectData;

  const navigate = useNavigate();
  const { uid: SenderUid } = useAuth(); //보내는 사람 id
  const { openModalWithData, openModal } = useGlobalModal();

  const handleSendNoteButtonClick = () => {
    openModalWithData(modalTypes.sendNote, {
      id: 'id', //addDoc이라 id 필요없음
      senderUid: SenderUid,
      receiverUid: receiverUid,
      date: 0,
      title: '',
      content: '',
      isRead: false,
    });
  };
  return (
    <WriterToProjectInfoContainer>
      <WriterContainer>
        <WriterWrapper
          onClick={() => {
            navigate(`/profile/${receiverUid}`);
            logEvent('Button Click', {
              from: `project_detail`, //pathname으로 하면 이동한페이지로 인식해서 수정
              to: 'profile',
              name: 'profile',
            });
          }}
        >
          <WriterProfileImg
            src={userData?.photoURL}
            alt={userData?.displayName}
            referrerPolicy="no-referrer"
          />
          <WriterNickname>{userData?.displayName}</WriterNickname>
        </WriterWrapper>
        {receiverUid !== SenderUid && (
          <SendNoteButton
            onClick={() => {
              if (!SenderUid) {
                openModal('login', 0);
                return;
              }
              handleSendNoteButtonClick();
            }}
          >
            <NoteIcon className="note" />
          </SendNoteButton>
        )}
      </WriterContainer>
      <ProjectInfoWrapper>
        <ProjectInfoObject>
          <ProjectInfoKey>모집 인원</ProjectInfoKey>
          <ProjectInfoValue>
            {Object.keys(positions).map((key: string, idx: number) => {
              if (positions[positionList[idx].type] !== 0) {
                return (
                  <Position key={key}>
                    {positionList[idx].name}
                    <Emphasis>{positions[positionList[idx].type]}</Emphasis>명
                  </Position>
                );
              }
            })}
          </ProjectInfoValue>
        </ProjectInfoObject>
        <ProjectInfoObject>
          <Div>
            <ProjectInfoKey>필요 스택</ProjectInfoKey>
          </Div>
          <ProjectInfoStackWrap>
            {plannerStack.length === 0 ? null : (
              <StackDiv>
                <StackTitle>기획</StackTitle>
                <StackList>
                  {plannerStack?.map((skill: string) => {
                    return <StackValue key={skill}>{skill}</StackValue>;
                  })}
                </StackList>
              </StackDiv>
            )}
            {designerStack.length === 0 ? null : (
              <StackDiv>
                <StackTitle>디자인</StackTitle>
                <StackList>
                  {designerStack?.map((skill: string) => {
                    return <StackValue key={skill}>{skill}</StackValue>;
                  }) ?? '없음'}
                </StackList>
              </StackDiv>
            )}
            {developerStack.length === 0 ? null : (
              <StackDiv>
                <StackTitle>개발</StackTitle>
                <StackList>
                  {developerStack?.map((skill: string) => {
                    return <StackValue key={skill}>{skill}</StackValue>;
                  }) ?? '없음'}
                </StackList>
              </StackDiv>
            )}
          </ProjectInfoStackWrap>
        </ProjectInfoObject>
        <ProjectInfoObject>
          <ProjectInfoKey>예상 기간</ProjectInfoKey>
          <ProjectInfoValue>
            {getDate(startDate)} - {getDate(endDate)}
          </ProjectInfoValue>
        </ProjectInfoObject>
        <ProjectInfoObject>
          <ProjectInfoKey>모집 마감일</ProjectInfoKey>
          <ProjectInfoValue>{getDate(deadline)}</ProjectInfoValue>
        </ProjectInfoObject>
      </ProjectInfoWrapper>
    </WriterToProjectInfoContainer>
  );
};

export default WriterToProjectInfoArea;

const WriterToProjectInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 10rem;
  height: 100%;
  background-color: ${COLORS.white};
  gap: 0.9375rem;
  margin: 1.25rem auto 2.5rem;
`;

const WriterContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 1.25rem 0 1.25rem;
`;

const WriterWrapper = styled.div`
  display: flex;

  height: 2rem;
  align-items: center;
`;

const WriterProfileImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
`;

const WriterNickname = styled.div`
  height: 2rem;
  font-size: 0.6875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin-left: 0.375rem;
`;

const ProjectInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.9375rem 1.125rem 0.9375rem;
  height: 100%;
  gap: 0.5rem;
`;

const ProjectInfoObject = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  gap: 0.5rem;
`;

const ProjectInfoKey = styled.div`
  width: 3.58rem;
  min-height: 1.75rem;
  height: 100%;
  font-size: 0.75rem;
  line-height: 1.75rem;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #383838;
`;

const ProjectInfoValue = styled.div`
  min-height: 1.75rem;
  height: 100%;
  flex-wrap: wrap;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.75rem;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #383838;
`;

const Position = styled.span`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin: 0 0.7rem 0 0;
  &::after {
    content: '|';
    position: absolute;
    margin: 0 0.5rem;
    right: -1rem;
  }
  &:last-child::after {
    display: none;
  }
`;

const Emphasis = styled.span`
  color: ${COLORS.violetB500};
  font-weight: 700;
  margin: 0 0.1rem;
`;

const ProjectInfoStackWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  gap: 0.625rem;

  width: 100%;
  height: 100%;
  /* min-height: 6.5rem; */
`;

const StackDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  min-height: 26px;
`;

const StackTitle = styled.div`
  min-width: 2.5rem;
  height: 26px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
`;

const StackValue = styled.div`
  background-color: ${COLORS.gray100};
  height: 1.625rem;
  padding: 0 0.25rem;
  border-radius: 0.75rem;
  font-size: 0.625rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Div = styled.div``;

const StackList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-left: 0.4rem;
`;

const SendNoteButton = styled.button<{ page?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
  cursor: pointer;
  transform: all 300ms ease-in-out;
  > .note :hover {
    background-color: ${COLORS.black};
  }
`;

const NoteIcon = styled(HiMail)`
  font-size: 1rem;
  color: ${COLORS.violetB300};
`;
