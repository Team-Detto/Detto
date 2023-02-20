import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { selectedProjectState } from '../../../recoil/atoms';
import { getDate } from 'utils/date';
import COLORS from 'assets/styles/colors';

const positions: any = {
  frontend: '프론트엔드',
  backend: '백엔드',
  designer: '디자인',
  planner: '기획',
};

const ProjectDetail = () => {
  const selectedProject = useRecoilValue<any>(selectedProjectState);
  if (!selectedProject) return null;

  // 포지션 이름 배열
  const positionsNames = [];
  for (const [key, value] of Object.entries(selectedProject.positions)) {
    if (value !== 0) {
      positionsNames.push(positions[key]);
    }
  }

  return (
    <ProjectDetailWrap>
      <div key={selectedProject}>
        <ProjectDetailContainer>
          <ProjectDetailSproutTextDiv>
            🌱 함께할 팀원
            <ProjectDetailSproutTextP>을 구해요!</ProjectDetailSproutTextP>
          </ProjectDetailSproutTextDiv>
        </ProjectDetailContainer>
        <ProjectDetailContainer>
          <ProjectDetailTextAreaDiv>프로젝트 이름</ProjectDetailTextAreaDiv>
          <div>{selectedProject.title}</div>
        </ProjectDetailContainer>
        <ProjectDetailContainer>
          <ProjectDetailTextAreaDiv>기간</ProjectDetailTextAreaDiv>
          <div>
            {getDate(selectedProject.startDate)} ~{' '}
            {getDate(selectedProject.endDate)}
          </div>
        </ProjectDetailContainer>
        <ProjectDetailContainer>
          <ProjectDetailTextAreaDiv>포지션</ProjectDetailTextAreaDiv>
          <div>{positionsNames.join(', ')}</div>
        </ProjectDetailContainer>
        <ProjectDetailContainer>
          <ProjectDetailTextAreaDiv>모집 마감일</ProjectDetailTextAreaDiv>
          <div>{getDate(selectedProject.deadline)}</div>
        </ProjectDetailContainer>
        <ProjectDetailContainer>
          <ProjectDetailinquiryAttentionBox>
            <ProjectDetailinquiryAttentionTextBox>
              조회수
              <ProjectDetailinquiryAttentionTextP>
                {selectedProject?.view}
              </ProjectDetailinquiryAttentionTextP>
            </ProjectDetailinquiryAttentionTextBox>
            <ProjectDetailinquiryAttentionTextBox>
              관심
              <ProjectDetailinquiryAttentionTextP>
                {selectedProject?.like}
              </ProjectDetailinquiryAttentionTextP>
            </ProjectDetailinquiryAttentionTextBox>
          </ProjectDetailinquiryAttentionBox>
        </ProjectDetailContainer>

        <Link to={`/project/${selectedProject.id}`}>
          <ProjectDetailButton>지원하러 가기</ProjectDetailButton>
        </Link>
      </div>
    </ProjectDetailWrap>
  );
};

const ProjectDetailWrap = styled.div`
  width: 18.75rem;
  height: 12.125rem;
  margin: 1rem auto 0 auto;
`;
const ProjectDetailContainer = styled.div`
  display: flex;
  direction: row;
  margin-bottom: 1.1rem;
`;
const ProjectDetailSproutTextP = styled.p`
  color: #464646;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
`;
const ProjectDetailTextAreaDiv = styled.div`
  color: #464646;
  font-size: 1rem;
  margin-right: 1rem;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
`;
const ProjectDetailSproutTextDiv = styled.div`
  display: flex;
  flex-direction: row;
  color: #72b819;
  width: 300px;
  height: 21px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 150%;
`;
const ProjectDetailButton = styled.button`
  background-color: ${COLORS.violetB400};
  width: 18.75rem;
  height: 3rem;
  border-radius: 0.5rem;
  color: ${COLORS.white};
  transition: background-color 100ms ease-in-out;
  position: absolute;
  right: 39px;
  bottom: 1960px;
  &:hover {
    background-color: ${COLORS.violetB300};
  }
`;
const ProjectDetailinquiryAttentionBox = styled.div`
  width: 35%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ProjectDetailinquiryAttentionTextBox = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  color: ${COLORS.gray600};
`;
const ProjectDetailinquiryAttentionTextP = styled.p`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 140%;
  color: ${COLORS.gray600};
  margin-left: 2px;
`;

export default ProjectDetail;
