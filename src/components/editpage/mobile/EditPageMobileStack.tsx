import { ChangeEvent, useState } from 'react';
import SkillButton from 'components/common/SkillButton';
import {
  EditPageMobileBodyLeftBox,
  EditPageMobileBodyRightBox,
  EditPageMobileBodyText,
} from './EditPageMobileBody';
import { products, develops, designs } from 'utils/skills';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  plannerStack: string[];
  designerStack: string[];
  developerStack: string[];
  setEditFormValue: (value: any) => void;
}

const EditPageMobileStack = ({
  plannerStack,
  designerStack,
  developerStack,
  setEditFormValue,
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
        setEditFormValue((prev: any) => ({
          ...prev,
          plannerStack: [...prev.plannerStack, selectedPlanner],
        }));
        break;
      case 'designerStack':
        if (designerStack.includes(selectedDesigner)) return;
        setEditFormValue((prev: any) => ({
          ...prev,
          designerStack: [...prev.designerStack, selectedDesigner],
        }));
        break;
      case 'developerStack':
        if (developerStack.includes(selectedDeveloper)) return;
        setEditFormValue((prev: any) => ({
          ...prev,
          developerStack: [...prev.developerStack, selectedDeveloper],
        }));
        break;
      default:
        break;
    }
  };
  return (
    <EditPageMobileStackContainer>
      <EditPageMobileBodyLeftBox>
        <EditPageMobileBodyText>필요 스택</EditPageMobileBodyText>
      </EditPageMobileBodyLeftBox>
      <EditPageMobileBodyRightBox>
        <EditPageMobileStackBox>
          <EditPageMobileStakCategoryBox>
            <EditPageMobileStackNameBox>
              <EditPageMobileStackName>기획</EditPageMobileStackName>
              <EditPageMobileSelectInput
                defaultValue={selectedPlanner}
                name="plannerStack"
                onChange={handleSectionChange}
              >
                {products.map((product) => (
                  <option key={product} value={product}>
                    {product}
                  </option>
                ))}
              </EditPageMobileSelectInput>
              <EditPageMobileBodyAddButton
                name="plannerStack"
                onClick={handleAddStackButtonClick}
              >
                ＋
              </EditPageMobileBodyAddButton>
            </EditPageMobileStackNameBox>
            <EditPageMobileStackSkillBox>
              {plannerStack.map((planner) => (
                <SkillButton
                  key={planner}
                  name={planner}
                  type="plannerStack"
                  setValue={setEditFormValue}
                />
              ))}
            </EditPageMobileStackSkillBox>
          </EditPageMobileStakCategoryBox>
          <EditPageMobileStakCategoryBox>
            <EditPageMobileStackNameBox>
              <EditPageMobileStackName>디자인</EditPageMobileStackName>
              <EditPageMobileSelectInput
                defaultValue={selectedDesigner}
                name="designerStack"
                onChange={handleSectionChange}
              >
                {designs.map((design) => (
                  <option key={design} value={design}>
                    {design}
                  </option>
                ))}
              </EditPageMobileSelectInput>
              <EditPageMobileBodyAddButton
                name="designerStack"
                onClick={handleAddStackButtonClick}
              >
                ＋
              </EditPageMobileBodyAddButton>
            </EditPageMobileStackNameBox>
            <EditPageMobileStackSkillBox>
              {designerStack.map((designer) => (
                <SkillButton
                  key={designer}
                  name={designer}
                  type="designerStack"
                  setValue={setEditFormValue}
                />
              ))}
            </EditPageMobileStackSkillBox>
          </EditPageMobileStakCategoryBox>
          <EditPageMobileStakCategoryBox>
            <EditPageMobileStackNameBox>
              <EditPageMobileStackName>개발</EditPageMobileStackName>
              <EditPageMobileSelectInput
                defaultValue={selectedDeveloper}
                name="developerStack"
                onChange={handleSectionChange}
              >
                {develops.map((develop) => (
                  <option key={develop} value={develop}>
                    {develop}
                  </option>
                ))}
              </EditPageMobileSelectInput>
              <EditPageMobileBodyAddButton
                name="developerStack"
                onClick={handleAddStackButtonClick}
              >
                ＋
              </EditPageMobileBodyAddButton>
            </EditPageMobileStackNameBox>
            <EditPageMobileStackSkillBox>
              {developerStack.map((developer) => (
                <SkillButton
                  key={developer}
                  name={developer}
                  type="developerStack"
                  setValue={setEditFormValue}
                />
              ))}
            </EditPageMobileStackSkillBox>
          </EditPageMobileStakCategoryBox>
        </EditPageMobileStackBox>
      </EditPageMobileBodyRightBox>
    </EditPageMobileStackContainer>
  );
};

const EditPageMobileStackContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const EditPageMobileStackBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
const EditPageMobileStakCategoryBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
const EditPageMobileStackNameBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const EditPageMobileStackName = styled.p`
  width: 2.5rem;
  height: 1.75rem;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.75rem;
  letter-spacing: -0.02em;
  color: ${COLORS.gray800};
`;
const EditPageMobileSelectInput = styled.select`
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
const EditPageMobileStackSkillBox = styled.div`
  width: 18.3rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;
const EditPageMobileBodyAddButton = styled.button`
  width: 1.3rem;
  height: 1.3rem;
  background-color: ${COLORS.violetB400};
  color: ${COLORS.white};
  font-weight: 500;
  font-size: 0.8rem;
  box-shadow: 0rem 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
  border-radius: 3.125rem;
`;

export default EditPageMobileStack;
