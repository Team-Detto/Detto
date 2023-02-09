import styled from '@emotion/styled';
import ContantCard from 'components/ContentCard';

const MainRecommendation = () => {
  return (
    <MainRecommendationWrap>
      <MainRecommendationContainer>
        <MainRecommendationTitle>
          이런 프로젝트는 어때요?
        </MainRecommendationTitle>
        <MainRecommendationButtonContainer>
          <MainRecommendationButton>기획</MainRecommendationButton>
          <MainRecommendationButton>디자인</MainRecommendationButton>
          <MainRecommendationButton>프론트</MainRecommendationButton>
          <MainRecommendationButton>백엔드</MainRecommendationButton>
        </MainRecommendationButtonContainer>
        <MainRecommendationCardContainer>
          <ContantCard />
          <ContantCard />
          <ContantCard />
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

  width: 625px;
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

  background: #fafafb;
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

    background: #6f64f2;
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
