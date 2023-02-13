import styled from '@emotion/styled';
import MyPageProfileImage from './MyPageProfileImage';
import PositionCheckBox from './PositionCheckBox';
import SkillList from './SkillList';
import COLORS from 'assets/styles/colors';
import { designs, develops, products } from 'utils/skills';
import Careers from './Careers';
import { useState } from 'react';

interface MypageInfoProps {
  user: User;
  uid: string;
}

const MyPageInfo = ({ user, uid }: MypageInfoProps) => {
  const [profileImg, setProfileImg] = useState<string>(user?.photoURL);

  // TODO :: 개인정보 수정 버튼 눌렀을 경우 DB 업데이트 필요

  // TODO :: 로그인에서도 프로필 변경 로직 쓸 수 있도록 빼기

  return (
    <MyPageTopContainer>
      <MypageInfoTopContainer>
        <MyPageProfileImage
          profileImg={profileImg}
          setProfileImg={setProfileImg}
          uid={uid}
        />
        <InfoWrapper>
          <InfoItemDiv>
            <InfoTitle htmlFor="nickname">닉네임</InfoTitle>
            <InfoNicknameInput
              type="text"
              defaultValue={user?.displayName || ''}
            />
          </InfoItemDiv>
          <InfoItemDiv>
            <InfoTitle>경력</InfoTitle>
            <Careers isJunior={user?.isJunior} />
          </InfoItemDiv>
          <InfoItemDiv>
            <InfoTitle>포지션</InfoTitle>
            <PositionCheckBox userPoisitons={user?.positions} />
          </InfoItemDiv>
        </InfoWrapper>
      </MypageInfoTopContainer>
      <MyPageSkillsWrapper>
        <MyPageSkillsTitle>기술스택</MyPageSkillsTitle>
        <MypageSkillBox>
          <SkillList
            category="기획"
            skills={products}
            checkedSkills={user?.plannerStack}
          />
          <SkillList
            category="디자인"
            skills={designs}
            checkedSkills={user?.designerStack}
          />
          <SkillList
            category="개발"
            skills={develops}
            checkedSkills={user?.developerStack}
          />
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
