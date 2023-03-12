import styled from '@emotion/styled';
import { useQueries } from '@tanstack/react-query';
import { getInboxNotes, getOutboxNotes } from 'apis/notes';
import COLORS from 'assets/styles/colors';
import { useAuth, usePopup } from 'hooks';
import { Fragment, useEffect, useState } from 'react';
import { staleTime } from 'utils/staleTime';
import NoteMessage from '../NoteMessage';
import { MobilePopupWrapper } from './styles';

const boxList = [
  { id: 'inbox', label: '받은 쪽지' },
  { id: 'outbox', label: '보낸 쪽지' },
];

const MobileNoteBox = () => {
  // 받은 쪽지함, 보낸 쪽지함 선택 상태
  const [selectedBox, setSelectedBox] = useState('inbox');
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const {
    popup: { isNoteOpen },
  } = usePopup();
  const { uid } = useAuth();

  const [{ data: inboxData }, { data: outboxData }] = useQueries({
    queries: [
      {
        queryKey: ['inbox', uid],
        queryFn: getInboxNotes,
        enabled: !!uid,
        staleTime: staleTime.inboxNotes,
      },
      {
        queryKey: ['outbox', uid],
        queryFn: getOutboxNotes,
        enabled: !!uid,
        staleTime: staleTime.outboxNotes,
      },
    ],
  });

  useEffect(() => {
    if (inboxData) {
      setUnreadCount(inboxData.filter((data: any) => !data.isRead).length);
    }
  }, [inboxData]);

  if (!isNoteOpen) return null;
  return (
    // 팝업창 이외의 영역 클릭 시 팝업창 닫기. 팝업창 클릭 시 이벤트 propagation 막기
    <MobilePopupWrapper popup="message" onClick={(e) => e.stopPropagation()}>
      <BoxContainer>
        {boxList.map(({ id, label }) => (
          <Fragment key={id}>
            <MenuToggleInput
              type="radio"
              name="message"
              id={id}
              value={selectedBox}
              onChange={() => setSelectedBox(id)}
              defaultChecked={id === 'inbox'}
            />
            {id === 'inbox' ? (
              // 받은 쪽지함에는 읽지 않은 쪽지 수 표시
              <MenuLabel htmlFor={id}>
                {label}
                {unreadCount > 0 && ` (${unreadCount})`}
              </MenuLabel>
            ) : (
              <MenuLabel htmlFor={id}>{label}</MenuLabel>
            )}
          </Fragment>
        ))}
      </BoxContainer>
      <MessageWrapper>
        {selectedBox === 'inbox' &&
          (inboxData?.length === 0 ? (
            <NoDataText>🔔 아직 받은 쪽지가 없어요</NoDataText>
          ) : (
            inboxData?.map((data: any) => (
              <NoteMessage key={data.id} type="inbox" data={data} />
            ))
          ))}
        {selectedBox === 'outbox' &&
          (outboxData?.length === 0 ? (
            <NoDataText>🔔 아직 보낸 쪽지가 없어요</NoDataText>
          ) : (
            outboxData?.map((data: any) => (
              <NoteMessage key={data.id} type="outbox" data={data} />
            ))
          ))}
      </MessageWrapper>
    </MobilePopupWrapper>
  );
};

export default MobileNoteBox;

const BoxContainer = styled.div`
  width: 100%;
  height: 2.5625rem;

  font-size: 0.75rem;
  font-weight: 700;

  display: flex;
  flex-direction: row;
  align-items: flex-start;

  color: ${COLORS.white};
`;

const MenuLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 50%;
  height: 100%;

  padding: 0;
  margin: 0;

  background-color: ${COLORS.violetB400};

  cursor: pointer;
`;

const MenuToggleInput = styled.input`
  display: none;

  &:checked + label {
    color: ${COLORS.violetB500};
    background-color: ${COLORS.white};
  }
`;

const MessageWrapper = styled.div`
  flex: 1;

  overflow-x: hidden;
  overflow-y: overlay;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NoDataText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  font-weight: 400;
  font-size: 0.75rem;
  line-height: 140%;

  color: ${COLORS.gray850};
`;
