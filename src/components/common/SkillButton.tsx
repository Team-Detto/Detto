import { memo, useState, useEffect, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { mypageInfoButtonActiveState } from '../../recoil/atoms';
import { useIsMobile } from 'hooks';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

interface props {
  name: string;
  value?: string[];
  isChecked?: boolean;
  setValue?: any;
  type?: string;
}

const SkillButton = ({ name, value, isChecked, setValue, type }: props) => {
  const [isActive, setIsActive] = useState(false);
  const setActiveInfoButton = useSetRecoilState(mypageInfoButtonActiveState);
  const isMobile = useIsMobile();

  const handleActiveButton = useCallback(() => {
    setActiveInfoButton(true);
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
      <SkillBtn
        type="button"
        isActive={isActive}
        isMobile={isMobile}
        onClick={handleActiveButton}
      >
        {name}
      </SkillBtn>
    </SkillButtonContainer>
  );
};

const SkillButtonContainer = styled.div``;
const SkillBtn = styled.button<{ isActive: boolean; isMobile: boolean }>`
  background-color: ${(props: { isActive: boolean }) =>
    props.isActive === true ? `${COLORS.violetB500}` : `${COLORS.gray100}`};
  color: ${(props: { isActive: boolean }) =>
    props.isActive === true ? `${COLORS.white}` : `${COLORS.black}`};
  font-weight: 400;
  font-size: ${({ isMobile }) => (isMobile ? '0.625rem' : '0.75rem')};
  line-height: 32px;
  height: ${({ isMobile }) => (isMobile ? '1.625rem' : '2rem')};
  display: flex;
  align-items: center;
  border-radius: 32px;
  padding: ${({ isMobile }) =>
    isMobile ? '0rem 0.5rem' : '0.3125rem 0.9375rem'};
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.05);
  }
`;

export default memo(SkillButton);
