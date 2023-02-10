import styled from '@emotion/styled';

const MemberInfoArea = () => {
  return (
    <MemberInfoWrapper>
      <MemberInfoTitle>현재 참여중인 인원</MemberInfoTitle>
      <MemberInfoBox>
        <MemberInfoDiv>
          <PositionDiv>기획</PositionDiv>
          {/*  Todo: 클릭시 공개프로필로 연결 */}
          <MemberProfileImg />
          <MemberProfileImg />
        </MemberInfoDiv>
        <MemberInfoDiv>
          <PositionDiv>개발</PositionDiv>
          <MemberProfileImg />
          <MemberProfileImg />
          <MemberProfileImg />
        </MemberInfoDiv>
        <MemberInfoDiv>
          <PositionDiv>디자인</PositionDiv>
          <MemberProfileImg />
          <MemberProfileImg />
        </MemberInfoDiv>
      </MemberInfoBox>
    </MemberInfoWrapper>
  );
};

export default MemberInfoArea;

const MemberInfoWrapper = styled.div`
  width: 63.625rem;
  height: 22.75rem;
  margin-top: 2.75rem;
  display: flex;
  flex-direction: column;
`;

const MemberInfoTitle = styled.div`
  height: 2rem;
  font-weight: 500;
  font-size: 1.25rem;
`;

const MemberInfoBox = styled.div`
  height: 100%;
  margin: 2.25rem 0 1.25rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MemberInfoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const PositionDiv = styled.div`
  font-size: 1.5rem;
  background-color: #6f64f2;
  width: 7.9375rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 1.125rem;
`;

const MemberProfileImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #aaaaaa;
`;
