import { getDate } from 'utils/date';
import { EditType } from 'types/write/writeType';
import { concatSkills } from 'utils/skills';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRecruiting } from 'apis/postDetail';

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
  const idList: any[] = [];
  const queryClient = useQueryClient();
  const today = new Date().getTime();

  const { mutate: updateRecruitingMutate } = useMutation(
    () => updateRecruiting(id as string, false),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  );

  useEffect(() => {
    if (today > deadline) {
      idList.push(id);
      updateRecruitingMutate(id, false as any);
    }
  }, []);

  useEffect(() => {
    idList.map((id) => {
      updateRecruitingMutate(id, false as any);
    });
  }, [idList]);

  return (
    <MobileContentCardWrap onClick={onNavigateToProjectDetailEvent(id ?? pid)}>
      <ContentCardImgContainer>
        <ContentCardImg src={thumbnail} />
        <ContentCardBookmark>
          {likedProjects.includes(id) && (
            <AiFillHeart size="1.5rem" color={`${COLORS.pink}`} />
          )}
          {!likedProjects.includes(id) && (
            <AiOutlineHeart size="1.5rem" color={`${COLORS.gray750}`} />
          )}
        </ContentCardBookmark>
      </ContentCardImgContainer>
      <ContentCardContentsContainer>
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
  height: 6.625rem;
  margin-bottom: 0.9375rem;
`;
const ContentCardImgContainer = styled.div`
  width: 5.125rem;
  height: 5.125rem;
  margin: 1rem 0.875rem 0.5rem 1.25rem;
  position: relative;
`;
const ContentCardImg = styled.img`
  width: 5.125rem;
  height: 5.125rem;
  border-radius: 0.5rem;
  object-fit: cover;
`;
const ContentCardContentsContainer = styled.div``;
const RecruitingIcon = styled.div`
  min-width: 2.8rem;
  height: 0.875rem;
  font-style: normal;
  font-weight: 400;
  font-size: 0.4375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 2.5rem;
  padding: 0rem 0.5rem;
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
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;

  color: #6b7684;
  margin-right: 0.3125rem;
`;
const ContentCardBookmark = styled.button`
  position: absolute;
  bottom: 0.3125rem;
  left: 0.335rem;
`;
const ContentCardTitle = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;

  color: #333d4b;
`;
const ContentCardSubTextBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const ContentCardSubText = styled.p`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;

  color: #6b7684;

  margin-right: 1.5rem;
`;

export default MobileContentCard;
