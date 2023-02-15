import { modalTypes } from 'components/common/modal/modal';
import { useGlobalModal } from 'hooks';
import { useEffect } from 'react';
import { allowScroll, preventScroll } from 'utils/modal';
import ReadInboxNote from './ReadInboxNote';
import ReadOutboxNote from './ReadOutboxNote';
import SendNote from './SendNote';

const NoteModal = () => {
  const {
    modal: { type, data },
    updateModalSize,
  } = useGlobalModal();

  useEffect(() => {
    updateModalSize('41.0625rem', '31.4375rem');
    // 모달이 열려있을 때 body 스크롤 방지
    const prevScrollY = preventScroll();
    return () => {
      allowScroll(prevScrollY);
    };
  }, []);

  // 받은쪽지함 쪽지 읽기
  if (type === modalTypes.inbox) {
    return <ReadInboxNote data={data} />;
  }

  // 답장하기, 쪽지 보내기
  if (type === modalTypes.reply || type === modalTypes.sendNote) {
    return <SendNote receiverUid={data.uid} />;
  }

  // 보낸쪽지함 쪽지 읽기
  if (type === modalTypes.outbox) {
    return <ReadOutboxNote data={data} />;
  }

  return <div>Note Modal</div>;
};

export default NoteModal;
