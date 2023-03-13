import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
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
import { getCurrentPathName, logEvent } from 'utils/amplitude';
import { DocumentData } from 'firebase/firestore';

const tapType = [
  { type: 'orderByViews', name: '조회순' },
  { type: 'orderByLikes', name: '관심순' },
];
const MobileMainRecommendation = () => {
  const [tap, setTap] = useState(tapType[0].type);
  const { handleNavigateToProjectDetail, likedProjects } = useFindProject();

  const { data: mostViewedProjects }: DocumentData = useQuery({
    queryKey: ['post', 'mostViewed'],
    queryFn: firebaseMostViewedProjectsRequest,
    staleTime: staleTime.mostViewedPosts,
  });

  const { data: mostLikedProjects }: DocumentData = useQuery({
    queryKey: ['post', 'mostLiked'],
    queryFn: firebaseMostLikedProjectsRequest,
    staleTime: staleTime.mostLikedPosts,
  });

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
            (mostViewedProjects?.length !== 0 ? (
              mostViewedProjects?.map((project: any) => (
                <MobileContentCard
                  key={project.id}
                  project={project}
                  likedProjects={likedProjects}
                  onNavigateToProjectDetailEvent={handleNavigateToProjectDetail}
                />
              ))
            ) : (
              <MobileNoDataMessage>
                프로젝트를 찾을 수 없어요 :/
              </MobileNoDataMessage>
            ))}
          {tap === 'orderByLikes' &&
            (mostLikedProjects?.length !== 0 ? (
              mostLikedProjects?.map((project: any) => (
                <MobileContentCard
                  key={project.id}
                  project={project}
                  likedProjects={likedProjects}
                  onNavigateToProjectDetailEvent={handleNavigateToProjectDetail}
                />
              ))
            ) : (
              <MobileNoDataMessage>
                프로젝트를 찾을 수 없어요 :/
              </MobileNoDataMessage>
            ))}
        </MobileMainRecommendationCardContainer>
      </MobileMainRecommendationContainer>
      <MobileMainRecommendationCardButton
        onClick={() => {
          logEvent('Button Click', {
            from: getCurrentPathName(),
            to: 'findproject',
            name: 'find_project',
          });
        }}
        to={'/findproject'}
      >
        더 보기
      </MobileMainRecommendationCardButton>
    </MobileMainRecommendationWrap>
  );
};

const MobileMainRecommendationWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0rem;
  margin-top: 2.5rem;
  margin-bottom: 2.4rem;
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
  font-weight: 700;
  font-size: 1.375rem;
  line-height: 1.625rem;
  color: #191f28;
`;
const MobileMainRecommendationButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
  height: 3rem;
  border-bottom: 1px solid #f2f4f6;
`;
const MobileMainRecommendationButton = styled.button<{ active: boolean }>`
  width: 3.1875rem;
  height: 3rem;
  font-weight: 500;
  font-size: 15px;
  line-height: 24px;
  color: ${(props) => (props.active ? COLORS.violetB300 : `#909599`)};
  border-bottom: ${(props) =>
    props.active ? `2px solid ${COLORS.violetB300}` : `none`};
`;
const MobileMainRecommendationCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.625rem;
  width: 100%;
`;
const MobileMainRecommendationCardButton = styled(Link)`
  width: 80px;
  padding: 0.5rem 0;
  font-weight: 500;
  font-size: 11px;
  text-align: center;
  color: ${COLORS.gray750};
  border: 1px solid ${COLORS.gray300};
  border-radius: 15px;
`;
const MobileNoDataMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${COLORS.gray300};
`;

export default MobileMainRecommendation;
