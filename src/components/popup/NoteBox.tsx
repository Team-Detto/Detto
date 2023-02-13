import styled from '@emotion/styled';
import { useQueries } from '@tanstack/react-query';
import { getInboxNotes, getOutboxNotes } from 'apis/note';
import COLORS from 'assets/styles/colors';
import { usePopup } from 'hooks';
import React, { useState } from 'react';
import { getDate } from 'utils/date';
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

  const [{ data: inbox }, { data: outbox }] = useQueries({
    queries: [
      {
        queryKey: ['inbox'],
        queryFn: getInboxNotes,
      },
      {
        queryKey: ['outbox'],
        queryFn: getOutboxNotes,
      },
    ],
  });

  return (
    <>
      {isNoteOpen && (
        <PopupWrapper popup="message">
          <BoxContainer>
            {/* inbox outbox radio button */}
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
              // TODO: 타입 지정
              inbox?.map((data: any) => (
                <NoteMessage key={data.id} data={data} />
              ))}
            {selectedBox === 'outbox' &&
              outbox?.map((data: any) => (
                <NoteMessage key={data.id} data={data} />
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
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;
