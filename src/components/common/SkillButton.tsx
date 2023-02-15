import { memo, useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';

interface props {
  name: string;
  value?: string[];
  isChecked?: boolean;
  setValue?: any;
  type?: string;
}

const SkillButton = ({ name, value, isChecked, setValue, type }: props) => {
  const [isActive, setIsActive] = useState(false);

  const handleActiveButton = useCallback(() => {
    setIsActive((prev: boolean) => !prev);
    if (!value) return;
    if (!type) return;
    if (!value.includes(name)) {
      setValue((prev: any) => {
        return {
          ...prev,
          [type]: [...prev[type], name],
        };
      });
      return;
    }
    setValue((prev: any) => {
      return {
        ...prev,
        [type]: prev[type].filter((item: string) => item !== name),
      };
    });
  }, [name, setValue, type, value]);

  useEffect(() => {
    if (isChecked) {
      setIsActive(true);
    }
  }, [isChecked]);

  return (
    <SkillButtonContainer>
      <SkillBtn type="button" isActive={isActive} onClick={handleActiveButton}>
        {name}
      </SkillBtn>
    </SkillButtonContainer>
  );
};

const SkillButtonContainer = styled.div``;
const SkillBtn = styled.button`
  background-color: ${(props: { isActive: boolean }) =>
    props.isActive === true ? '#5D50F0' : '#f2f4f6'};
  color: ${(props: { isActive: boolean }) =>
    props.isActive === true ? '#ffffff' : '#000000'};

  font-weight: 400;
  font-size: 12px;
  line-height: 32px;

  height: 2rem;

  display: flex;
  align-items: center;

  border-radius: 32px;
  padding: 5px 15px;
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.05);
  }
`;

export default memo(SkillButton);
