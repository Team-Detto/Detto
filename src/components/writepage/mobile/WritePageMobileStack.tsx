import { ChangeEvent, useState } from 'react';
import SkillButton from 'components/common/SkillButton';
import {
  WritePageMobileBodyLeftBox,
  WritePageMobileBodyRightBox,
  WritePageMobileBodyText,
} from './WritePageMobileBody';
import { products, develops, designs } from 'utils/skills';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  plannerStack: string[];
  designerStack: string[];
  developerStack: string[];
  setWriteFormValue: (value: any) => void;
}

const WritePageMobileStack = ({
  plannerStack,
  designerStack,
  developerStack,
  setWriteFormValue,
}: Props) => {
  const [selectedPlanner, setSelectedPlanner] = useState<string>('Figma');
  const [selectedDesigner, setSelectedDesigner] = useState<string>('Figma');
  const [selectedDeveloper, setSelectedDeveloper] =
    useState<string>('JavaScript');

  const handleSectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'plannerStack':
        setSelectedPlanner(value);
        break;
      case 'designerStack':
        setSelectedDesigner(value);
        break;
      case 'developerStack':
        setSelectedDeveloper(value);
        break;
      default:
        break;
    }
  };

  const handleAddStackButtonClick = (e: any) => {
    const { name } = e.target;
    switch (name) {
      case 'plannerStack':
        if (plannerStack.includes(selectedPlanner)) return;
        setWriteFormValue((prev: any) => ({
          ...prev,
          plannerStack: [...prev.plannerStack, selectedPlanner],
        }));
        break;
      case 'designerStack':
        if (designerStack.includes(selectedDesigner)) return;
        setWriteFormValue((prev: any) => ({
          ...prev,
          designerStack: [...prev.designerStack, selectedDesigner],
        }));
        break;
      case 'developerStack':
        if (developerStack.includes(selectedDeveloper)) return;
        setWriteFormValue((prev: any) => ({
          ...prev,
          developerStack: [...prev.developerStack, selectedDeveloper],
        }));
        break;
      default:
        break;
    }
  };

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
              <WritePageMobileSelectInput
                defaultValue={selectedPlanner}
                name="plannerStack"
                onChange={handleSectionChange}
              >
                {products.map((product: string) => (
                  <option key={product} value={product}>
                    {product}
                  </option>
                ))}
              </WritePageMobileSelectInput>
              <WritePageMobileBodyAddButton
                name="plannerStack"
                onClick={handleAddStackButtonClick}
              >
                ＋
              </WritePageMobileBodyAddButton>
            </WritePageMobileStackNameBox>
            <WritePageMobileStackSkillBox>
              {plannerStack.map((planner: string) => (
                <SkillButton
                  key={planner}
                  name={planner}
                  type="plannerStack"
                  setValue={setWriteFormValue}
                />
              ))}
            </WritePageMobileStackSkillBox>
          </WritePageMobileStakCategoryBox>
          <WritePageMobileStakCategoryBox>
            <WritePageMobileStackNameBox>
              <WritePageMobileStackName>디자인</WritePageMobileStackName>
              <WritePageMobileSelectInput
                defaultValue={selectedDesigner}
                name="designerStack"
                onChange={handleSectionChange}
              >
                {designs.map((design: string) => (
                  <option key={design} value={design}>
                    {design}
                  </option>
                ))}
              </WritePageMobileSelectInput>
              <WritePageMobileBodyAddButton
                name="designerStack"
                onClick={handleAddStackButtonClick}
              >
                ＋
              </WritePageMobileBodyAddButton>
            </WritePageMobileStackNameBox>
            <WritePageMobileStackSkillBox>
              {designerStack.map((designer: string) => (
                <SkillButton
                  key={designer}
                  name={designer}
                  type="designerStack"
                  setValue={setWriteFormValue}
                />
              ))}
            </WritePageMobileStackSkillBox>
          </WritePageMobileStakCategoryBox>
          <WritePageMobileStakCategoryBox>
            <WritePageMobileStackNameBox>
              <WritePageMobileStackName>개발</WritePageMobileStackName>
              <WritePageMobileSelectInput
                defaultValue={selectedDeveloper}
                name="developerStack"
                onChange={handleSectionChange}
              >
                {develops.map((develop: string) => (
                  <option key={develop} value={develop}>
                    {develop}
                  </option>
                ))}
              </WritePageMobileSelectInput>
              <WritePageMobileBodyAddButton
                name="developerStack"
                onClick={handleAddStackButtonClick}
              >
                ＋
              </WritePageMobileBodyAddButton>
            </WritePageMobileStackNameBox>
            <WritePageMobileStackSkillBox>
              {developerStack.map((developer: string) => (
                <SkillButton
                  key={developer}
                  name={developer}
                  type="developerStack"
                  setValue={setWriteFormValue}
                />
              ))}
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
  gap: 1rem;
`;
export const WritePageMobileStakCategoryBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
export const WritePageMobileStackNameBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
export const WritePageMobileStackName = styled.p`
  width: 2.5rem;
  height: 1.75rem;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.75rem;
  letter-spacing: -0.02em;
  color: ${COLORS.gray800};
`;
export const WritePageMobileSelectInput = styled.select`
  width: 5.625rem;
  height: 1.875rem;
  background-color: ${COLORS.gray50};
  border: 1px solid ${COLORS.gray100};
  border-radius: 0.125rem;
  padding-left: 0.7rem;
  margin-right: 0.8rem;
  font-weight: 400;
  font-size: 0.625rem;
  line-height: 140%;
  color: ${COLORS.gray850};
`;
export const WritePageMobileStackSkillBox = styled.div`
  width: 18.3rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;
export const WritePageMobileBodyAddButton = styled.button`
  width: 1.3rem;
  height: 1.3rem;
  background-color: ${COLORS.violetB400};
  color: ${COLORS.white};
  font-weight: 500;
  font-size: 0.8rem;
  box-shadow: 0rem 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
  border-radius: 3.125rem;
`;

export default WritePageMobileStack;
