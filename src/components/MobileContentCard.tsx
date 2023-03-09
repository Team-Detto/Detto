import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRecruiting } from 'apis/postDetail';
import { useAuth, useGlobalModal } from 'hooks';
import { getDate, getDays } from 'utils/date';
import { EditType } from 'types/write/writeType';
import defaultThumbnail from 'assets/images/thumbnail_mobile.png';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';
import Likes from './projectDetail/Likes';
interface Props {
  pid?: string;
  project: EditType.EditFormType;
  likedProjects: string[];
  onUpdateLikedCountEvent?: (id: string) => void;
  onNavigateToProjectDetailEvent: (path: string) => () => void;
}

const MobileContentCard = ({
  pid,
  project,
  likedProjects,
  onNavigateToProjectDetailEvent,
}: Props) => {
  const {
    id,
    title,
    view,
    like,
    startDate,
    thumbnail,
    isRecruiting,
    deadline,
  }: any = project;
  const idList: any[] = [];
  const queryClient = useQueryClient();
  const today = new Date().getTime();

  const { mutate: updateRecruitingMutate } = useMutation(
    () => updateRecruiting(id as string, false),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post', id]);
      },
    },
  );

  useEffect(() => {
    if (today > deadline) {
      idList.push(id);
      updateRecruitingMutate(id, false as any);
    }
  }, [likedProjects]);

  useEffect(() => {
    idList.map((id) => {
      updateRecruitingMutate(id, false as any);
    });
  }, []);

  const day = Number(getDays(deadline - today));
  return (
    <MobileContentCardWrap>
      <ContentCardImgContainer
        onClick={onNavigateToProjectDetailEvent(id ?? pid)}
      >
        {thumbnail ? (
          <ContentCardImg src={thumbnail} alt={title + '프로젝트 썸네일'} />
        ) : (
          <ContentCardImg
            src={defaultThumbnail}
            alt={title + '프로젝트 썸네일'}
          />
        )}
        <ContentCardLikeBox onClick={(e) => e.stopPropagation()}>
          <Likes pid={id} page="card" />
        </ContentCardLikeBox>
      </ContentCardImgContainer>
      <ContentCardContentsContainer
        onClick={onNavigateToProjectDetailEvent(id ?? pid)}
      >
        <ContentCardDateContainer>
          <RecruitingIcon>
            {isRecruiting ? '모집중' : '모집마감'}
          </RecruitingIcon>
          <ContentCardDate>
            프로젝트 시작일 | <span> {getDate(startDate)}</span>
          </ContentCardDate>
          {isRecruiting && day >= 0 && (
            <DeadLineIcon day={day}>
              {day === 0 ? '마감일' : `D - ${getDays(deadline - today)}`}
            </DeadLineIcon>
          )}
        </ContentCardDateContainer>
        <ContentCardTitle>{title}</ContentCardTitle>
        <ContentCardSubTextBox>
          <ContentCardSubText>조회수 | {view}</ContentCardSubText>
          <ContentCardSubText>관심 | {like}</ContentCardSubText>
        </ContentCardSubTextBox>
      </ContentCardContentsContainer>
    </MobileContentCardWrap>
  );
};
const MobileContentCardWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  margin: 0.9375rem 0;
`;
const ContentCardImgContainer = styled.div`
  min-width: 4.5rem;
  min-height: 4.5rem;
  width: 4.5rem;
  height: 4.5rem;
  margin-right: 1.4375rem;
  position: relative;
  cursor: pointer;
`;
const ContentCardImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
`;
const ContentCardContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1875rem;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
`;
const RecruitingIcon = styled.div`
  min-width: 2.8rem;
  font-size: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 2.5rem;
  background-color: ${(props: { children: string }) =>
    props.children === '모집중' ? `${COLORS.violetB400}` : `${COLORS.gray100}`};
  color: ${(props: { children: string }) =>
    props.children === '모집중' ? `${COLORS.white}` : `${COLORS.gray400}`};

  margin-right: 0.4rem;
`;

const ContentCardDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;
const ContentCardDate = styled.div`
  font-weight: 500;
  font-size: 0.6875rem;
  line-height: 1.0625rem;

  color: #6b7684;
  margin-right: 0.3125rem;
`;

const DeadLineIcon = styled.div<{ day: number }>`
  z-index: 10;
  position: absolute;
  font-size: 0.625rem;
  top: 0;
  right: 3px;
  min-width: 2.8rem;
  font-size: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 2.5rem;
  /* padding: 0rem 0.5rem; */
  background-color: ${({ day }) =>
    day <= 3 ? `${COLORS.red}` : `${COLORS.gray100}`};
  color: ${({ day }) => (day <= 3 ? `${COLORS.white}` : `${COLORS.gray400}`)};
`;

const ContentCardLikeBox = styled.div`
  position: absolute;
  bottom: 0.25rem;
  right: 0.25rem;
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
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.4375rem;

  color: #333d4b;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ContentCardSubTextBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const ContentCardSubText = styled.p`
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.1875rem;

  color: #6b7684;

  margin-right: 1.5rem;
`;

export default MobileContentCard;
