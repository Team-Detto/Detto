import { useNavigate } from 'react-router-dom';
import Views from './Views';
import Likes from './Likes';
import Share from './Share';
import styled from '@emotion/styled';
import { logEvent } from 'utils/amplitude';
import COLORS from 'assets/styles/colors';
import { HiMail } from 'react-icons/hi';
import { modalTypes } from 'components/common/modal/modal';
import { useAuth, useGlobalModal } from 'hooks';

const WriterToShareArea = ({ pid, userData, projectData }: any) => {
  const {
    uid: receiverUid,
    title,
    content,
    view,
    like,
    thumbnail,
  } = projectData;
  const navigate = useNavigate();
  const { uid: SenderUid } = useAuth(); //보내는 사람 id
  // const { id } = useParams(); //받는사람 id
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
    <WriterToShareContainer>
      <WriterWrapper
        onClick={() => {
          navigate(`/profile/${receiverUid}`);
          logEvent('Button Click', {
            from: `project_detail`, //pathname으로 설정 시 이동한 페이지로 인식해서 수정
            to: 'profile',
            name: 'profile',
          });
        }} //작성자 공개 프로필 페이지로 이동
      >
        <WriterProfileImg
          src={userData?.photoURL}
          alt={userData?.displayName}
          referrerPolicy="no-referrer"
        />
        <WriterNickname>{userData?.displayName ?? `닉네임`}</WriterNickname>

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
      </WriterWrapper>
      <IconWrapper>
        <Views pid={pid} view={view} />
        <Likes pid={pid} />
        <Share title={title} content={content} thumbnail={thumbnail} />
      </IconWrapper>
    </WriterToShareContainer>
  );
};

export default WriterToShareArea;

const WriterToShareContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.125rem;
`;

const WriterWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  width: 17.4375rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const WriterProfileImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
`;

const WriterNickname = styled.p`
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`;

const SendNoteButton = styled.button<{ page?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.3rem 0 0 0.5rem;
  cursor: pointer;
  transform: all 300ms ease-in-out;
  > .note :hover {
    background-color: ${COLORS.black};
  }
`;

const NoteIcon = styled(HiMail)`
  font-size: 1.5rem;
  color: ${COLORS.violetB300};
`;
