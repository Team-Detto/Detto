import { modalTypes } from 'components/common/modal/modal';
import { useGlobalModal, useIsMobile } from 'hooks';
import { useEffect } from 'react';
import { allowScroll, preventScroll } from 'utils/modal';
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
    updateModalSize,
  } = useGlobalModal();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) updateModalSize('82%', '26.1875rem');
    else updateModalSize('41.0625rem', '31.4375rem');

    // 모달이 열려있을 때 body 스크롤 방지
    preventScroll();
    return () => {
      allowScroll();
    };
  }, []);

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
