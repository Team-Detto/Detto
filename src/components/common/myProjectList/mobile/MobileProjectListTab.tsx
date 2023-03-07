import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { ProjectsTabProps } from '../ProjectsTab';
import { projectTabNames } from 'utils/positions';

const MobileProjectListTab = ({
  type,
  category,
  onTabClick,
}: ProjectsTabProps) => {
  return (
    <MobileProjectListTabContainer>
      {/* 공개프로필 탭 */}
      {type &&
        projectTabNames.map((tabname, index) => {
          if (index === 1 || index === 2) {
            return (
              <MobileTabBtn
                key={tabname.id}
                name={tabname.id}
                category={category}
                onClick={onTabClick}
              >
                {tabname.value.split(' ')[0]}
              </MobileTabBtn>
            );
          }
        })}

      {/* 마이페이지 탭 */}
      {!type &&
        projectTabNames.map((tabName) => (
          <MobileTabBtn
            key={tabName.id}
            name={tabName.id}
            category={category}
            onClick={onTabClick}
          >
            {tabName.value.split(' ')[0]}
          </MobileTabBtn>
        ))}
    </MobileProjectListTabContainer>
  );
};

export default MobileProjectListTab;

const MobileProjectListTabContainer = styled.div`
  max-width: 16.875rem;
  height: 1.625rem;
  background-color: ${COLORS.gray100};
  border-radius: 4px;
  margin: 1.875rem auto 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
`;

const MobileTabBtn = styled.span<{
  name: string;
  category: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 3.8rem;
  width: 100%;
  height: 100%;
  font-size: 0.75rem;
  padding: 0 0.5rem;

  background-color: ${({ category, name }) =>
    name === category ? COLORS.violetB300 : COLORS.gray100};
  color: ${({ category, name }) =>
    name === category ? COLORS.white : COLORS.gray750};
  font-weight: ${({ category, name }) => (name === category ? '700' : '400')};
  cursor: pointer;
`;
