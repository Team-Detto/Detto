import { products, develops, designs } from 'utils/skills';
import { WriteType } from 'types/write/writeType';
import SkillButton from 'components/common/SkillButton';
import styled from '@emotion/styled';

interface Props {
  writeFormValue: WriteType.WriteFormType;
  setWriteFormValue: (value: WriteType.WriteFormType) => void;
}

const WritePageStack = ({ writeFormValue, setWriteFormValue }: Props) => {
  return (
    <WritePageStackContainer>
      <WritePageLeftBox>
        <WritePageStackText>필요 스택</WritePageStackText>
      </WritePageLeftBox>
      <WirtePageRightBox>
        <WritePageStackBox>
          <WritePageStackLeftBox>
            <WritePageStackCategoryText>기획</WritePageStackCategoryText>
          </WritePageStackLeftBox>
          <WritePageStackRightBox>
            {products.map((product: string) => (
              <SkillButton
                key={product}
                name={product}
                type="plannerStack"
                value={writeFormValue?.plannerStack}
                setValue={setWriteFormValue}
              />
            ))}
          </WritePageStackRightBox>
        </WritePageStackBox>
        <WritePageStackBox>
          <WritePageStackLeftBox>
            <WritePageStackCategoryText>디자인</WritePageStackCategoryText>
          </WritePageStackLeftBox>
          <WritePageStackRightBox>
            {designs.map((design: string) => (
              <SkillButton
                key={design}
                name={design}
                type="designerStack"
                value={writeFormValue?.designerStack}
                setValue={setWriteFormValue}
              />
            ))}
          </WritePageStackRightBox>
        </WritePageStackBox>
        <WritePageStackBox>
          <WritePageStackLeftBox>
            <WritePageStackCategoryText>개발</WritePageStackCategoryText>
          </WritePageStackLeftBox>
          <WritePageStackRightBox>
            {develops.map((develop: string) => (
              <SkillButton
                key={develop}
                name={develop}
                type="developerStack"
                value={writeFormValue?.developerStack}
                setValue={setWriteFormValue}
              />
            ))}
          </WritePageStackRightBox>
        </WritePageStackBox>
      </WirtePageRightBox>
    </WritePageStackContainer>
  );
};

const WritePageStackContainer = styled.div`
  width: 100%;
  max-width: 70.875rem;
  display: flex;
  flex-direction: row;
`;

const WritePageLeftBox = styled.div`
  width: 10%;
`;

const WirtePageRightBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const WritePageStackText = styled.h2`
  display: flex;
  align-items: center;
  font-weight: 400;
  line-height: 1.75rem;
  letter-spacing: -0.02rem;
  color: #383838;
`;

const WritePageStackBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const WritePageStackLeftBox = styled.div`
  min-width: 8%;
`;

const WritePageStackRightBox = styled.div`
  min-width: 62.5625rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
`;

const WritePageStackCategoryText = styled.p`
  height: 1.75rem;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.75rem;
  color: #383838;
  margin-right: 1.2rem;
`;

export default WritePageStack;
