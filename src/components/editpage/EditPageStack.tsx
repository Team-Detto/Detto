import { products, develops, designs } from 'utils/skills';
import { EditType } from 'types/write/writeType';
import SkillButton from 'components/common/SkillButton';
import styled from '@emotion/styled';

interface Props {
  plannerStack: string[];
  designerStack: string[];
  developerStack: string[];
  setEditFormValue: (value: EditType.EditFormType) => void;
}

const EditPageStack = ({
  plannerStack,
  designerStack,
  developerStack,
  setEditFormValue,
}: Props) => {
  return (
    <StackContainer>
      <StackPageLeftBox>
        <StackText>필요 스택</StackText>
      </StackPageLeftBox>
      <StackPageRightBox>
        <StackBox>
          <StackLeftBox>
            <StackCategoryText>기획</StackCategoryText>
          </StackLeftBox>
          <StackRightBox>
            {products.map((product) => {
              const isChecked = plannerStack?.includes(product);
              return (
                <SkillButton
                  key={product}
                  name={product}
                  type="plannerStack"
                  value={plannerStack}
                  isChecked={isChecked ? true : false}
                  setValue={setEditFormValue}
                />
              );
            })}
          </StackRightBox>
        </StackBox>
        <StackBox>
          <StackLeftBox>
            <StackCategoryText>디자인</StackCategoryText>
          </StackLeftBox>
          <StackRightBox>
            {designs.map((design) => {
              const isChecked = designerStack?.includes(design);
              return (
                <SkillButton
                  key={design}
                  name={design}
                  type="designerStack"
                  value={designerStack}
                  isChecked={isChecked ? true : false}
                  setValue={setEditFormValue}
                />
              );
            })}
          </StackRightBox>
        </StackBox>
        <StackBox>
          <StackLeftBox>
            <StackCategoryText>개발</StackCategoryText>
          </StackLeftBox>
          <StackRightBox>
            {develops.map((develop) => {
              const isChecked = developerStack?.includes(develop);
              return (
                <SkillButton
                  key={develop}
                  name={develop}
                  type="developerStack"
                  value={developerStack}
                  isChecked={isChecked ? true : false}
                  setValue={setEditFormValue}
                />
              );
            })}
          </StackRightBox>
        </StackBox>
      </StackPageRightBox>
    </StackContainer>
  );
};

const StackContainer = styled.div`
  width: 100%;
  max-width: 70.875rem;
  display: flex;
  flex-direction: row;
  margin-top: 2.5rem;
`;

const StackPageLeftBox = styled.div`
  width: 10%;
`;

const StackPageRightBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const StackText = styled.h2`
  display: flex;
  align-items: center;
  font-weight: 400;
  line-height: 1.75rem;
  letter-spacing: -0.02rem;
  color: #383838;
`;

const StackBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const StackLeftBox = styled.div`
  width: 8%;
`;

const StackRightBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
`;

const StackCategoryText = styled.p`
  height: 1.75rem;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.75rem;
  color: #383838;
  margin-right: 1.2rem;
`;

export default EditPageStack;
