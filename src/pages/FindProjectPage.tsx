import { useEffect, useState } from 'react';
import { firebaseGetProjectDataRequest } from 'apis/boardService';
import WebContainer from 'components/common/WebContainer';
import FindProjectHeader from 'components/findproject/FindProjectHeader';
import FindProjectList from 'components/findproject/FindProjectList';
import styled from '@emotion/styled';

const FindProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState('기획');
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    firebaseGetProjectDataRequest(setProjects);
  }, []);

  const handleCategoryClick = (e: any) => {
    setCategory(e.target.name);
  };

  const handleToggleClick = () => {
    setToggle((prev) => !prev);
  };

  return (
    <FindProjectPageWrapper>
      <WebContainer>
        <FindProjectHeader
          category={category}
          toggle={toggle}
          onCategoryClickEvent={handleCategoryClick}
          onToggleClickEvent={handleToggleClick}
        />
        <FindProjectList projects={projects} />
      </WebContainer>
    </FindProjectPageWrapper>
  );
};

const FindProjectPageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default FindProjectPage;
