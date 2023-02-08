import styled from '@emotion/styled';
import WebContainer from './common/WebContainer';

const Header = () => {
  return (
    <HeaderContainer>
      <WebContainer>
        <HeaderWrapper>
          <LogoBoxH1>Detto</LogoBoxH1>
          <Nav>
            <NavListUl>
              <NavItemLi>새 글 쓰기</NavItemLi>
              <NavItemLi>팀원찾기</NavItemLi>
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

const HeaderContainer = styled.header`
  width: 100%;
`;

const HeaderWrapper = styled.div`
  margin: 1.875rem 0.625rem;

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
