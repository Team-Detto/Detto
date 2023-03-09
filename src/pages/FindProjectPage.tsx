import { Helmet } from 'react-helmet-async';
import { useFindProject, useIsMobile } from 'hooks';
import WebContainer from 'components/common/WebContainer';
import FindProjectHeader from 'components/findproject/FindProjectHeader';
import FindProjectList from 'components/findproject/FindProjectList';
import FindProjectMobileHeader from 'components/findproject/mobile/FindProjectMobileHeader';
import FindProjectMobileList from 'components/findproject/mobile/FindProjectMobileList';
import styled from '@emotion/styled';

const FindProjectPage = () => {
  const {
    toggle,
    projects,
    category,
    likedProjects,
    handleToggleClick,
    handleCategoryClick,
    handleNavigateToProjectDetail,
  } = useFindProject();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        <Helmet>
          <title>{`프로젝트 찾기 - Detto`}</title>
        </Helmet>
        <FindProjectMobilePageContainer>
          <FindProjectMobileHeader
            toggle={toggle}
            category={category}
            onToggleClickEvent={handleToggleClick}
            onCategoryClickEvent={handleCategoryClick}
          />
          <FindProjectMobileList
            toggle={toggle}
            category={category}
            projects={projects}
            likedProjects={likedProjects}
            onNavigateToProjectDetailEvent={handleNavigateToProjectDetail}
          />
        </FindProjectMobilePageContainer>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`프로젝트 찾기 - Detto`}</title>
      </Helmet>
      <FindProjectPageWrapper>
        <WebContainer>
          <FindProjectHeader
            toggle={toggle}
            category={category}
            onToggleClickEvent={handleToggleClick}
            onCategoryClickEvent={handleCategoryClick}
          />
          <FindProjectList
            toggle={toggle}
            category={category}
            projects={projects}
            likedProjects={likedProjects}
            onNavigateToProjectDetailEvent={handleNavigateToProjectDetail}
          />
        </WebContainer>
      </FindProjectPageWrapper>
    </>
  );
};

const FindProjectPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 10rem;
`;

const FindProjectMobilePageContainer = styled.div`
  width: 100%;
  height: 55.875rem;
`;

export default FindProjectPage;
