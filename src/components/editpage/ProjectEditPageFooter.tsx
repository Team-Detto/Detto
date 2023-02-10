import styled from '@emotion/styled';

const ProjectEditPageFooter = () => {
  return (
    <FooterContainer>
      <FooterEditBox name="content" />
      <FooterCompleatedButton>수정 완료</FooterCompleatedButton>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  width: 100%;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const FooterEditBox = styled.textarea`
  width: 73.75rem;
  height: 68.1875rem;
  border: 0.0625rem solid #ced3db;
`;
const FooterCompleatedButton = styled.button`
  width: 29.375rem;
  height: 5.5rem;
  background: #6f64f2;
  color: #ffffff;
  border-radius: 2.25rem;
  margin-top: 4rem;
`;

export default ProjectEditPageFooter;
