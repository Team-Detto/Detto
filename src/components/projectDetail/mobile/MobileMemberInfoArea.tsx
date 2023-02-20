import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useNavigate } from 'react-router-dom';

const MobileMemberInfoArea = ({ applicantsData }: any) => {
  const navigate = useNavigate();
  if (applicantsData === undefined) applicantsData = {};

  const data = Object?.keys(applicantsData).filter((key) => {
    return applicantsData?.[key]?.recruit === true;
  });

  return (
    <>
      <MobileMemberInfoAreaContainer>
        <MemberInfoTitle>현재 참여중인 인원</MemberInfoTitle>
        <MemberInfoWrapper>
          <MemberInfoObject>
            <MemberInfoKey>기획</MemberInfoKey>
            {data?.map((key) => {
              console.log(applicantsData[key]);
              if (applicantsData[key].position === '기획')
                return (
                  <>
                    <div key={key}>
                      <MemberProfileImg
                        key={key}
                        onClick={() =>
                          navigate(`/profile/${applicantsData[key].uid}`)
                        }
                        src={applicantsData[key].profileURL}
                      ></MemberProfileImg>
                    </div>
                    {/* <HoverText>{applicantsData[key].displayName}</HoverText> */}
                  </>
                );
            })}
          </MemberInfoObject>
          <MemberInfoObject>
            <MemberInfoKey>개발</MemberInfoKey>
            {data?.map((key) => {
              if (
                applicantsData[key].position === '프론트엔드' ||
                applicantsData[key].position === '백엔드'
              )
                return (
                  <>
                    <div key={key}>
                      <MemberProfileImg
                        key={key}
                        onClick={() =>
                          navigate(`/profile/${applicantsData[key].uid}`)
                        }
                        src={applicantsData[key].profileURL}
                      ></MemberProfileImg>
                    </div>
                    {/* <HoverText>{applicantsData[key].displayName}</HoverText> */}
                  </>
                );
            })}
          </MemberInfoObject>
          <MemberInfoObject>
            <MemberInfoKey>디자인</MemberInfoKey>
            {data?.map((key) => {
              console.log(applicantsData[key]);
              if (applicantsData[key].position === '디자인')
                return (
                  <>
                    <div key={key}>
                      <MemberProfileImg
                        key={key}
                        onClick={() =>
                          navigate(`/profile/${applicantsData[key].uid}`)
                        }
                        src={applicantsData[key].profileURL}
                      ></MemberProfileImg>
                    </div>
                    {/* <HoverText>{applicantsData[key].displayName}</HoverText> */}
                  </>
                );
            })}
          </MemberInfoObject>
        </MemberInfoWrapper>
      </MobileMemberInfoAreaContainer>
    </>
  );
};

export default MobileMemberInfoArea;

const MobileMemberInfoAreaContainer = styled.div`
  margin-top: 22px;
`;
const MemberInfoTitle = styled.div`
  font-size: 12px;
  margin-left: 16px;
`;
const MemberInfoWrapper = styled.div`
  height: 198px;
  margin-top: 6px;
  background: ${COLORS.white};
  padding: 23px 17px 37px 17px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const MemberInfoObject = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 18px;
`;
const MemberInfoKey = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;

  width: 60px;
  height: 28px;

  background: ${COLORS.violetB400};
  border-radius: 8px;
  font-size: 12px;
  color: ${COLORS.white};
`;
const MemberProfileImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;
