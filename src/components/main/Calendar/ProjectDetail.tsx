import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { selectedProjectState } from '../../../recoil/atoms';
import { getDate } from 'utils/date';
import COLORS from 'assets/styles/colors';
import { getCurrentPathName, logEvent } from 'utils/amplitude';
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

  // TODO: 추천하는 프로젝트인지 확인 (user의 position과 일치하는지)

  return (
    <ProjectDetailWrap>
      <ProjectDetailContainer>
        <ProjectDetailSproutText>
          <ProjectDetailSproutTextSpan>
            🌱 함께할 팀원
          </ProjectDetailSproutTextSpan>
          을 구해요!
        </ProjectDetailSproutText>
        <ProjectDetailRow>
          <ProjectDetailLabel>프로젝트 이름</ProjectDetailLabel>
          <ProjectDetailText>{selectedProject.title}</ProjectDetailText>
        </ProjectDetailRow>
        <ProjectDetailRow>
          <ProjectDetailLabel>기간</ProjectDetailLabel>
          <ProjectDetailText>
            {getDate(selectedProject.startDate)} ~{' '}
            {getDate(selectedProject.endDate)}
          </ProjectDetailText>
        </ProjectDetailRow>
        <ProjectDetailRow>
          <ProjectDetailLabel>포지션</ProjectDetailLabel>
          <ProjectDetailText>{positionsNames.join(', ')}</ProjectDetailText>
        </ProjectDetailRow>
        <ProjectDetailRow>
          <ProjectDetailLabel>모집 마감일</ProjectDetailLabel>
          <ProjectDetailText>
            {getDate(selectedProject.deadline)}
          </ProjectDetailText>
        </ProjectDetailRow>
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
        <ProjectDetailButton
          onClick={() => {
            logEvent('Visit Page', {
              from: getCurrentPathName(),
              to: 'project_detail',
              name: 'calendar_apply',
            });
          }}
        >
          지원하러 가기
        </ProjectDetailButton>
      </Link>
    </ProjectDetailWrap>
  );
};

const ProjectDetailWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: cneter;
  padding: 16px 24px;

  width: 100%;
  height: 100%;
`;
const ProjectDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
`;
const ProjectDetailRow = styled.div`
  display: flex;
  flex-direction: row;

  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.25px;
`;
const ProjectDetailLabel = styled.div`
  color: #464646;
  font-weight: 400;
  margin-right: 1rem;
  box-sizing: border-box;
`;

const ProjectDetailText = styled.div`
  color: #464646;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  max-width: 17.5rem;
`;

const ProjectDetailSproutText = styled.div`
  display: flex;
  flex-direction: row;
  color: #464646;
  height: 21px;

  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
`;
const ProjectDetailSproutTextSpan = styled.p`
  color: #72b819;
  font-weight: 700;
`;
const ProjectDetailButton = styled.button`
  background-color: ${COLORS.violetA500};
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
  color: ${COLORS.white};
  transition: background-color 100ms ease-in-out;
  &:hover {
    background-color: ${COLORS.violetA400};
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

  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  color: ${COLORS.gray600};
`;
const ProjectDetailinquiryAttentionTextP = styled.p`
  font-weight: 700;
  font-size: 12px;
  line-height: 140%;
  color: ${COLORS.gray600};
  margin-left: 2px;
`;

export default ProjectDetail;
