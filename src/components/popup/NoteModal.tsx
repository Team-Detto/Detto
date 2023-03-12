import { modalTypes } from 'components/common/modal/modalTypes';
import { useGlobalModal, useIsMobile } from 'hooks';
import MobileReadInboxNote from './mobile/MobileReadInboxNote';
import MobileReadOutboxNote from './mobile/MobileReadOutboxNote';
import MobileReplyNote from './mobile/MobileReplyNote';
import MobileSendNote from './mobile/MobileSendNote';
import ReadInboxNote from './ReadInboxNote';
import ReadOutboxNote from './ReadOutboxNote';
import ReplyNote from './ReplyNote';
import SendNote from './SendNote';

const NoteModal = () => {
  const {
    modal: { type, data },
  } = useGlobalModal();
  const isMobile = useIsMobile();

  // 받은쪽지함 쪽지 읽기
  if (type === modalTypes.inbox) {
    if (isMobile) return <MobileReadInboxNote data={data} />;
    return <ReadInboxNote data={data} />;
  }

  // 쪽지 보내기
  if (type === modalTypes.sendNote) {
    if (isMobile) return <MobileSendNote data={data} />;
    return <SendNote data={data} />;
  }

  // 답장하기
  if (type === modalTypes.reply) {
    if (isMobile) return <MobileReplyNote data={data} />;
    return <ReplyNote data={data} />;
  }

  // 보낸쪽지함 쪽지 읽기
  if (type === modalTypes.outbox) {
    if (isMobile) return <MobileReadOutboxNote data={data} />;
    return <ReadOutboxNote data={data} />;
  }

  return <div>Note Modal</div>;
};

export default NoteModal;
