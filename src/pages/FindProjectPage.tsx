import { useFindProject } from 'hooks';
import WebContainer from 'components/common/WebContainer';
import FindProjectHeader from 'components/findproject/FindProjectHeader';
import FindProjectList from 'components/findproject/FindProjectList';
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

export default FindProjectPage;
