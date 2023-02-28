import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useNavigate } from 'react-router-dom';
import { logEvent } from 'utils/amplitude';
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
        <WriterWrapper
          onClick={() => {
            navigate(`/profile/${uid}`);
            logEvent('Button Click', {
              from: `project_detail`, //pathname으로 하면 이동한페이지로 인식해서 수정
              to: 'profile',
              name: 'profile',
            });
          }}
        >
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
  margin: 1rem 1.25rem 0 1.25rem;
  height: 2rem;
  align-items: center;
`;

const WriterProfileImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
`;

const WriterNickname = styled.div`
  height: 2rem;
  font-size: 0.6875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin-left: 0.375rem;
`;

const ProjectInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.9375rem 1.125rem 0.9375rem;
  height: 100%;
  gap: 0.5rem;
`;

const ProjectInfoObject = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 0.5rem;
`;

const ProjectInfoKey = styled.div`
  width: 4.25rem;
  height: 1.75rem;
  font-size: 0.75rem;
  line-height: 1.75rem;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #383838;
`;

const ProjectInfoValue = styled.div`
  height: 1.75rem;

  font-weight: 500;
  font-size: 0.8125rem;
  line-height: 1.75rem;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;

  color: #383838;
`;

const ProjectInfoStackWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  gap: 0.625rem;

  width: 100%;
  min-height: 6.5rem;
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
  min-width: 2.5rem;
  height: 100%;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
`;

const StackValue = styled.div`
  background-color: ${COLORS.gray100};
  height: 1.625rem;
  padding: 0 0.25rem;
  border-radius: 0.75rem;
  font-size: 0.625rem;
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
