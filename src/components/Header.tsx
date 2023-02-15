import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import WebContainer from './common/WebContainer';
import { useEffect, useState } from 'react';
import PopupContainer from './popup/PopupContainer';
import { useGlobalModal, usePopup } from 'hooks';
import { signOut } from 'firebase/auth';
import { authService } from 'apis/firebaseService';

interface headerTypes {
  isMain: boolean;
  hideGradient: boolean;
}

// 메인 페이지에서 스크롤이 MAIN_SCROLL_Y 값 이상 되면 헤더의 배경색을 투명에서 하얀색으로 변경
const MAIN_SCROLL_Y = 480;

const Header = () => {
  const [hideGradient, setHideGradient] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMain = location.pathname === '/';

  const { toggleNoteBox, toggleNotificationBox } = usePopup();
  const { openModal } = useGlobalModal();

  const userLocal = localStorage.getItem('user');

  // 높이에 따라 배경색 그라디언트 표시 여부 결정하는 함수
  const showHeaderGradientBackground = () => {
    const { scrollY } = window;
    scrollY > MAIN_SCROLL_Y ? setHideGradient(false) : setHideGradient(true);
  };

  // 로그아웃
  const handleLogoutClick = () => {
    signOut(authService).then(() => {
      localStorage.removeItem('user');
      navigate('/', { replace: true });
      setIsLoggedIn(false);
    });
  };

  useEffect(() => {
    if (isMain) {
      window.addEventListener('scroll', showHeaderGradientBackground);
    }

    return () => {
      window.removeEventListener('scroll', showHeaderGradientBackground);
    };
  }, [isMain]);

  useEffect(() => {
    if (userLocal) {
      setIsLoggedIn(true);
    }
  }, [userLocal]);

  return (
    <HeaderContainer isMain={isMain} hideGradient={hideGradient}>
      <WebContainer>
        <PopupContainer /> {/* 쪽지, 알림 팝업 컨테이너 */}
        <HeaderWrapper>
          <LogoBoxH1>
            <Link to={'/'}> Detto</Link>
          </LogoBoxH1>
          <Nav>
            <NavListUl>
              {/* TODO :: 쪽지, 알림, 마이페이지, 로그아웃은 로그인 되었을 경우에만 보이도록 로직 추가 필요 */}
              <NavItemLi>
                <Link to={'/project/write'}>새 글 쓰기</Link>
              </NavItemLi>
              <NavItemLi>
                <Link to={'/findproject'}>팀원찾기</Link>
              </NavItemLi>
              {isLoggedIn && (
                <NavItemLi onClick={toggleNoteBox}>쪽지</NavItemLi>
              )}
              {isLoggedIn && (
                <NavItemLi onClick={toggleNotificationBox}>알림</NavItemLi>
              )}
              {!isLoggedIn && (
                <NavItemLi onClick={() => openModal('login', 0)}>
                  로그인하기
                </NavItemLi>
              )}
              {/* 임시 주석처리 */}
              {isLoggedIn && (
                <NavItemLi>
                  <Link to={'/mypage'}>마이페이지</Link>
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
      ? 'linear-gradient(180deg, rgba(108, 108, 108, 0.47) 0%, rgba(217, 217, 217, 0) 100.87%)'
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
  color: #4e5968;

  &:last-child {
    margin-right: 0;
  }
`;
