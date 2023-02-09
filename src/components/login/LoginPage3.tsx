import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useLoginModal } from 'hooks';
import defaultImage from 'assets/images/default_profile.jpg';

// 페이지 3 : 프로필 사진, 닉네임 변경
export default function LoginPage3() {
  const { openModal } = useLoginModal();

  // 확인 버튼 클릭 시 페이지 이동
  const handleNextButtonClick = () => {
    openModal('login', 4);
  };

  return (
    <Container>
      <TextContainer>
        <SubText onClick={handleNextButtonClick}>
          나를 찾는 팀원이 많아지는 방법!
        </SubText>
        <TitleText>팀원들에게 소개할 프로필을 입력해주세요</TitleText>
      </TextContainer>
      <ProfileContainer>
        <ProfileImageContainer>
          <ProfileImage src={defaultImage} />
          <ButtonContainer>
            {['수정', '삭제'].map((text) => (
              <Button key={text} text={text}>
                {text}
              </Button>
            ))}
          </ButtonContainer>
        </ProfileImageContainer>
        <NicknameContainer>
          <NicknameLabel>
            닉네임
            <NicknameInput placeholder="입력해주세요" type="text" name="name" />
          </NicknameLabel>
        </NicknameContainer>
      </ProfileContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100%;

  padding: 5rem 5.5rem;
`;

const TextContainer = styled.div`
  width: 18rem;
  height: 8.3125rem;
  margin-bottom: 1.625rem;
`;

const SubText = styled.h3`
  color: ${COLORS.gray750};

  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;

  margin-bottom: 1.3125rem;
`;

const TitleText = styled.h2`
  font-weight: 700;
  font-size: 1.75rem;
  line-height: 2.75rem;

  color: ${COLORS.gray850};

  word-break: keep-all; // 단어 단위로 줄바꿈
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileImageContainer = styled.div`
  width: 8.75rem;
  height: 13.375rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProfileImage = styled.img`
  width: 8.75rem;
  height: 8.75rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button<{ text: string }>`
  background-color: ${({ text }) =>
    text === '수정' ? COLORS.violetB400 : COLORS.gray300};
  font-weight: ${({ text }) => (text === '수정' ? 700 : 400)};

  color: ${COLORS.white};

  padding: 8px 16px;
  gap: 10px;

  width: 3.875rem;
  height: 3rem;

  border-radius: 0.25rem;

  &:hover {
    transform: scale(1.05);
    transition: 100ms ease-in-out;
  }
`;

const NicknameContainer = styled.div``;

const NicknameLabel = styled.label`
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.75rem;

  display: flex;
  align-items: center;
  letter-spacing: -0.02em;

  color: #383838;
`;

const NicknameInput = styled.input`
  padding: 10px 20px;

  width: 17.375rem;
  height: 2.75rem;

  background: ${COLORS.white};

  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;

  margin-left: 1.4375rem;

  ::placeholder {
    color: ${COLORS.gray300};
  }
`;
