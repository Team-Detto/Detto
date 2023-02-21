import { useFindProject, useIsMobile } from 'hooks';
import WebContainer from 'components/common/WebContainer';
import FindProjectHeader from 'components/findproject/FindProjectHeader';
import FindProjectList from 'components/findproject/FindProjectList';
import FindProjectMobileHeader from 'components/findproject/mobile/FindProjectMobileHeader';
import FindProjectMobileList from 'components/findproject/mobile/FindProjectMobileList';
import styled from '@emotion/styled';

const FindProjectPage = () => {
  const {
    projects,
    category,
    toggle,
    likedProjects,
    handleCategoryClick,
    handleToggleClick,
    handleNavigateToProjectDetail,
  } = useFindProject();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <FindProjectMobilePageContainer>
        <FindProjectMobileHeader
          toggle={toggle}
          category={category}
          onCategoryClickEvent={handleCategoryClick}
          onToggleClickEvent={handleToggleClick}
        />
        <FindProjectMobileList
          projects={projects}
          likedProjects={likedProjects}
          toggle={toggle}
          category={category}
          onNavigateToProjectDetailEvent={handleNavigateToProjectDetail}
        />
      </FindProjectMobilePageContainer>
    );
  }

  return (
    <FindProjectPageWrapper>
      <WebContainer>
        <FindProjectHeader
          toggle={toggle}
          category={category}
          onCategoryClickEvent={handleCategoryClick}
          onToggleClickEvent={handleToggleClick}
        />
        <FindProjectList
          projects={projects}
          likedProjects={likedProjects}
          toggle={toggle}
          category={category}
          onNavigateToProjectDetailEvent={handleNavigateToProjectDetail}
        />
      </WebContainer>
    </FindProjectPageWrapper>
  );
};

const FindProjectPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 10rem;
`;
const FindProjectMobilePageContainer = styled.div`
  max-width: 500px;
  min-width: 350px;
  height: 55.875rem;
`;

export default FindProjectPage;
