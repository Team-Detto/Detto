import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useGlobalModal } from 'hooks';
import { useEffect } from 'react';
import { getDate } from 'utils/date';
import CustomButton from './CustomButton';

const INBOX = 'inbox';
const OUTBOX = 'outbox';
const REPLY = 'reply';

const NoteModal = () => {
  const {
    modal: { type, data },
    openModalWithData,
    closeModal,
    updateModalSize,
  } = useGlobalModal();

  const { displayName, title, date, content, photoURL } = data;

  const handleReply = () => {
    openModalWithData(REPLY, data);
  };

  const handleSendNote = () => {
    console.log('쪽지 보내기');
    closeModal();
  };

  useEffect(() => {
    updateModalSize('41.0625rem', '29.4375rem');
  }, []);

  // 받은쪽지함 쪽지 읽기
  if (type === INBOX)
    return (
      <Container>
        <HeaderContainer>
          <ProfileImage src={photoURL} />
          <TitleText>{title}</TitleText>
          <DateText>{getDate(date)}</DateText>
        </HeaderContainer>
        <ContentText>{content}</ContentText>
        <CustomButton label="답장하기" onClick={handleReply} />
      </Container>
    );

  // 답장하기
  if (type === REPLY)
    return (
      <Container>
        <HeaderContainer>
          <ProfileImage src={photoURL} />
          <TitleText>{displayName}님께 쪽지 보내기</TitleText>
        </HeaderContainer>
        <ContentTextarea placeholder="쪽지 내용을 입력해주세요." />
        <CustomButton label="쪽지를 보낼게요" onClick={handleSendNote} />
      </Container>
    );

  // 보낸쪽지함 쪽지 읽기
  if (type === OUTBOX)
    return (
      <Container>
        <HeaderContainer>
          <ProfileImage src={photoURL} />
          <TitleText>{title}</TitleText>
          <DateText>{getDate(date)}</DateText>
        </HeaderContainer>
        <ContentText>{content}</ContentText>
        <CustomButton label="답장하기" onClick={handleReply} />
      </Container>
    );

  return <div>Note Modal</div>;
};

export default NoteModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  padding: 1.25rem 1rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1rem;
`;

const ProfileImage = styled.img`
  width: 2rem;
  height: 2rem;

  border-radius: 100%;

  margin-right: 0.625rem;
`;

const TitleText = styled.h2`
  flex: 1;

  font-weight: 700;
  font-size: 20px;
  line-height: 44px;

  color: ${COLORS.gray850};
`;

const DateText = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;

  color: ${COLORS.gray750};
`;

const ContentText = styled.p`
  width: 100%;
  height: 17.8125rem;
  padding: 10px 28px;

  font-weight: 400;
  font-size: 1.125rem;
  line-height: 200%;

  color: ${COLORS.gray900};

  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;

  overflow: auto;
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  height: 285px;
  padding: 10px 28px;

  font-weight: 400;
  font-size: 18px;
  line-height: 200%;

  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;

  resize: none;
`;
