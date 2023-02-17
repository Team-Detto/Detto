import { getDate } from 'utils/date';
import { EditType } from 'types/write/writeType';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import styled from '@emotion/styled';
import { concatSkills } from 'utils/skills';

interface Props {
  project: EditType.EditFormType;
  likedProjects: string[];
  onNavigateToProjectDetailEvent: (path: string) => () => void;
}

const ContantCard = ({
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
    plannerStack,
    designerStack,
    developerStack,
    thumbnail,
  }: any = project;
  const stacks = concatSkills(plannerStack, designerStack, developerStack);

  return (
    <ContantCardWrap onClick={onNavigateToProjectDetailEvent(id)}>
      <ContantCardImgContainer src={thumbnail} />
      <ContantCardContentsContainer>
        <ContantCardDateContainer>
          <ContantCardDate>
            프로젝트 시작일 | {getDate(startDate)}
          </ContantCardDate>
          <ContentCardBookmark>
            {likedProjects.includes(id) && (
              <AiFillHeart size="1.5rem" color="#F14181" />
            )}
            {!likedProjects.includes(id) && (
              <AiOutlineHeart size="1.5rem" color="#6B7684" />
            )}
          </ContentCardBookmark>
        </ContantCardDateContainer>
        <ContantCardTitle>{title}</ContantCardTitle>
        <ContentCardSubTextBox>
          <ContentCardSubText>조회수 {view}</ContentCardSubText>
          <ContentCardSubText>관심 {like}</ContentCardSubText>
        </ContentCardSubTextBox>
        <ContantCardStackContainer>
          {stacks
            .filter((stack, pos) => stacks.indexOf(stack) === pos)
            .map((stack, index) => {
              if (index < 4)
                return (
                  <ContantCardStackButton key={stack}>
                    {stack}
                  </ContantCardStackButton>
                );
            })}
        </ContantCardStackContainer>
      </ContantCardContentsContainer>
    </ContantCardWrap>
  );
};
const ContantCardWrap = styled.div`
  width: 380px;
  height: 450px;
  background: #ffffff;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.04);
  border-radius: 6px;
  cursor: pointer;
`;
const ContantCardImgContainer = styled.img`
  width: 380px;
  height: 214px;
  background: #ced3db;
  object-fit: cover;
  border-radius: 6px 6px 0px 0px;
`;
const ContantCardContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 352px;
  height: 176px;
  margin: 22px 14px 38px 14px;
`;
const ContantCardDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0px;
  gap: 16px;
  width: 352px;
`;
const ContantCardDate = styled.div`
  width: 310px;
  height: 32px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  display: flex;
  align-items: center;
  color: #6b7684;
`;
const ContentCardBookmark = styled.button``;
const ContantCardTitle = styled.div`
  width: 350px;
  height: 50px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 140%;
  display: flex;
  align-items: center;
  color: #000000;
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
  color: #98a2ae;
`;
const ContantCardStackContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  text-align: center;
  overflow: hidden;
  width: 100%;
  height: 32px;
`;
const ContantCardStackButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 12px;
  gap: 10px;
  height: 32px;
  background: #f2f4f6;
  border-radius: 32px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 32px;
  color: #000000;
`;

export default ContantCard;
