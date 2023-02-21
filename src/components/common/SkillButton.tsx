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
        {name}
      </SkillBtn>
    </SkillButtonContainer>
  );
};

const SkillButtonContainer = styled.div``;
const SkillBtn = styled.button`
  background-color: ${(props: { isActive: boolean }) =>
    props.isActive === true ? `${COLORS.violetB500}` : `${COLORS.gray100}`};
  color: ${(props: { isActive: boolean }) =>
    props.isActive === true ? `${COLORS.white}` : `${COLORS.black}`};
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  border-radius: 2rem;
  padding: 0.3125rem 0.9375rem;
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

export default memo(SkillButton);
