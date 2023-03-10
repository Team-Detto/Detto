import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { GrMail } from 'react-icons/gr';
import { FiChevronLeft } from 'react-icons/fi';
import { IoNotifications, IoMenu } from 'react-icons/io5';
import { useHeader, usePopup } from 'hooks';
import { LogoBoxH1 } from './Header';
import PopupContainer from './popup/PopupContainer';
import COLORS from 'assets/styles/colors';
import MobileDropdownMenu from './popup/mobile/MobileDropdownMenu';

const MobileHeader = () => {
  const {
    closePopup,
    toggleNoteBox,
    toggleNotificationBox,
    toggleDropdownMenu,
    unreadNoteCount,
    unreadNotificationCount,
  } = usePopup();
  const { isMain, isLoggedIn, handleGoBackClick, closeDropdownMenu } =
    useHeader();

  // 페이지 이동 시 팝업 / 드롭다운 메뉴 닫기
  useEffect(() => {
    closePopup();
    closeDropdownMenu();
  }, [location.pathname]);

  return (
    <MobileHeaderContainer>
      <MobileHeaderWrapper>
        {isLoggedIn && <PopupContainer />}
        {!isMain && (
          <MobileMenuItem onClick={handleGoBackClick}>
            <MobileChevronLeftIcon />
          </MobileMenuItem>
        )}
        <LogoBoxH1 isMobile={true}>
          <Link to={'/'}> Detto</Link>
        </LogoBoxH1>
        <MobileMenuList>
          {isMain && isLoggedIn ? (
            <>
              <MobileMenuItem onClick={toggleNoteBox}>
                <CountBox>
                  <MobileNoteIcon />
                  {unreadNoteCount > 0 && (
                    <MobileCount>
                      {unreadNoteCount < 100 ? unreadNoteCount : '99+'}
                    </MobileCount>
                  )}
                </CountBox>
              </MobileMenuItem>
              <MobileMenuItem onClick={toggleNotificationBox}>
                <CountBox>
                  <MobileNotificationIcon />
                  {unreadNotificationCount > 0 && (
                    <MobileCount>
                      {unreadNotificationCount < 100
                        ? unreadNotificationCount
                        : '99+'}
                    </MobileCount>
                  )}
                </CountBox>
              </MobileMenuItem>
            </>
          ) : (
            ''
          )}
          <MobileMenuItem onClick={toggleDropdownMenu}>
            <MobileMenuIcon />
          </MobileMenuItem>
        </MobileMenuList>
      </MobileHeaderWrapper>
      <MobileDropdownMenu />
    </MobileHeaderContainer>
  );
};

export default MobileHeader;

const MobileHeaderContainer = styled.header`
  padding: 0 1.5rem;
`;

const MobileHeaderWrapper = styled.div`
  width: 100%;
  height: 3rem;
  background-color: ${COLORS.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MobileMenuList = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > div {
    &:not(:last-child) {
      margin-right: 1.25rem;
    }
  }
`;

const MobileMenuItem = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const MobileNoteIcon = styled(GrMail)`
  font-size: 1.25rem;
  color: ${COLORS.gray750};
`;

const MobileNotificationIcon = styled(IoNotifications)`
  font-size: 1.25rem;
  color: ${COLORS.gray750};
`;

const MobileMenuIcon = styled(IoMenu)`
  font-size: 1.75rem;
  color: ${COLORS.gray750};
  position: relative;
`;

const MobileChevronLeftIcon = styled(FiChevronLeft)`
  font-size: 1.875rem;
  color: ${COLORS.gray750};
  margin-top: 0.25rem;
`;

const CountBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const MobileCount = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -0.5rem;
  left: 0.75rem;
  padding: 0 0.2rem;
  min-width: 1rem;
  height: 1.0625rem;
  background-color: ${COLORS.violetB500};
  border-radius: 4px;

  font-size: 0.75rem;
  color: ${COLORS.white};
  font-weight: 900;
`;
