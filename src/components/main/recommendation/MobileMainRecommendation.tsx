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
import MobileContentCard from 'components/MobileContentCard';

const tapType = [
  { type: 'orderByViews', name: '조회순' },
  { type: 'orderByLikes', name: '관심순' },
];
const MobileMainRecommendation = () => {
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
  if (!mostViewedProjects || !mostLikedProjects) return null;

  return (
    <MobileMainRecommendationWrap>
      <MobileMainRecommendationContainer>
        <MobileMainRecommendationTitle>
          이런 프로젝트는 어때요?
        </MobileMainRecommendationTitle>
        <MobileMainRecommendationButtonContainer>
          {tapType.map((position) => (
            <MobileMainRecommendationButton
              active={position.type === tap}
              key={position.type}
              name={position.type}
              value={tap}
              onClick={() => setTap(position.type)}
            >
              {position.name}
            </MobileMainRecommendationButton>
          ))}
        </MobileMainRecommendationButtonContainer>
        <MobileMainRecommendationCardContainer>
          {tap === 'orderByViews' &&
            mostViewedProjects.map((project: any) => (
              <MobileContentCard
                key={project.id}
                project={project}
                likedProjects={likedProjects}
                onNavigateToProjectDetailEvent={handleNavigateToProjectDetail}
              />
            ))}
          {tap === 'orderByLikes' &&
            mostLikedProjects.map((project: any) => (
              <MobileContentCard
                key={project.id}
                project={project}
                likedProjects={likedProjects}
                onNavigateToProjectDetailEvent={handleNavigateToProjectDetail}
              />
            ))}
        </MobileMainRecommendationCardContainer>
      </MobileMainRecommendationContainer>
      <Link to={'/findproject'}>
        <MobileMainRecommendationCardButton>
          더 보기
        </MobileMainRecommendationCardButton>
      </Link>
    </MobileMainRecommendationWrap>
  );
};

const MobileMainRecommendationWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 27.0625rem;
  padding: 0rem;
  margin-top: 2.3125rem;
`;
const MobileMainRecommendationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const MobileMainRecommendationTitle = styled.div`
  width: 14.375rem;
  height: 1.625rem;
  padding: 0;
  margin-left: 1.3125rem;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 1.375rem;
  line-height: 1.625rem;
  color: #191f28;
`;
const MobileMainRecommendationButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 1.25rem;
  gap: 1rem;
  width: 100%;
  height: 3rem;
  border-bottom: 1px solid #f2f4f6;
`;
const MobileMainRecommendationButton = styled.button<{ active: boolean }>`
  width: 3.1875rem;
  height: 3rem;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 24px;
  color: ${(props) => (props.active ? COLORS.violetB300 : `#909599`)};
  border-bottom: ${(props) =>
    props.active ? `1px solid ${COLORS.violetB300}` : `none`};
`;
const MobileMainRecommendationCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.625rem;
  width: 100%;
`;
const MobileMainRecommendationCardButton = styled.button`
  width: 100%;
  height: 1.8125rem;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 900;
  font-size: 10px;
  line-height: 140%;
  text-align: center;
  color: #6b7684;
`;

export default MobileMainRecommendation;
