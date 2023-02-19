import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

export const PopupWrapper = styled.div<{ popup: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  width: 20.25rem;
  height: 20.375rem; // 5개 높이 (하나에 3.5rem + 타이틀 2.5rem)

  right: ${(props) => (props.popup === 'notification' ? '.5rem' : '6.125rem')};
  top: 5rem;

  background-color: ${COLORS.white};

  border-radius: 8px;
  border: 1px solid ${COLORS.gray200};

  overflow: hidden;
`;

// Message
export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.75rem;
  gap: 0.125rem;

  height: 3.5625rem;

  background: ${COLORS.white};

  border-bottom: 1px solid ${COLORS.gray200};
`;

export const MessageTitleDiv = styled.div<{
  isRead: boolean;
  disabled?: boolean;
}>`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: ${(props) => (props.isRead ? '400' : '700')};
  font-size: 0.75rem;
  line-height: 140%;

  display: flex;
  align-items: center;

  color: ${COLORS.gray850};

  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`;

export const MessageDateDiv = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 0.625rem;
  line-height: 140%;

  display: flex;
  align-items: center;

  color: ${COLORS.gray800};
`;

// Note
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  padding: 1.25rem 1rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1rem;
`;

export const ProfileImage = styled.img`
  width: 2rem;
  height: 2rem;

  border-radius: 100%;

  margin-right: 0.625rem;

  cursor: pointer;
`;

export const NameText = styled.h2`
  flex: 1;

  font-weight: 700;
  font-size: 20px;
  line-height: 44px;

  color: ${COLORS.gray850};
`;

export const TitleText = styled.h2`
  width: 100%;
  padding: 10px 28px;

  font-weight: 400;
  font-size: 1.125rem;
  line-height: 200%;

  color: ${COLORS.gray900};

  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;
`;

export const DateText = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;

  color: ${COLORS.gray750};
`;

export const ContentText = styled.p`
  width: 100%;
  height: 230px;
  padding: 10px 28px;

  font-weight: 400;
  font-size: 1.125rem;
  line-height: 200%;

  color: ${COLORS.gray900};

  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;

  overflow: auto;
`;

export const ContentTextarea = styled.textarea`
  width: 100%;
  /* height: 285px; */
  height: 230px;
  padding: 10px 28px;

  font-weight: 400;
  font-size: 18px;
  line-height: 200%;

  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;

  resize: none;
`;
