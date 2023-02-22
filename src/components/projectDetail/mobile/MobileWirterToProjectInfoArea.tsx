import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useNavigate } from 'react-router-dom';
import { getDate } from 'utils/date';

const WriterToProjectInfoArea = ({ projectData, userData }: any) => {
  const {
    uid,
    positions,
    plannerStack,
    developerStack,
    designerStack,
    startDate,
    endDate,
  } = projectData;

  const navigate = useNavigate();

  return (
    <>
      <WriterToProjectInfoContainer>
        <WriterWrapper onClick={() => navigate(`/profile/${uid}`)}>
          <WriterProfileImg src={userData?.photoURL} />
          <WriterNickname>{userData?.displayName}</WriterNickname>
        </WriterWrapper>
        <ProjectInfoWrapper>
          <ProjectInfoObject>
            <ProjectInfoKey>모집 인원</ProjectInfoKey>
            <ProjectInfoValue>
              {`기획 ${positions['planner'] ?? `0`}명/ 프론트
              ${positions['frontend'] ?? `0`}명 / 백엔드
              ${positions['backend'] ?? `0`}명/ 디자인
              ${positions['designer'] ?? `0`}명`}
            </ProjectInfoValue>
          </ProjectInfoObject>
          <ProjectInfoObject>
            <Div>
              <ProjectInfoKey>프로젝트</ProjectInfoKey>
              <ProjectInfoKey>스택</ProjectInfoKey>
            </Div>
            <ProjectInfoStackWrap>
              <StackDiv>
                <StackTitle>기획</StackTitle>
                <StackList>
                  {plannerStack?.map((skill: string) => {
                    return <StackValue key={skill}>{skill}</StackValue>;
                  }) ?? '없음'}
                </StackList>
              </StackDiv>
              <StackDiv>
                <StackTitle>개발</StackTitle>
                <StackList>
                  {developerStack?.map((skill: string) => {
                    return <StackValue key={skill}>{skill}</StackValue>;
                  }) ?? '없음'}
                </StackList>
                {/* <UserStacks stacks={developerStack} version="mobile" /> */}
              </StackDiv>
              <StackDiv>
                <StackTitle>디자인</StackTitle>
                <StackList>
                  {designerStack?.map((skill: string) => {
                    return <StackValue key={skill}>{skill}</StackValue>;
                  }) ?? '없음'}
                </StackList>
              </StackDiv>
            </ProjectInfoStackWrap>
          </ProjectInfoObject>
          <ProjectInfoObject>
            <ProjectInfoKey>예상 기간</ProjectInfoKey>
            <ProjectInfoValue>
              {getDate(startDate)} - {getDate(endDate)}
            </ProjectInfoValue>
          </ProjectInfoObject>
        </ProjectInfoWrapper>
      </WriterToProjectInfoContainer>
    </>
  );
};

export default WriterToProjectInfoArea;

const WriterToProjectInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 13.75rem;
  background-color: ${COLORS.white};
  gap: 0.9375rem;
  margin: 1.25rem auto 2.5rem;
`;

const WriterWrapper = styled.div`
  display: flex;
  margin: 1rem 1.25rem 0 20px;
  height: 32px;
  align-items: center;
`;

const WriterProfileImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
`;

const WriterNickname = styled.div`
  height: 32px;
  font-size: 11px;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin-left: 6px;
`;

const ProjectInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 15px 18px 15px;
  height: 100%;
  gap: 8px;
`;

const ProjectInfoObject = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 8px;
`;

const ProjectInfoKey = styled.div`
  width: 68px;
  height: 28px;
  font-size: 12px;
  line-height: 28px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #383838;
`;

const ProjectInfoValue = styled.div`
  height: 28px;

  font-weight: 500;
  font-size: 13px;
  line-height: 28px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;

  color: #383838;
`;

const ProjectInfoStackWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  width: 282px;
  min-height: 104px;
`;

const StackDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const StackTitle = styled.div`
  min-width: 40px;
  height: 100%;
  font-size: 12px;
  display: flex;
  align-items: center;
`;
const Bumper = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.625rem;
  margin-left: 0.4rem;
`;

const StackValue = styled.div`
  background-color: ${COLORS.gray100};
  height: 26px;
  padding: 0 4px;
  border-radius: 12px;
  font-size: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Div = styled.div``;

const StackList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-left: 0.4rem;
`;
