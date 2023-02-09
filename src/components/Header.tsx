import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import WebContainer from './common/WebContainer';
import { useEffect, useState } from 'react';

interface headerTypes {
  isMain: boolean;
  hideGradient: boolean;
}

const Header = () => {
  const [hideGradient, setHideGradient] = useState<boolean>(true);
  const location = useLocation();
  const isMain = location.pathname === '/';

  const showHeaderGradientBackground = () => {
    const { scrollY } = window;
    scrollY > 700 ? setHideGradient(false) : setHideGradient(true);
  };

  useEffect(() => {
    if (isMain) {
      window.addEventListener('scroll', showHeaderGradientBackground);
    }

    return () => {
      window.removeEventListener('scroll', showHeaderGradientBackground);
    };
  }, [isMain]);

  return (
    <HeaderContainer isMain={isMain} hideGradient={hideGradient}>
      <WebContainer>
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
              <NavItemLi>쪽지</NavItemLi>
              <NavItemLi>알림</NavItemLi>
              <NavItemLi>로그인하기</NavItemLi>
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
  background-image: ${(props) =>
    props.isMain && props.hideGradient
      ? 'linear-gradient(180deg, rgba(108, 108, 108, 0.47) 0%, rgba(217, 217, 217, 0) 100.87%)'
      : 'none'};
  background-color: ${(props) => (props.isMain ? 'transparent' : '#fff')};
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
