import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRecruiting } from 'apis/postDetail';
import { firebaseLikeProjectUpdateRequest } from 'apis/boardService';
import { useAuth } from 'hooks';
import { getDate } from 'utils/date';
import { EditType } from 'types/write/writeType';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import defaultThumbnail from 'assets/images/thumbnail_mobile.jpg';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';
interface Props {
  project: EditType.EditFormType;
  likedProjects: string[];
  pid?: string;
  onNavigateToProjectDetailEvent: (path: any) => () => void;
}

const MobileContentCard = ({
  project,
  likedProjects,
  onNavigateToProjectDetailEvent,
  pid,
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
  const { uid } = useAuth();
  const [isLike, setIsLike] = useState<boolean>(false);
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

  const { mutate: updateLikeMutate } = useMutation(
    () => firebaseLikeProjectUpdateRequest(id, uid),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['likedProjects', uid]);
      },
    },
  );

  const handleUpdateLike = useCallback(() => {
    setIsLike(!isLike);
    updateLikeMutate();
  }, [isLike, updateLikeMutate]);

  useEffect(() => {
    if (today > deadline) {
      idList.push(id);
      updateRecruitingMutate(id, false as any);
    }
    setIsLike(likedProjects?.includes(id ?? pid) ?? false);
  }, [likedProjects]);

  useEffect(() => {
    idList.map((id) => {
      updateRecruitingMutate(id, false as any);
    });
  }, []);

  return (
    <MobileContentCardWrap>
      <ContentCardImgContainer>
        {thumbnail ? (
          <ContentCardImg src={thumbnail} />
        ) : (
          <ContentCardImg src={defaultThumbnail} />
        )}
        <ContentCardBookmark onClick={handleUpdateLike}>
          {isLike ? (
            <AiFillHeart size="1.5rem" color={`${COLORS.pink}`} />
          ) : (
            <AiOutlineHeart size="1.5rem" color={`${COLORS.gray750}`} />
          )}
        </ContentCardBookmark>
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
`;
const ContentCardDate = styled.div`
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.0625rem;

  color: #6b7684;
  margin-right: 0.3125rem;
`;
const ContentCardBookmark = styled.button`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  bottom: 0.25rem;
  left: 0.25rem;
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
  font-size: 1rem;
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
  font-size: 0.8125rem;
  line-height: 1.1875rem;

  color: #6b7684;

  margin-right: 1.5rem;
`;

export default MobileContentCard;
