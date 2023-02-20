import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { GrMail } from 'react-icons/gr';
import { FiChevronLeft } from 'react-icons/fi';
import { IoNotifications, IoMenu } from 'react-icons/io5';
import { useGlobalModal, useHeader, usePopup } from 'hooks';
import { LogoBoxH1 } from './Header';
import COLORS from 'assets/styles/colors';
import { useEffect } from 'react';

const MobileHeader = () => {
  const {
    isMain,
    isLoggedIn,
    showDropwdown,
    handleDropdownClick,
    handleLogoutClick,
    handleGoBackClick,
    closeDropdownMenu,
  } = useHeader();
  const { openModal } = useGlobalModal();
  const { closePopup } = usePopup();

  // 페이지 이동 시 팝업 / 드롭다운 메뉴 닫기
  useEffect(() => {
    closePopup();
    closeDropdownMenu();
  }, [location.pathname]);

  return (
    <MobileHeaderContainer>
      <MobileHeaderWrapper>
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
              <MobileMenuItem>
                {/* 쪽지 */}
                <CountBox>
                  <MobileNoteIcon />
                  <MobileCount>12</MobileCount>
                </CountBox>
              </MobileMenuItem>
              <MobileMenuItem>
                {/* 알림 */}
                <CountBox>
                  <MobileNotificationIcon />
                  <MobileCount>1</MobileCount>
                </CountBox>
              </MobileMenuItem>
            </>
          ) : (
            ''
          )}
          <MobileMenuItem onClick={handleDropdownClick}>
            <MobileMenuIcon />
            {/* 메뉴 */}
          </MobileMenuItem>
        </MobileMenuList>
      </MobileHeaderWrapper>

      {/* 드롭다운 메뉴 */}
      {showDropwdown && (
        <DropdownBox>
          <DropdownList>
            {!isLoggedIn && (
              <DropdownItem onClick={() => openModal('login', 0)}>
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
                <Link to={'/mypage'}>마이페이지</Link>
              </DropdownItem>
            )}
          </DropdownList>
        </DropdownBox>
      )}
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

  &:hover {
    color: ${COLORS.violetB500};
  }
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
  right: -0.75rem;
  width: 1.375rem;
  height: 1.125rem;
  background-color: ${COLORS.violetB500};
  border-radius: 4px;

  font-size: 0.75rem;
  color: ${COLORS.white};
  font-weight: 900;
`;
