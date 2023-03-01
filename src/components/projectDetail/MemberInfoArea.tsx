import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { logEvent } from 'utils/amplitude';

const MemberInfoArea = ({ applicantsData }: any) => {
  const navigate = useNavigate();
  if (applicantsData === undefined) applicantsData = {};

  const data = Object?.keys(applicantsData).filter((key) => {
    return applicantsData?.[key]?.recruit === true;
  });

  const onClickEvent = (uid: string) => {
    navigate(`/profile/${uid}`);
    logEvent('Button Click', {
      from: `project_detail`, //pathname으로 하면 이동한페이지로 인식해서 수정
      to: 'profile',
      name: 'profile',
    });
  };

  return (
    <>
      <MemberInfoWrapper>
        <MemberInfoTitle>현재 참여 중인 인원</MemberInfoTitle>
        <MemberInfoBox>
          <MemberInfoDiv>
            <PositionDiv>기획</PositionDiv>
            {data?.map((key) => {
              if (applicantsData[key].position === '기획')
                return (
                  <Div key={key}>
                    <MemberProfileImg
                      key={key}
                      onClick={() => onClickEvent(applicantsData[key].uid)}
                      src={applicantsData[key].profileURL}
                      referrerPolicy="no-referrer"
                    ></MemberProfileImg>
                    <HoverText>{applicantsData[key].displayName}</HoverText>
                  </Div>
                );
            })}
          </MemberInfoDiv>
          <MemberInfoDiv>
            <PositionDiv>디자인</PositionDiv>
            {data.map((key) => {
              if (applicantsData[key].position === '디자인')
                return (
                  <Div key={key}>
                    <MemberProfileImg
                      onClick={() => onClickEvent(applicantsData[key].uid)}
                      src={applicantsData[key].profileURL}
                      referrerPolicy="no-referrer"
                    ></MemberProfileImg>
                    <HoverText>{applicantsData[key].displayName}</HoverText>
                  </Div>
                );
            })}
          </MemberInfoDiv>
          <MemberInfoDiv>
            <PositionDiv>프론트</PositionDiv>

            {data.map((key) => {
              if (applicantsData[key].position === '프론트엔드')
                return (
                  <Div key={key}>
                    <MemberProfileImg
                      onClick={() => onClickEvent(applicantsData[key].uid)}
                      src={applicantsData[key].profileURL}
                      referrerPolicy="no-referrer"
                    ></MemberProfileImg>
                    <HoverText>{applicantsData[key].displayName}</HoverText>
                  </Div>
                );
            })}
          </MemberInfoDiv>
          <MemberInfoDiv>
            <PositionDiv>백엔드</PositionDiv>

            {data.map((key) => {
              if (applicantsData[key].position === '백엔드')
                return (
                  <Div key={key}>
                    <MemberProfileImg
                      key={key}
                      onClick={() => onClickEvent(applicantsData[key].uid)}
                      src={applicantsData[key].profileURL}
                      referrerPolicy="no-referrer"
                    ></MemberProfileImg>
                    <HoverText>{applicantsData[key].displayName}</HoverText>
                  </Div>
                );
            })}
          </MemberInfoDiv>
        </MemberInfoBox>
      </MemberInfoWrapper>
    </>
  );
};

export default MemberInfoArea;

const MemberInfoWrapper = styled.div`
  width: 63.625rem;
  height: 100%;
  margin-top: 2.75rem;
  display: flex;
  flex-direction: column;
`;

const MemberInfoTitle = styled.div`
  height: 2rem;
  font-weight: 500;
  font-size: 1.125rem;
  color: #383838;
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
  height: 4.25rem;
`;

const PositionDiv = styled.div`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${COLORS.white};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.5rem;
  gap: 0.625rem;

  width: 4.125rem;
  height: 2.0625rem;

  /* violet B 400 */

  background: #6f64f2;
  border-radius: 0.625rem;
`;

const MemberProfileImg = styled.img`
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
  /* position: relative; */
  object-fit: cover;

  z-index: 0;
`;

const HoverText = styled.div`
  position: absolute;
  top: 70%;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  height: ${(props: { children: string }) =>
    props.children.length > 5 ? '100%' : '1.875rem'};
  border-radius: 0.625rem;
  background-color: ${COLORS.white};
  box-shadow: 0.0313rem 0.0313rem 0.625rem 0.1rem ${COLORS.violetB300};
  color: ${COLORS.black};
  z-index: 999;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;

  display: none;
`;

const Div = styled.div`
  position: relative;
  width: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 0;
  :hover > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
