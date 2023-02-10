import styled from '@emotion/styled';

const ProjectEditPageHeader = () => {
  return (
    <HeaderContainer>
      <HeaderInput placeholder="제목입니다." name="title" />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
`;
const HeaderInput = styled.input`
  width: 99%;
  height: 2.8125rem;
  border: 1px solid #ced3db;
  border-radius: 4px;
  background: #ffffff;
  padding-left: 1rem;
`;

export default ProjectEditPageHeader;
