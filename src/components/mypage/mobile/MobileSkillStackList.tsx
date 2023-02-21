import { ChangeEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userInfoState } from '../../../recoil/atoms';
import styled from '@emotion/styled';
import SkillButton from 'components/common/SkillButton';
import {
  WritePageMobileBodyAddButton,
  WritePageMobileSelectInput,
  WritePageMobileStackName,
  WritePageMobileStackNameBox,
  WritePageMobileStackSkillBox,
  WritePageMobileStakCategoryBox,
} from 'components/writepage/mobile/WritePageMobileStack';
import { designs, develops, products } from 'utils/skills';

interface MobileSkillStackProps {
  designerStack: string[];
  developerStack: string[];
  plannerStack: string[];
}

const MobileSkillStackList = ({
  designerStack,
  developerStack,
  plannerStack,
}: MobileSkillStackProps) => {
  const setUserInfo = useSetRecoilState(userInfoState);
  const [selectedPlanner, setSelectedPlanner] = useState<string>('Figma');
  const [selectedDesigner, setSelectedDesigner] = useState<string>('Figma');
  const [selectedDeveloper, setSelectedDeveloper] =
    useState<string>('JavaScript');

  // 스택 추가
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

  // 스택 리스트
  const handleAddStackButtonClick = (e: any) => {
    const { name } = e.target;
    switch (name) {
      case 'plannerStack':
        if (plannerStack.includes(selectedPlanner)) return;
        setUserInfo((prev: any) => ({
          ...prev,
          plannerStack: [...prev.plannerStack, selectedPlanner],
        }));
        break;
      case 'designerStack':
        if (designerStack.includes(selectedDesigner)) return;
        setUserInfo((prev: any) => ({
          ...prev,
          designerStack: [...prev.designerStack, selectedDesigner],
        }));
        break;
      case 'developerStack':
        if (developerStack.includes(selectedDeveloper)) return;
        setUserInfo((prev: any) => ({
          ...prev,
          developerStack: [...prev.developerStack, selectedDeveloper],
        }));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <MobileSkillStackWrapper>
        <MobileSkillCategoryBox>
          <MobileSkillSelectBox>
            <MobileSkillStackName>기획</MobileSkillStackName>
            <SkillSelectInput
              defaultValue={selectedPlanner}
              name="plannerStack"
              onChange={handleSectionChange}
            >
              {products.map((product: string) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </SkillSelectInput>
            <SkillAddButton
              name="plannerStack"
              onClick={handleAddStackButtonClick}
            >
              ＋
            </SkillAddButton>
          </MobileSkillSelectBox>
          <MobileSkillSelectedStackList>
            {plannerStack.map((planner: string) => (
              <SkillButton
                key={planner}
                name={planner}
                type="plannerStack"
                setValue={setUserInfo}
              />
            ))}
          </MobileSkillSelectedStackList>
        </MobileSkillCategoryBox>
        <MobileSkillCategoryBox>
          <MobileSkillSelectBox>
            <MobileSkillStackName>디자인</MobileSkillStackName>
            <SkillSelectInput
              defaultValue={selectedDesigner}
              name="designerStack"
              onChange={handleSectionChange}
            >
              {designs.map((product: string) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </SkillSelectInput>
            <SkillAddButton
              name="designerStack"
              onClick={handleAddStackButtonClick}
            >
              ＋
            </SkillAddButton>
          </MobileSkillSelectBox>
          <MobileSkillSelectedStackList>
            {designerStack.map((designer: string) => (
              <SkillButton
                key={designer}
                name={designer}
                type="designerStack"
                setValue={setUserInfo}
              />
            ))}
          </MobileSkillSelectedStackList>
        </MobileSkillCategoryBox>
        <MobileSkillCategoryBox>
          <MobileSkillSelectBox>
            <MobileSkillStackName>개발</MobileSkillStackName>
            <SkillSelectInput
              defaultValue={selectedDeveloper}
              name="developerStack"
              onChange={handleSectionChange}
            >
              {develops.map((product: string) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </SkillSelectInput>
            <SkillAddButton
              name="developerStack"
              onClick={handleAddStackButtonClick}
            >
              ＋
            </SkillAddButton>
          </MobileSkillSelectBox>
          <MobileSkillSelectedStackList>
            {developerStack.map((developer: string) => (
              <SkillButton
                key={developer}
                name={developer}
                type="developerStack"
                setValue={setUserInfo}
              />
            ))}
          </MobileSkillSelectedStackList>
        </MobileSkillCategoryBox>
      </MobileSkillStackWrapper>
    </div>
  );
};

export default MobileSkillStackList;

const MobileSkillStackWrapper = styled(WritePageMobileStakCategoryBox)``;
const MobileSkillSelectBox = styled(WritePageMobileStackNameBox)``;
const MobileSkillStackName = styled(WritePageMobileStackName)``;
const MobileSkillCategoryBox = styled(WritePageMobileStakCategoryBox)`
  &:not(:last-of-type) {
    margin-bottom: 1.625rem;
  }
`;
const SkillSelectInput = styled(WritePageMobileSelectInput)``;
const SkillAddButton = styled(WritePageMobileBodyAddButton)``;
const MobileSkillSelectedStackList = styled(WritePageMobileStackSkillBox)``;
