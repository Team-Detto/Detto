import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import ContentCard from 'components/ContentCard';
import { useFindProject } from 'hooks';
import { useState } from 'react';
import COLORS from 'assets/styles/colors';
import { useQuery } from '@tanstack/react-query';
import { staleTime } from 'utils/staleTime';
import {
  firebaseMostLikedProjectsRequest,
  firebaseMostViewedProjectsRequest,
} from 'apis/getPost';
import { getCurrentPathName, logEvent } from 'utils/amplitude';

const tapType = [
  { type: 'orderByViews', name: '조회순' },
  { type: 'orderByLikes', name: '관심순' },
];

const MainRecommendation = () => {
  const [tap, setTap] = useState(tapType[0].type);
  const { handleNavigateToProjectDetail, likedProjects } = useFindProject();

  const { data: mostViewedProjects }: any = useQuery({
    queryKey: ['post', 'mostViewed'],
    queryFn: firebaseMostViewedProjectsRequest,
    staleTime: staleTime.mostViewedPosts,
  });

  const { data: mostLikedProjects }: any = useQuery({
    queryKey: ['post', 'mostLiked'],
    queryFn: firebaseMostLikedProjectsRequest,
    staleTime: staleTime.mostLikedPosts,
  });

  return (
    <MainRecommendationWrap>
      <MainRecommendationContainer>
        <MainRecommendationTitle>
          이런 프로젝트는 어때요?
        </MainRecommendationTitle>
        <MainRecommendationButtonContainer>
          {tapType.map((position) => (
            <MainRecommendationButton
              active={position.type === tap}
              key={position.type}
              name={position.type}
              value={tap}
              onClick={() => setTap(position.type)}
            >
              {position.name}
            </MainRecommendationButton>
          ))}
        </MainRecommendationButtonContainer>
        <MainRecommendationCardContainer>
          {tap === 'orderByViews' &&
            (mostViewedProjects?.length !== 0 ? (
              mostViewedProjects?.map((project: any) => (
                <ContentCard
                  key={project.id}
                  project={project}
                  likedProjects={likedProjects}
                  onNavigateToProjectDetailEvent={handleNavigateToProjectDetail}
                />
              ))
            ) : (
              <NoDataMessage>프로젝트를 찾을 수 없어요 :/</NoDataMessage>
            ))}
          {tap === 'orderByLikes' &&
            (mostLikedProjects?.length !== 0 ? (
              mostLikedProjects?.map((project: any) => (
                <ContentCard
                  key={project.id}
                  project={project}
                  likedProjects={likedProjects}
                  onNavigateToProjectDetailEvent={handleNavigateToProjectDetail}
                />
              ))
            ) : (
              <NoDataMessage>프로젝트를 찾을 수 없어요 :/</NoDataMessage>
            ))}
        </MainRecommendationCardContainer>
      </MainRecommendationContainer>
      <Link
        onClick={() => {
          logEvent('Button Click', {
            from: getCurrentPathName(),
            to: 'findproject',
            name: 'find_project',
          });
        }}
        to={'/findproject'}
      >
        <MainRecommendationCardButton>전체 보기</MainRecommendationCardButton>
      </Link>
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
  margin: 108px auto 190px auto;
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

  font-weight: 700;
  font-size: 32px;
  line-height: 44px;
  color: ${COLORS.gray800};
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

const MainRecommendationButton = styled.button<{ active: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 48px;
  gap: 10px;
  width: 150px;
  height: 48px;

  font-weight: ${(props) => (props.active ? '700' : '400')};
  font-size: 16px;
  line-height: 32px;

  color: ${(props) => (props.active ? COLORS.white : COLORS.black)};
  background-color: ${(props) =>
    props.active ? COLORS.violetB400 : COLORS.gray50};
  border-radius: 36px;

  &:hover {
    background-color: ${(props) =>
      props.active ? COLORS.violetB300 : COLORS.gray100};
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 60px;
  gap: 10px;

  border: 1px solid ${COLORS.gray200};
  border-radius: 24px;

  font-size: 18px;
  line-height: 32px;

  color: ${COLORS.gray700};

  &:hover {
    background-color: ${COLORS.gray50};
  }
`;
const NoDataMessage = styled.div`
  height: 100%;
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${COLORS.gray500};
`;

export default MainRecommendation;
