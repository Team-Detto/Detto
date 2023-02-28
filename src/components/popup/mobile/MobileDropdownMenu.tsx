import { Link } from 'react-router-dom';
import { useGlobalModal, useHeader, usePopup } from 'hooks';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { getCurrentPathName, logEvent } from 'utils/amplitude';

const MobileDropdownMenu = () => {
  const { openModal } = useGlobalModal();
  const { isLoggedIn, handleLogoutClick } = useHeader();
  const {
    popup: { isDropdownOpen },
    closePopup,
  } = usePopup();

  if (!isDropdownOpen) return null;

  return (
    <Backdrop onClick={closePopup}>
      <DropdownBox>
        <DropdownList>
          {!isLoggedIn && (
            <DropdownItem
              onClick={() => {
                openModal('login', 0);
                logEvent('Button Click', {
                  from: getCurrentPathName(),
                  to: 'none',
                  name: 'login',
                });
              }}
            >
              로그인
            </DropdownItem>
          )}
          {isLoggedIn && (
            <DropdownItem
              onClick={() => {
                handleLogoutClick();
                logEvent('Button Click', {
                  from: getCurrentPathName(),
                  to: 'none',
                  name: 'logout',
                });
              }}
            >
              로그아웃
            </DropdownItem>
          )}
          <DropdownItem>
            <Link
              to={'/findproject'}
              onClick={() => {
                logEvent('Button Click', {
                  from: getCurrentPathName(),
                  to: 'findproject',
                  name: 'find_project',
                });
              }}
            >
              팀원찾기
            </Link>
          </DropdownItem>
          <DropdownItem onClick={() => !isLoggedIn && openModal('login', 0)}>
            {isLoggedIn ? (
              <Link
                to={'/project/write'}
                onClick={() => {
                  logEvent('Button Click', {
                    from: getCurrentPathName(),
                    to: 'project_wrtie',
                    name: 'write_project',
                  });
                }}
              >
                새 글 쓰기
              </Link>
            ) : (
              '새 글 쓰기'
            )}
          </DropdownItem>
          {isLoggedIn && (
            <DropdownItem>
              <Link
                to={'/mypage'}
                onClick={() => {
                  logEvent('Button Click', {
                    from: getCurrentPathName(),
                    to: 'mypage',
                    name: 'mypage',
                  });
                }}
              >
                마이페이지
              </Link>
            </DropdownItem>
          )}
        </DropdownList>
      </DropdownBox>
    </Backdrop>
  );
};

export default MobileDropdownMenu;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const DropdownBox = styled.div`
  position: absolute;
  top: 2.8rem;
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
