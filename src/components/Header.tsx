import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import WebContainer from './common/WebContainer';
import PopupContainer from './popup/PopupContainer';
import { useGlobalModal, useHeader, usePopup } from 'hooks';
import COLORS from 'assets/styles/colors';

interface headerTypes {
  isMain: boolean;
  hideGradient: boolean;
}

const Header = () => {
  const { toggleNoteBox, toggleNotificationBox } = usePopup();
  const { openModal } = useGlobalModal();
  const { isMain, isLoggedIn, hideGradient, handleLogoutClick } = useHeader();

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
