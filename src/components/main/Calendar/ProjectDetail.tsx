import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { selectedProjectState } from '../../../recoil/atoms';
import { getDate } from 'utils/date';
import COLORS from 'assets/styles/colors';

const ProjectDetail = () => {
  const selectedProject = useRecoilValue<any>(selectedProjectState);

  if (!selectedProject) return null;
  const positions = [
    { value: 'frontend', name: '프론트엔드' },
    { value: 'backend', name: '백엔드' },
    { value: 'designer', name: '디자이너' },
    { value: 'planner', name: '기획자' },
  ];

  const positionsKeys = Object.keys(selectedProject.positions);
  const positionsvalues = Object.values(selectedProject.positions);

  // const positionsNames = positionsKeys.map((key) => {
  //   const position = positions.find((position) => position.value === key);
  //   return position?.name + ',';
  // });
  // positionsKeys랑 positionsvalues값을 이용하여서 positionsvalues값이 0이 아닌것들만 배열로 만든다
  const positionsValues = positionsKeys.filter((key, index) => {
    return positionsvalues[index] !== 0;
  });
  // positionsValues값을 이용하여서 positions의 value값이랑 같은것을 name으로 배열로 만든다
  const positionsNames = positionsValues.map((value) => {
    const position = positions.find((position) => position.value === value);
    return position?.name + ',';
  });
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
          <div>{positionsNames.sort().join('').slice(0, -1)}</div>
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
  margin-top: 2.5rem;
  color: ${COLORS.white};
  transition: background-color 100ms ease-in-out;

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
  color: #98a2ae;
`;
const ProjectDetailinquiryAttentionTextP = styled.p`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 140%;
  color: #98a2ae;
  margin-left: 2px;
`;

export default ProjectDetail;
