import styled from '@emotion/styled';
import ContantCard from 'components/ContentCard';
import { useFindProject } from 'hooks';
import { useState } from 'react';

const MainRecommendation = () => {
  const { projects, handleNavigateToProjectDetail } = useFindProject();
  const tapType = [
    { type: 'inquiry', name: '조회순' },
    { type: 'attention', name: '관심순' },
  ];
  const [tap, setTap] = useState('조회순');
  return (
    <MainRecommendationWrap>
      <MainRecommendationContainer>
        <MainRecommendationTitle>
          이런 프로젝트는 어때요?
        </MainRecommendationTitle>
        <MainRecommendationButtonContainer>
          {tapType.map((position) => {
            return (
              <MainRecommendationButton
                key={position.type}
                name={position.name}
                value={tap}
                onClick={() => setTap(position.name)}
              >
                {position.name}
              </MainRecommendationButton>
            );
          })}
        </MainRecommendationButtonContainer>
        <MainRecommendationCardContainer>
          {projects.map(
            (project, index) =>
              index < 3 && (
                <ContantCard
                  key={project.id}
                  project={project}
                  onNavigateToProjectDetailEvent={handleNavigateToProjectDetail}
                />
              ),
          )}
        </MainRecommendationCardContainer>
      </MainRecommendationContainer>
      <MainRecommendationCardButton>전체 보기</MainRecommendationCardButton>
    </MainRecommendationWrap>
  );
};
const MainRecommendationWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 75px;

  width: 1180px;
  height: 755px;

  margin: 192.5px auto 190px auto;
`;
const MainRecommendationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 45px;

  width: 1180px;
  height: 632px;
`;
const MainRecommendationTitle = styled.div`
  width: 326px;
  height: 44px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 44px;

  color: #4e5968;
`;
const MainRecommendationButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 19px;

  width: 301px;
  height: 48px;
`;
const MainRecommendationButton = styled.button`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 48px;
  gap: 10px;

  width: 150px;
  height: 48px;

  background: ${(props: { name: string; value: string }) =>
    props.name === props.value ? '#5d50f0' : '#ffffff'};
  color: ${(props: { name: string; value: string }) =>
    props.name === props.value ? '#ffffff' : '#4e5968'};
  border-radius: 36px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;

  &:hover {
    width: 150px;
    height: 48px;

    /* violet B 400 */

    background: #5d50f0;
    border-radius: 36px;
    color: #ffffff;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 32px;
  }
`;
const MainRecommendationCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;

  width: 1180px;
  height: 450px;
`;
const MainRecommendationCardButton = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 60px;
  gap: 10px;

  width: 187px;
  height: 48px;

  border: 1px solid #e1e5eb;
  border-radius: 24px;
  color: #8b95a1;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
`;

export default MainRecommendation;
