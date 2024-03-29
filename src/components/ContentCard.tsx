import { useEffect, memo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRecruiting } from 'apis/postDetail';
import { getDate, getDays } from 'utils/date';
import { concatSkills } from 'utils/skills';
import defaultThumbnail from 'assets/images/thumbnail_small.webp';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';
import Likes from './projectDetail/Likes';

interface Props {
  project: EditType.EditFormType;
  likedProjects: string[];
  onNavigateToProjectDetailEvent: (path: string) => () => void;
}

const ContentCard = ({ project, onNavigateToProjectDetailEvent }: Props) => {
  const {
    id,
    title,
    view,
    like,
    startDate,
    plannerStack,
    designerStack,
    developerStack,
    thumbnail,
    isRecruiting,
    deadline,
  }: any = project;
  const stacks = concatSkills(plannerStack, designerStack, developerStack);
  const queryClient = useQueryClient();

  const { mutate: updateRecruitingMutate } = useMutation(
    () => updateRecruiting(id, false),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post', id]);
        // TODO: post 전체 쿼리를 invalidate 할것인지 고민해보기
      },
    },
  );

  const today: any = Date.now();
  useEffect(() => {
    if (today > deadline) {
      updateRecruitingMutate();
    }
  }, []);

  const day = Number(getDays(deadline - today));
  return (
    <ContentCardWrap>
      <ImageWrap>
        <ContentCardImgContainer
          src={thumbnail || defaultThumbnail}
          onClick={onNavigateToProjectDetailEvent(id)}
          alt={title + ` 프로젝트 썸네일`}
        />
        {isRecruiting && day >= 0 && (
          <DeadLineIcon day={day}>
            {day <= 0 ? '마감일' : `D - ${getDays(deadline - today)}`}
          </DeadLineIcon>
        )}
      </ImageWrap>
      <ContentCardContentsContainer>
        <ContentCardDateContainer>
          <RecruitingIcon>
            {isRecruiting ? '모집중' : '모집마감'}
          </RecruitingIcon>
          <ContentCardDate>
            프로젝트 시작일 | <span> {getDate(startDate)}</span>
          </ContentCardDate>
          <ContentCardBookmark>
            <Likes pid={id} page="card" />
          </ContentCardBookmark>
        </ContentCardDateContainer>
        <ContentCardTitle onClick={onNavigateToProjectDetailEvent(id)}>
          {title}
        </ContentCardTitle>
        <ContentCardSubTextBox>
          <ContentCardSubText>조회수 {view}</ContentCardSubText>
          <ContentCardSubText>관심 {like}</ContentCardSubText>
        </ContentCardSubTextBox>
        <ContentCardStackContainer>
          {stacks
            .filter((stack, pos) => stacks.indexOf(stack) === pos)
            .map((stack, index) => {
              if (index < 8)
                return (
                  <ContentCardStackButton key={stack}>
                    {stack}
                  </ContentCardStackButton>
                );
            })}
        </ContentCardStackContainer>
      </ContentCardContentsContainer>
    </ContentCardWrap>
  );
};
const ContentCardWrap = styled.div`
  width: 23.75rem;
  height: 29.6875rem;
  background: ${COLORS.white};
  box-shadow: 0rem 0rem 0.375rem 0.125rem rgba(0, 0, 0, 0.04);
  border-radius: 0.375rem;
`;

const ImageWrap = styled.div`
  position: relative;
  width: 100%;
`;

const DeadLineIcon = styled.div<{ day: number }>`
  z-index: 10;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 3.75rem;
  height: 1.75rem;
  font-style: normal;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 2.5rem;
  /* padding: 0rem 0.5rem; */
  background-color: ${({ day }) =>
    day <= 3 ? `${COLORS.red}` : `${COLORS.gray100}`};
  color: ${({ day }) => (day <= 3 ? `${COLORS.white}` : `${COLORS.gray400}`)};
  font-size: 0.75rem;
`;

const ContentCardImgContainer = styled.img`
  position: relative;
  z-index: 0;
  width: 23.75rem;
  height: 13.375rem;
  background: ${COLORS.gray300};
  object-fit: cover;
  border-radius: 0.375rem 0.375rem 0rem 0rem;
  cursor: pointer;
`;
const ContentCardContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 22rem;
  height: 11rem;
  margin: 1.375rem 0.875rem 2.375rem 0.875rem;
`;
const RecruitingIcon = styled.div`
  width: 3.75rem;
  height: 1.75rem;
  font-style: normal;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 2.5rem;
  background-color: ${(props: { children: string }) =>
    props.children === '모집중' ? `${COLORS.violetB400}` : `${COLORS.gray100}`};
  color: ${(props: { children: string }) =>
    props.children === '모집중' ? `${COLORS.white}` : `${COLORS.gray400}`};
  font-size: 0.75rem;
`;

const ContentCardDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0rem;
  gap: 0.3125rem;
  width: 22rem;
`;
const ContentCardDate = styled.div`
  width: 19.375rem;
  height: 2rem;
  font-weight: 400;
  font-size: 1rem;
  line-height: 2rem;
  display: flex;
  align-items: center;
  color: ${COLORS.gray750};
  gap: 0.2rem;
  span {
    color: ${COLORS.gray850}; //색상표에 없음
  }
`;
const ContentCardBookmark = styled.div`
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    animation-name: beat;
    animation-duration: 1000ms;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
    @keyframes beat {
      0% {
        transform: rotate(0deg);
      }
      25% {
        transform: rotate(-10deg);
      }
      50% {
        transform: rotate(10deg);
      }
      75% {
        transform: rotate(-10deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }
  }
`;
const ContentCardTitle = styled.div`
  width: 21.875rem;
  height: 3.125rem;
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 140%;
  color: ${COLORS.black};

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  cursor: pointer;
`;
const ContentCardSubTextBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.8rem;
`;
const ContentCardSubText = styled.p`
  width: 3.625rem;
  height: 1.0625rem;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 140%;
  color: ${COLORS.gray600};
`;
const ContentCardStackContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0rem;
  gap: 0.3125rem;
  text-align: center;
  width: 100%;
  height: 2rem;
`;
const ContentCardStackButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0rem 0.75rem;
  gap: 0.625rem;
  height: 2rem;
  background: ${COLORS.gray100};
  border-radius: 2rem;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 2rem;
  color: ${COLORS.black};
`;

export default memo(ContentCard);
