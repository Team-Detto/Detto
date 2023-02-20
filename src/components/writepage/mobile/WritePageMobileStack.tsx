import {} from 'react';
import SkillButton from 'components/common/SkillButton';
import {
  WritePageMobileBodyLeftBox,
  WritePageMobileBodyRightBox,
  WritePageMobileBodyText,
} from './WritePageMobileBody';
import { products, develops, designs } from 'utils/skills';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

const WritePageMobileStack = () => {
  return (
    <WritePageMobileStackContainer>
      <WritePageMobileBodyLeftBox>
        <WritePageMobileBodyText>필요 스택</WritePageMobileBodyText>
      </WritePageMobileBodyLeftBox>
      <WritePageMobileBodyRightBox>
        <WritePageMobileStackBox>
          <WritePageMobileStakCategoryBox>
            <WritePageMobileStackNameBox>
              <WritePageMobileStackName>기획</WritePageMobileStackName>
            </WritePageMobileStackNameBox>
            <WritePageMobileStackSkillBox>
              <SkillButton name="TypeScript" />
            </WritePageMobileStackSkillBox>
          </WritePageMobileStakCategoryBox>
          <WritePageMobileStakCategoryBox>
            <WritePageMobileStackNameBox>
              <WritePageMobileStackName>디자인</WritePageMobileStackName>
            </WritePageMobileStackNameBox>
            <WritePageMobileStackSkillBox>
              <SkillButton name="JavaScript" />
            </WritePageMobileStackSkillBox>
          </WritePageMobileStakCategoryBox>
          <WritePageMobileStakCategoryBox>
            <WritePageMobileStackNameBox>
              <WritePageMobileStackName>개발</WritePageMobileStackName>
            </WritePageMobileStackNameBox>
            <WritePageMobileStackSkillBox>
              <SkillButton name="Notion" />
            </WritePageMobileStackSkillBox>
          </WritePageMobileStakCategoryBox>
        </WritePageMobileStackBox>
      </WritePageMobileBodyRightBox>
    </WritePageMobileStackContainer>
  );
};

const WritePageMobileStackContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const WritePageMobileStackBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
const WritePageMobileStakCategoryBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const WritePageMobileStackNameBox = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WritePageMobileStackName = styled.p`
  width: 2.5rem;
  height: 1.75rem;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.75rem;
  letter-spacing: -0.02em;
  color: ${COLORS.gray800};
`;
const WritePageMobileStackSkillBox = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
export default WritePageMobileStack;
