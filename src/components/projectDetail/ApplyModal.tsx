import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import PositionButton from 'components/common/ApplyPositionButton';

import { useCallback, useEffect, useState } from 'react';
import { allowScroll, preventScroll } from 'utils/modal';

interface props {
  isOpen: boolean;
  message: string;
  onClickEvent: () => void;
  onCloseEvent: () => void;
}

const ApplyModal = ({ isOpen, message, onClickEvent, onCloseEvent }: props) => {
  const positions = ['기획', '디자인', '프론트', '백엔드'];
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const prevScrollY = preventScroll();
      return () => {
        allowScroll(prevScrollY);
      };
    }
  }, [isOpen]);

  return (
    <ModalContainer isOpen={isOpen}>
      <ModalTitle>{message}</ModalTitle>
      <ContentContainer>
        <PositionContainer>
          <PositionTitle>
            포지션
            <PositionNotification>
              (중복 선택이 불가능 해요)
            </PositionNotification>
          </PositionTitle>
          <PositionContentWrap>
            {positions.map((position, idx) => {
              return <PositionButton name={position} idx={idx} />;
            })}
          </PositionContentWrap>
        </PositionContainer>
        <MotiveContainer>
          <MotiveTitle>지원동기</MotiveTitle>
          <MotiveContentWrap>
            <MotiveTextArea
              placeholder="지원동기를 입력해주세요"
              // onChange={onChangeEvent}
            />
          </MotiveContentWrap>
        </MotiveContainer>
      </ContentContainer>
      <AlertButtonContainer>
        <AlertButton onClick={onClickEvent}>확인</AlertButton>
      </AlertButtonContainer>
    </ModalContainer>
  );
};

export default ApplyModal;

const ModalContainer = styled.div`
  position: fixed;
  width: 657px;
  height: 523px;
  left: 50%;
  top: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  padding: 20px 16px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(117, 117, 117, 0.25);
  z-index: 999;
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
`;

const ModalTitle = styled.p`
  height: 44px;
  font-weight: 700;
  font-size: 28px;
  line-height: 44px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  margin-top: 20px;

  width: 625px;
  height: 337px;
`;

const PositionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3.5rem;
  margin-bottom: 1.5rem;
`;

const PositionTitle = styled.p`
  display: flex;

  width: 100%;
  text-align: start;
  height: 1.5rem;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
  gap: 8px;
`;

const PositionNotification = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: ${COLORS.gray750};
`;

const PositionContentWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
  margin-top: 12px;
  width: 100%;
  height: 40px;
`;

// const PositionButton = styled.button`
//   width: 146px;
//   height: 40px;
//   padding: 8px 48px;
//   gap: 19px;
//   background-color: ${(props: { isActive: boolean }) =>
//     props.isActive === true ? `${COLORS.violetB400}` : `${COLORS.gray50}`};
//   color: ${(props: { isActive: boolean }) =>
//     props.isActive === true ? `${COLORS.white}` : `${COLORS.black}`};
//   border-radius: 32px;

//   transform: scale(1);
//   transition: transform 0.5s;
//   &:hover {
//     transform: scale(1.1);
//     transition: transform 0.5s;
//   }
// `;

const MotiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;

  width: 625px;
  height: 237px;
  margin-top: 20px;
`;

const MotiveTitle = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
`;

const MotiveContentWrap = styled.div``;

const MotiveTextArea = styled.textarea`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 28px;
  gap: 10px;

  width: 625px;
  height: 197px;
  border: 1px solid #ced3db;
  border-radius: 4px;
`;

const AlertButtonContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;
const AlertButton = styled.button`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  padding: 21px 95px;
  gap: 10px;

  width: 625px;
  height: 62px;
  background: #fafafb;
  border-radius: 16px;
`;
