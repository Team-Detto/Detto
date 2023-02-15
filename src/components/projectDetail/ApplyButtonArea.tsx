import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { updateRecruiting } from 'apis/postDetail';
import COLORS from 'assets/styles/colors';
import { useAuth } from 'hooks';
import { useState } from 'react';

const ApplyButtonArea = ({ projectData, pid, onOpenButtonClickEvent }: any) => {
  const { uid } = useAuth();
  const [ButtonTitle, setButtonTitle] = useState('');
  const [isRecruiting, setIsRecruiting] = useState<any>(
    projectData?.isRecruiting,
  );
  console.log('pid ', pid);

  const { mutate: updateRecruitingMutate } = useMutation(() =>
    updateRecruiting(pid, isRecruiting),
  );

  const handleAuthorButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('1', isRecruiting);
    setIsRecruiting(!isRecruiting);
  };

  const handleApplyButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();

    //TODO: myprojects에서 지원한 프로젝트인지 확인 후 지원하기/지원취소하기 버튼 변경
    setButtonTitle(
      ButtonTitle === '간단 지원하기' ? '지원 취소하기' : '간단 지원하기',
    );
  };
  return (
    <ButtonWrapper>
      <ApplyButton
        onClick={(e) => {
          onOpenButtonClickEvent();
          if (uid === projectData.uid) {
            handleAuthorButtonClick(e);
            console.log('2', isRecruiting);
            updateRecruitingMutate(pid, isRecruiting);

            console.log('test');
          } else handleApplyButtonClick(e);
        }}
        backgroundColor={
          ButtonTitle === '간단 지원하기' || '지원공고 마감하기'
            ? `${COLORS.violetB400}`
            : '#464646' //색상표에 없는데 사용되고 있음. 문의하기
        }
      >
        {uid === projectData.uid ? '지원공고 마감하기' : '간단 지원하기'}
      </ApplyButton>
    </ButtonWrapper>
  );
};

export default ApplyButtonArea;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3.5rem;
`;

const ApplyButton = styled.button<{ backgroundColor: string }>`
  width: 32.5625rem;
  height: 5.5rem;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 2.25rem;
  font-size: 1.75rem;
  color: ${COLORS.white};
`;
