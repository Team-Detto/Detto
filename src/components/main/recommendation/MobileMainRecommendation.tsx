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
    <div>
      <div>
        <MobileMainRecommendationTitle>
          이런 프로젝트는 어때요?
        </MobileMainRecommendationTitle>
        <MobileMainRecommendationButtonContainer>
          {tapType.map((position) => (
            <MobileMainRecommendationButton
              //   active={position.type === tap}
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
      </div>
      <Link to={'/findproject'}></Link>
    </div>
  );
};

const MobileMainRecommendationWrap = styled.div``;
const MobileMainRecommendationContainer = styled.div``;
// tilte tap area
const MobileMainRecommendationTitle = styled.div`
  width: 100%;
  height: 1.625rem;

  margin-top: 2.3125rem;
  margin-left: 1.25rem;

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
const MobileMainRecommendationButton = styled.button`
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 0.375rem;

  width: 3.1875rem;
  height: 3rem;

  /* border-bottom: 2px solid #5d50f0; */

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
`;
// content card area
const MobileMainRecommendationCardContainer = styled.div``;

export default MobileMainRecommendation;
