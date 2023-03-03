import { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useGlobalModal, useHeader, useIsMobile, usePopup } from 'hooks';
import styled from '@emotion/styled';
import MobileHeader from './MobileHeader';
import WebContainer from './common/WebContainer';
import PopupContainer from './popup/PopupContainer';
import COLORS from 'assets/styles/colors';
import {
  amplitudeToNoneButtonClick,
  amplitudeNeedToButtonClick,
} from 'utils/amplitude';

const Header = () => {
  const isMobile = useIsMobile();
  const {
    closePopup,
    toggleNoteBox,
    toggleNotificationBox,
    unreadNoteCount,
    unreadNotificationCount,
  } = usePopup();
  const { openModal } = useGlobalModal();
  const { isMain, isLoggedIn, hideGradient, handleLogoutClick } = useHeader();
  const location = useLocation();

  // 페이지 이동 시 팝업 닫기
  useEffect(() => {
    closePopup();
  }, [location.pathname]);

  // 모바일일 경우 모바일 헤더 노출
  if (isMobile) {
    return <MobileHeader />;
  }

  return (
    <HeaderContainer isMain={isMain} hideGradient={hideGradient}>
      <WebContainer>
        {isLoggedIn && <PopupContainer />}
        <HeaderWrapper>
          <LogoBoxH1>
            <Link to={'/'}> Detto</Link>
          </LogoBoxH1>
          <Nav>
            <NavListUl>
              <NavItemLi onClick={() => !isLoggedIn && openModal('login', 0)}>
                {isLoggedIn ? (
                  <NavItemLink
                    to={'/project/write'}
                    onClick={() =>
                      amplitudeNeedToButtonClick(
                        'project_wrtie',
                        'write_project',
                      )
                    }
                  >
                    새 글 쓰기
                  </NavItemLink>
                ) : (
                  '새 글 쓰기'
                )}
              </NavItemLi>
              <NavItemLi>
                <NavItemLink
                  to={'/findproject'}
                  onClick={() => {
                    amplitudeNeedToButtonClick('findproject', 'find_project');
                  }}
                >
                  프로젝트 찾기
                </NavItemLink>
              </NavItemLi>
              {isLoggedIn && (
                <NavItemLi
                  onClick={() => {
                    toggleNoteBox();
                    amplitudeToNoneButtonClick('header_notes');
                  }}
                >
                  쪽지
                  <Count>
                    ({unreadNoteCount < 100 ? unreadNoteCount : '99+'})
                  </Count>
                </NavItemLi>
              )}
              {isLoggedIn && (
                <NavItemLi
                  onClick={() => {
                    toggleNotificationBox();
                    amplitudeToNoneButtonClick('header_notifications');
                  }}
                >
                  알림
                  <Count>
                    (
                    {unreadNotificationCount < 100
                      ? unreadNotificationCount
                      : '99+'}
                    )
                  </Count>
                </NavItemLi>
              )}
              {!isLoggedIn && (
                <NavItemLi
                  onClick={() => {
                    openModal('login', 0);
                    amplitudeToNoneButtonClick('header_login');
                  }}
                >
                  로그인하기
                </NavItemLi>
              )}

              {isLoggedIn && (
                <NavItemLi>
                  <NavItemLink
                    to={'/mypage'}
                    onClick={() => {
                      amplitudeNeedToButtonClick('mypage', 'mypage');
                    }}
                  >
                    마이페이지
                  </NavItemLink>
                </NavItemLi>
              )}
              {isLoggedIn && (
                <NavItemLi
                  onClick={() => {
                    handleLogoutClick();
                    amplitudeToNoneButtonClick('header_logout');
                  }}
                >
                  로그아웃
                </NavItemLi>
              )}
            </NavListUl>
          </Nav>
        </HeaderWrapper>
      </WebContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header<{
  isMain: boolean;
  hideGradient: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 90;
  width: 100%;

  background-image: ${({ isMain, hideGradient }) =>
    isMain && hideGradient
      ? 'linear-gradient(180deg, rgba(242, 242, 242, 0.47) 0%, rgba(217, 217, 217, 0) 107.87%)'
      : 'none'};
  background-color: ${({ isMain, hideGradient }) =>
    isMain && hideGradient ? 'transparent' : `${COLORS.white}`};
`;

const HeaderWrapper = styled.div`
  margin: 1.875rem 0.625rem;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoBoxH1 = styled.h1<{ isMobile?: boolean }>`
  font-size: ${({ isMobile }) => (isMobile ? '1.625rem' : '2.5rem')};
  font-weight: 800;
  color: ${COLORS.violetB500};
  margin-top: ${({ isMobile }) => (isMobile ? '-0.2rem' : '-0.5rem')};
  margin-left: ${({ isMobile }) => (isMobile ? '0' : '1.438rem')};
  cursor: pointer;
`;

const Nav = styled.nav``;

const NavListUl = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 1.438rem;
`;

const NavItemLi = styled.li`
  margin-right: 2.625rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  color: ${COLORS.gray800};
  transition: all 300ms ease-in-out;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    color: ${COLORS.violetB500};
    transform: scale(1.01);
  }
`;

const Count = styled.span`
  color: ${COLORS.violetB500};
`;

const NavItemLink = styled(NavLink)`
  &.active {
    color: ${COLORS.violetB500};
  }
`;
