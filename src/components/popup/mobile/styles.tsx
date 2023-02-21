import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

export const MobilePopupWrapper = styled.div<{ popup: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  width: 20.25rem;
  height: 20.375rem; // 5개 높이 (하나에 3.5rem + 타이틀 2.5rem)

  top: 3rem;
  right: 1.4375rem;

  background-color: ${COLORS.white};
  border-radius: 0.5rem;

  filter: drop-shadow(0 0.125rem 0.5rem rgba(0, 0, 0, 0.2));

  overflow: hidden;
`;

// Message
export const MobileMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.75rem;
  gap: 0.125rem;

  height: 3.5625rem;

  background: ${COLORS.white};

  border-bottom: 1px solid ${COLORS.gray200};
`;

export const MobileMessageTitleDiv = styled.div<{
  isRead: boolean;
}>`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: ${(props) => (props.isRead ? '400' : '700')};
  font-size: 0.75rem;
  line-height: 140%;

  display: flex;
  align-items: center;

  color: ${COLORS.gray850};

  cursor: pointer;
`;

export const MobileMessageDateDiv = styled.div`
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
export const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  padding: 1rem;
`;

export const MobileHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MobileProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const MobileProfileImage = styled.img`
  width: 2rem;
  height: 2rem;

  border-radius: 100%;

  margin-right: 0.25rem;

  cursor: pointer;
`;

export const MobileNameText = styled.h2`
  flex: 1;

  font-weight: 700;
  font-size: 1rem;
  line-height: 1.4375rem;

  color: ${COLORS.gray850};
`;

export const MobileDateText = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 140%;
  letter-spacing: -0.02em;

  color: ${COLORS.gray750};
  text-align: end;
`;

export const MobileTitleText = styled.h2`
  width: 100%;
  padding: 0.625rem 1.25rem;

  font-weight: 400;
  font-size: 0.75rem;
  line-height: 140%;

  color: ${COLORS.gray900};

  border: 1px solid ${COLORS.gray300};
  border-radius: 0.25rem;
`;

export const MobileContentText = styled.p`
  width: 100%;
  height: 11.875rem;
  padding: 0.625rem 1.25rem;

  font-weight: 400;
  font-size: 0.75rem;
  line-height: 140%;

  color: ${COLORS.gray900};

  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;

  overflow: auto;
`;

export const MobileContentTextarea = styled.textarea`
  width: 100%;
  height: 11.875rem;
  padding: 0.625rem 1.25rem;

  font-weight: 400;
  font-size: 0.75rem;
  line-height: 140%;

  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;

  resize: none;

  ::-webkit-scrollbar {
    width: 0.375rem;
  }
  ::-webkit-scrollbar-thumb {
    background: ${COLORS.gray100};
    border-radius: 0.25rem;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;
