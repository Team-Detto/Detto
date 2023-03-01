import { memo, useState, useEffect, useCallback } from 'react';
import { useIsMobile } from 'hooks';
import { useSetRecoilState } from 'recoil';
import { mypageInfoButtonActiveState } from '../../recoil/atoms';
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

  const handleCancelButtonMobile = useCallback(() => {
    if (!type) return;
    if (!setValue) return;
    if (['plannerStack', 'designerStack', 'developerStack'].includes(type)) {
      setValue((prev: any) => ({
        ...prev,
        [type]: prev[type].filter((item: string) => item !== name),
      }));
    }
  }, [type, name, setValue]);

  useEffect(() => {
    if (isChecked) {
      setIsActive(true);
    }
  }, [isChecked]);

  if (isMobile) {
    return (
      <WritePageMobileStackButtonBox>
        <WritePageMobileStackSkill>{name}</WritePageMobileStackSkill>
        <WritePageMobileStackSkillCancel onClick={handleCancelButtonMobile}>
          ⅹ
        </WritePageMobileStackSkillCancel>
      </WritePageMobileStackButtonBox>
    );
  }

  return (
    <SkillButtonContainer>
      <SkillBtn type="button" isActive={isActive} onClick={handleActiveButton}>
        <SkillIconWrapper>
          <SkillIcon
            src={require(`../../assets/images/icon_skills/icon_skill_${name.toLowerCase()}.jpg`)}
            alt={name}
          />
        </SkillIconWrapper>
        {name}
      </SkillBtn>
    </SkillButtonContainer>
  );
};

const SkillButtonContainer = styled.div``;
const SkillBtn = styled.button<{ isActive: boolean }>`
  background-color: ${COLORS.gray100};
  color: ${({ isActive }) => {
    return isActive === true ? `${COLORS.violetB500}` : `${COLORS.black}`;
  }};
  font-weight: ${({ isActive }) => (isActive === true ? '700' : '400')};
  font-size: 0.75rem;
  line-height: 2rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  border-radius: 2rem;
  border: ${({ isActive }) =>
    isActive === true ? `1px solid ${COLORS.violetB500}` : `none`};
  padding: 0.5938rem 1.25rem 0.5938rem 0.625rem;
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.05);
  }
`;
const WritePageMobileStackButtonBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.1rem;
`;
const WritePageMobileStackSkill = styled.button`
  display: block;
  width: 4.6rem;
  height: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 12px;
  font-weight: 400;
  font-size: 0.625rem;
  line-height: 2rem;
  border-radius: 12px;
  color: ${COLORS.black};
  background-color: ${COLORS.gray100};
`;
const WritePageMobileStackSkillCancel = styled.button`
  width: 1rem;
  height: 1rem;
  border-radius: 3.125rem;
  font-weight: 500;
  font-size: 0.625rem;
  padding-bottom: 0.3rem;
  color: ${COLORS.white};
  background-color: ${COLORS.gray300};
`;

export const SkillIconWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.5rem;
`;

export const SkillIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export default memo(SkillButton);
