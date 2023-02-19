import { Link, NavLink, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import WebContainer from './common/WebContainer';
import PopupContainer from './popup/PopupContainer';
import { useAuth, useGlobalModal, useHeader, usePopup } from 'hooks';
import COLORS from 'assets/styles/colors';
import { useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import { getInboxNotes } from 'apis/notes';
import { getNotifications } from 'apis/notifications';
import { staleTime } from 'utils/staleTime';

interface headerTypes {
  isMain: boolean;
  hideGradient: boolean;
}

const Header = () => {
  const { closePopup, toggleNoteBox, toggleNotificationBox } = usePopup();
  const { openModal } = useGlobalModal();
  const { isMain, isLoggedIn, hideGradient, handleLogoutClick } = useHeader();
  const location = useLocation();

  // 페이지 이동 시 팝업 닫기
  useEffect(() => {
    closePopup();
  }, [location.pathname]);

  const { uid } = useAuth();
  const [{ data: notes }, { data: notifiactions }] = useQueries({
    queries: [
      {
        queryKey: ['inbox', uid],
        queryFn: getInboxNotes,
        staleTime: staleTime.inboxNotes,
        enabled: !!uid,
      },
      {
        queryKey: ['notifications', uid],
        queryFn: getNotifications,
        staleTime: staleTime.notifications,
        enabled: !!uid,
      },
    ],
  });

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
                  <NavItemLink to={'/project/write'}>새 글 쓰기</NavItemLink>
                ) : (
                  '새 글 쓰기'
                )}
              </NavItemLi>
              {/* {isLoggedIn ? (
                <NavItemLi>
                  <NavItemLink to={'/project/write'}>새 글 쓰기</NavItemLink>
                </NavItemLi>
              ) : (
                <NavItemLi onClick={() => openModal('login', 0)}>
                  새 글 쓰기
                </NavItemLi>
              )} */}
              <NavItemLi>
                <NavItemLink to={'/findproject'}>팀원찾기</NavItemLink>
              </NavItemLi>
              {isLoggedIn && (
                <NavItemLi onClick={toggleNoteBox}>
                  쪽지
                  <Count>
                    (
                    {notes
                      ? notes.filter(({ isRead }: Partial<Note>) => !isRead)
                          .length
                      : 0}
                    )
                  </Count>
                </NavItemLi>
              )}
              {isLoggedIn && (
                <NavItemLi onClick={toggleNotificationBox}>
                  알림
                  <Count>
                    (
                    {notifiactions
                      ? notifiactions.filter(
                          ({ isRead }: Partial<Notification>) => !isRead,
                        ).length
                      : 0}
                    )
                  </Count>
                </NavItemLi>
              )}
              {!isLoggedIn && (
                <NavItemLi onClick={() => openModal('login', 0)}>
                  로그인하기
                </NavItemLi>
              )}

              {isLoggedIn && (
                <NavItemLi>
                  <NavItemLink to={'/mypage'}>마이페이지</NavItemLink>
                </NavItemLi>
              )}
              {isLoggedIn && (
                <NavItemLi onClick={handleLogoutClick}>로그아웃</NavItemLi>
              )}
            </NavListUl>
          </Nav>
        </HeaderWrapper>
      </WebContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header<headerTypes>`
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
    isMain && hideGradient ? 'transparent' : '#fff'};
`;

const HeaderWrapper = styled.div`
  margin: 1.875rem 0.625rem;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoBoxH1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #5d50f0;
  margin-top: -0.5rem;
  margin-left: 1.438rem;
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
  color: #4e5968;
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
