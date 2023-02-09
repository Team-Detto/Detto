import styled from '@emotion/styled';
import SkillButton from 'components/common/SkillButton';
import MyPageProfileImage from './MyPageProfileImage';
import COLORS from 'assets/styles/colors';
import { develops, products } from 'utils/skills';
import CareerRadioInput from './CareerRadioInput';
import PositionCheckBox, { ButtonsWrapper } from './PositionCheckBox';

const MyPageInfo = () => {
  return (
    <MyPageTopContainer>
      <MypageInfoTopContainer>
        <MyPageProfileImage />
        <InfoWrapper>
          <InfoItemDiv>
            <InfoTitle htmlFor="nickname">닉네임</InfoTitle>
            <InfoNicknameInput type="text" defaultValue={'데토'} />
          </InfoItemDiv>
          <InfoItemDiv>
            <InfoTitle>경력</InfoTitle>
            <CareerRadioInput />
          </InfoItemDiv>
          <InfoItemDiv>
            <InfoTitle>포지션</InfoTitle>
            <PositionCheckBox />
          </InfoItemDiv>
        </InfoWrapper>
      </MypageInfoTopContainer>
      <MyPageSkillsWrapper>
        <MyPageSkillsTitle>기술스택</MyPageSkillsTitle>
        <MypageSkillBox>
          <SkillTitle>기획 디자인</SkillTitle>
          <ButtonsWrapper>
            {products.map((product) => (
              <SkillButton key={product} name={product} />
            ))}
          </ButtonsWrapper>
          <SkillTitle>개발</SkillTitle>
          <ButtonsWrapper>
            {develops.map((product) => (
              <SkillButton key={product} name={product} />
            ))}
          </ButtonsWrapper>
        </MypageSkillBox>
      </MyPageSkillsWrapper>
      <InfoEditConfirmWrapper>
        <InfoEditConfirmBtn>개인정보 수정 완료</InfoEditConfirmBtn>
      </InfoEditConfirmWrapper>
    </MyPageTopContainer>
  );
};

export default MyPageInfo;

const MyPageTopContainer = styled.div``;

const MypageInfoTopContainer = styled.div`
  padding-top: 14.875rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const InfoWrapper = styled.div``;

const InfoItemDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.25rem;
`;

const InfoTitle = styled.label`
  display: block;
  width: 4rem;
  font-size: 1.25rem;
  color: #383838;
  text-align: right;
  margin-right: 3rem;
`;

const InfoNicknameInput = styled.input`
  width: 22rem;
  padding: 0.625rem 1.25rem;
  border: 1px solid #ced3db;
  border-radius: 4px;
`;

const MyPageSkillsWrapper = styled.div`
  margin-top: 3.125rem;
`;

const MyPageSkillsTitle = styled.h2`
  font-size: 1.75rem;
  color: #383838;
  margin-bottom: 1.5rem;
`;

const MypageSkillBox = styled.div``;

const SkillTitle = styled.p`
  font-size: 0.75rem;
  color: ${COLORS.gray850};
  margin-bottom: 0.5625rem;
`;

const InfoEditConfirmWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 4.875rem;
`;

const InfoEditConfirmBtn = styled.button`
  margin-top: 4.875rem;
  width: 14.375rem;
  height: 3rem;
  border-radius: 4px;
  background-color: ${COLORS.gray100};
  color: ${COLORS.gray750};
`;
