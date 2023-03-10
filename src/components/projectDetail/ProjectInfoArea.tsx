import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { DocumentData } from 'firebase/firestore';
import { getDate } from 'utils/date';
import { positionList } from 'utils/positions';

const ProjectInfoArea = ({ projectData }: DocumentData) => {
  const {
    positions,
    developerStack,
    designerStack,
    plannerStack,
    startDate,
    endDate,
    deadline,
  } = projectData;

  return (
    <ProjectInfoWrapper>
      <ProjectInfoObject>
        <ProjectInfoKey>모집 인원</ProjectInfoKey>
        <ProjectInfoValue>
          {Object.keys(positions).map((key: string, idx: number) => {
            if (positions[positionList[idx].type] !== 0) {
              return (
                <Position key={key}>
                  {positionList[idx].name}
                  <Emphasis>{positions[positionList[idx].type]}</Emphasis>명
                </Position>
              );
            }
          })}
        </ProjectInfoValue>
      </ProjectInfoObject>
      <ProjectStackContainer>
        <Div>
          <ProjectStackKey>필요 스택</ProjectStackKey>
        </Div>
        <ProjectInfoStackWrap>
          {plannerStack?.length === 0 ? null : (
            <StackDiv>
              <StackTitle>기획</StackTitle>
              <StackList>
                {plannerStack?.map((skill: string) => {
                  return (
                    <ProjectStackItem key={`${skill}`}>
                      <SkillIcon
                        src={require(`../../assets/images/icon_skills/icon_skill_${skill.toLowerCase()}.jpg`)}
                        alt={skill}
                      />
                      <StackValue>{skill}</StackValue>
                    </ProjectStackItem>
                  );
                })}
              </StackList>
            </StackDiv>
          )}

          {designerStack?.length === 0 ? null : (
            <StackDiv>
              <StackTitle>디자인</StackTitle>
              <StackList>
                {designerStack?.map((skill: string) => {
                  return (
                    <ProjectStackItem key={`${skill}`}>
                      <SkillIcon
                        src={require(`../../assets/images/icon_skills/icon_skill_${skill.toLowerCase()}.jpg`)}
                        alt={skill}
                      />
                      <StackValue>{skill}</StackValue>
                    </ProjectStackItem>
                  );
                })}
              </StackList>
            </StackDiv>
          )}
          {developerStack?.length === 0 ? null : (
            <StackDiv>
              <StackTitle>개발</StackTitle>
              <StackList>
                {developerStack?.map((skill: string) => {
                  return (
                    <ProjectStackItem key={`${skill}`}>
                      <SkillIcon
                        src={require(`../../assets/images/icon_skills/icon_skill_${skill.toLowerCase()}.jpg`)}
                        alt={skill}
                      />
                      <StackValue>{skill}</StackValue>
                    </ProjectStackItem>
                  );
                })}
              </StackList>
            </StackDiv>
          )}
        </ProjectInfoStackWrap>
      </ProjectStackContainer>
      <ProjectInfoObject>
        <ProjectInfoKey>예상기간</ProjectInfoKey>
        <ProjectInfoValue>
          {getDate(startDate)} - {getDate(endDate)}
        </ProjectInfoValue>
      </ProjectInfoObject>
      <ProjectInfoObject>
        <ProjectInfoKey>모집 마감일</ProjectInfoKey>
        <ProjectInfoValue>{getDate(deadline)}</ProjectInfoValue>
      </ProjectInfoObject>
    </ProjectInfoWrapper>
  );
};

export default ProjectInfoArea;

const ProjectInfoWrapper = styled.div`
  width: 63.625rem;
  min-height: 12.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
`;

const ProjectInfoObject = styled.div`
  display: flex;
  align-items: center;
  gap: 2.8125rem;
`;

const ProjectStackContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 2.8125rem;
`;

const ProjectInfoStackWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
`;

const ProjectInfoKey = styled.div`
  width: 8.125rem;
  color: #383838;
`;

const ProjectInfoValue = styled.div`
  font-size: 1.125rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 2.5rem;
`;

const Position = styled.span`
  height: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin: 0 1.3rem 0 0;

  &::after {
    content: '|';
    position: absolute;
    margin: 0 0.5rem;
    right: -1.3rem;
    top: -0.2rem;
  }

  &:last-child::after {
    display: none;
  }
`;

const Emphasis = styled.span`
  color: ${COLORS.violetB500};
  font-weight: 700;
  margin: 0 0.5rem;
`;

const ProjectStackKey = styled.div`
  width: 8.125rem;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #383838;
`;

const StackDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.625rem;
  width: 100%;
  min-height: 2.8rem;
  height: 100%;
`;

const StackList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin: 0.4rem;
`;

const StackTitle = styled.div`
  min-width: 4.0625rem;
  font-size: 1.125rem;
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.125rem;
  color: #383838;
`;

const ProjectStackItem = styled.li`
  display: flex;
  align-items: center;
  height: 2rem;
  padding: 0 0.5rem;

  background-color: ${COLORS.gray100};
  border-radius: 2rem;
  font-size: 0.75rem;
  color: ${COLORS.black};
  cursor: default;
`;

export const SkillIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  object-fit: cover;
  display: block;
  border-radius: 50%;
`;

const StackValue = styled.div`
  background-color: ${COLORS.gray100};
  height: 2rem;
  padding: 0 0.5rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
