import { memo, useState, useCallback } from 'react';
import styled from '@emotion/styled';

interface props {
  name: string;
  value?: string[];
}

const SkillButton = ({ name, value }: props) => {
  const [isActive, setIsActive] = useState(false);

  const handleActiveButton = useCallback(() => {
    setIsActive((prev: boolean) => !prev);
    if (!value) return;
    if (!value.includes(name)) {
      value.push(name);
      return;
    }
    value.splice(value.indexOf(name), 1);
  }, [setIsActive]);

  return (
    <SkillButtonContainer>
      <SkillBtn isActive={isActive} onClick={handleActiveButton}>
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
  border-radius: 32px;
  padding: 5px 15px;
  transform: scale(1);
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.5s;
  }
`;

export default memo(SkillButton);
