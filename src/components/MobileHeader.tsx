import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { GrMail } from 'react-icons/gr';
import { FiChevronLeft } from 'react-icons/fi';
import { IoNotifications, IoMenu } from 'react-icons/io5';
import { useGlobalModal, useHeader } from 'hooks';
import { LogoBoxH1 } from './Header';
import COLORS from 'assets/styles/colors';

const MobileHeader = () => {
  const { isMain, isLoggedIn, handleLogoutClick } = useHeader();
  const { openModal } = useGlobalModal();

  return (
    <MobileHeaderContainer>
      <MobileHeaderWrapper>
        {!isMain && (
          <MobileMenuItem>
            <MobileChevronLeftIcon />
          </MobileMenuItem>
        )}
        <LogoBoxH1 isMobile={true}>
          <Link to={'/'}> Detto</Link>
        </LogoBoxH1>
        <MobileMenuList>
          {isMain && isLoggedIn ? (
            <>
              <MobileMenuItem>
                <MobileNoteIcon />
              </MobileMenuItem>
              <MobileMenuItem>
                <MobileNotificationIcon />
              </MobileMenuItem>
            </>
          ) : (
            ''
          )}
          <MobileMenuItem>
            <MobileMenuIcon />
          </MobileMenuItem>
        </MobileMenuList>
      </MobileHeaderWrapper>

      {/* 드롭다운 메뉴 */}

      <DropdownBox>
        <DropdownList>
          {!isLoggedIn && (
            <DropdownItem onClick={() => openModal('login', 0)}>
              {' '}
              로그인
            </DropdownItem>
          )}
          {isLoggedIn && (
            <DropdownItem onClick={handleLogoutClick}>로그아웃</DropdownItem>
          )}
          <DropdownItem>
            <Link to={'/findproject'}>팀원찾기</Link>
          </DropdownItem>
          <DropdownItem onClick={() => !isLoggedIn && openModal('login', 0)}>
            {isLoggedIn ? (
              <Link to={'/project/write'}>새 글 쓰기</Link>
            ) : (
              '새 글 쓰기'
            )}
          </DropdownItem>
          {isLoggedIn && (
            <DropdownItem>
              <Link to={'/mypage'}>마이페이지</Link>{' '}
            </DropdownItem>
          )}
        </DropdownList>
      </DropdownBox>
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
`;

const MobileNoteIcon = styled(GrMail)`
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

const DropdownBox = styled.div`
  position: absolute;
  right: 1.5rem;
  width: 7.75rem;
  min-height: 10.75rem;
  background-color: ${COLORS.white};
  padding: 20px 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 99;
`;

const DropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const DropdownItem = styled.li`
  height: 2.5rem;
  padding: 10px;
  line-height: 1.25rem;
  font-size: 0.875rem;
  text-align: center;
  font-weight: 500;
  color: ${COLORS.gray850};
`;
