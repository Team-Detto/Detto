import { ChangeEvent, Dispatch, useState } from 'react';
import { EditType } from 'types/write/writeType';

interface Props {
  plannerStack: string[];
  designerStack: string[];
  developerStack: string[];
  setEditFormValue: Dispatch<React.SetStateAction<EditType.EditFormType>>;
}

const useSelectEditStack = ({
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
  return {
    selectedPlanner,
    selectedDesigner,
    selectedDeveloper,
    handleSectionChange,
    handleAddStackButtonClick,
  };
};

export default useSelectEditStack;
