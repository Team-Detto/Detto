import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFindProject, useIsMobile } from 'hooks';
import WebContainer from 'components/common/WebContainer';
import FindProjectHeader from 'components/findproject/FindProjectHeader';
import FindProjectList from 'components/findproject/FindProjectList';
import FindProjectMobileHeader from 'components/findproject/mobile/FindProjectMobileHeader';
import FindProjectMobileList from 'components/findproject/mobile/FindProjectMobileList';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import mobilesecondBanner from 'assets/images/mobilesecondBanner.png';

const FindProjectPage = () => {
  const {
    projects,
    category,
    toggle,
    likedProjects,
    setCategory,
    handleCategoryClick,
    handleToggleClick,
    handleNavigateToProjectDetail,
  } = useFindProject();
  const isMobile = useIsMobile();
  const { state: categoryFromFooter } = useLocation();

  // 푸터에서 클릭한 경우 카테고리 지정
  useEffect(() => {
    if (categoryFromFooter !== null) {
      setCategory(categoryFromFooter);
    }
  }, [categoryFromFooter]);

  if (isMobile) {
    return (
      <>
        <Helmet>
          <title>{`팀원찾기 - Detto`}</title>

          <meta
            name="description"
            content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
          />

          <meta property="og:type" content="website" />
          <meta property="og:title" content={`팀원찾기 - Detto`} />
          <meta property="og:site_name" content="Detto" />
          <meta
            property="og:description"
            content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
          />
          <meta property="og:image" content={mobilesecondBanner} />
          <meta property="og:url" content={window.location.href} />

          <meta name="twitter:title" content={`팀원찾기 - Detto`} />
          <meta
            name="twitter:description"
            content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
          />
          <meta name="twitter:image" content={mobilesecondBanner} />

          <link rel="canonical" href={window.location.href} />
        </Helmet>
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
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`팀원찾기 - Detto`}</title>

        <meta
          name="description"
          content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={`팀원찾기 - Detto`} />
        <meta property="og:site_name" content="Detto" />
        <meta
          property="og:description"
          content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
        />
        <meta property="og:image" content={mobilesecondBanner} />
        <meta property="og:url" content={window.location.href} />

        <meta name="twitter:title" content={`팀원찾기 - Detto`} />
        <meta
          name="twitter:description"
          content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
        />
        <meta name="twitter:image" content={mobilesecondBanner} />

        <link rel="canonical" href={window.location.href} />
      </Helmet>
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
    </>
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
