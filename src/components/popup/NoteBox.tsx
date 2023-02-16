import styled from '@emotion/styled';
import { useQueries } from '@tanstack/react-query';
import { getInboxNotes, getOutboxNotes } from 'apis/notes';
import COLORS from 'assets/styles/colors';
import { useAuth, usePopup } from 'hooks';
import React, { useState } from 'react';
import NoteMessage from './NoteMessage';
import { PopupWrapper } from './styles';

const boxList = [
  { id: 'inbox', label: '받은 쪽지함' },
  { id: 'outbox', label: '보낸 쪽지함' },
];

export default function NoteBox() {
  // 받은 쪽지함, 보낸 쪽지함 선택 상태
  const [selectedBox, setSelectedBox] = useState('inbox');

  const {
    popup: { isNoteOpen },
  } = usePopup();
  const { uid } = useAuth();

  const [{ data: inboxData }, { data: outboxData }] = useQueries({
    queries: [
      {
        queryKey: ['inbox', uid],
        queryFn: getInboxNotes,
      },
      {
        queryKey: ['outbox', uid],
        queryFn: getOutboxNotes,
      },
    ],
  });

  return (
    <>
      {isNoteOpen && (
        <PopupWrapper popup="message">
          <BoxContainer>
            {boxList.map(({ id, label }) => (
              <React.Fragment key={id}>
                <MenuToggleInput
                  type="radio"
                  name="message"
                  id={id}
                  value={selectedBox}
                  onChange={() => setSelectedBox(id)}
                  defaultChecked={id === 'inbox'}
                />
                <MenuLabel htmlFor={id}>{label}</MenuLabel>
              </React.Fragment>
            ))}
          </BoxContainer>
          <MessageWrapper>
            {selectedBox === 'inbox' &&
              inboxData?.map((data: any) => (
                <NoteMessage key={data.noteId} type="inbox" data={data} />
              ))}
            {selectedBox === 'outbox' &&
              outboxData?.map((data: any) => (
                <NoteMessage key={data.noteId} type="outbox" data={data} />
              ))}
          </MessageWrapper>
        </PopupWrapper>
      )}
    </>
  );
}

const BoxContainer = styled.div`
  width: 100%;
  height: 2.5625rem;

  font-size: 0.75rem;
  font-weight: 700;

  display: flex;
  flex-direction: row;
  align-items: flex-start;

  border-bottom: 1px solid ${COLORS.gray200};
  color: ${COLORS.gray850};
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

  background-color: ${COLORS.gray200};

  cursor: pointer;
`;

const MenuToggleInput = styled.input`
  display: none;

  color: ${COLORS.gray850};

  &:checked + label {
    color: ${COLORS.violetB500};
    background-color: ${COLORS.white};
  }
`;

const MessageWrapper = styled.div`
  flex: 1;

  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;
