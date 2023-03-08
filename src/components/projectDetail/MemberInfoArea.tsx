import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { logEvent } from 'utils/amplitude';
import { useNavigate } from 'react-router-dom';
import ParticipantsProfile from './ParticipantsProfile';

const MemberInfoArea = ({ applicantsData }: any) => {
  const navigate = useNavigate();
  if (applicantsData === undefined) applicantsData = {};

  const participantsData = Object?.keys(applicantsData).filter((key) => {
    return applicantsData?.[key]?.recruit === true;
  });

  const handlePosition = (position: string) => {
    return Object?.keys(applicantsData).filter((key) => {
      return (
        applicantsData?.[key]?.recruit === true &&
        applicantsData?.[key]?.position === position
      );
    });
  };

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
        {participantsData.length <= 0 ? (
          <NodataMessage>아직 모집 중이에요 :/</NodataMessage>
        ) : (
          <MemberInfoBox>
            {handlePosition('기획').length > 0 && (
              <MemberInfoDiv>
                <PositionDiv>기획</PositionDiv>

                {participantsData?.map((key) => {
                  if (applicantsData[key].position === '기획')
                    return (
                      <ParticipantsProfile
                        key={key}
                        LinkToPublicProfile={onClickEvent}
                        participantsUid={applicantsData[key].uid}
                      />
                    );
                })}
              </MemberInfoDiv>
            )}
            {handlePosition('디자인').length > 0 && (
              <MemberInfoDiv>
                <PositionDiv>디자인</PositionDiv>
                {participantsData.map((key) => {
                  if (applicantsData[key].position === '디자인')
                    return (
                      <ParticipantsProfile
                        key={key}
                        LinkToPublicProfile={onClickEvent}
                        participantsUid={applicantsData[key].uid}
                      />
                    );
                })}
              </MemberInfoDiv>
            )}
            {handlePosition('프론트엔드').length > 0 && (
              <MemberInfoDiv>
                <PositionDiv>프론트</PositionDiv>

                {participantsData.map((key) => {
                  if (applicantsData[key].position === '프론트엔드')
                    return (
                      <ParticipantsProfile
                        key={key}
                        LinkToPublicProfile={onClickEvent}
                        participantsUid={applicantsData[key].uid}
                      />
                    );
                })}
              </MemberInfoDiv>
            )}
            {handlePosition('백엔드').length > 0 && (
              <MemberInfoDiv>
                <PositionDiv>백엔드</PositionDiv>

                {participantsData.map((key) => {
                  if (applicantsData[key].position === '백엔드')
                    return (
                      <ParticipantsProfile
                        key={key}
                        LinkToPublicProfile={onClickEvent}
                        participantsUid={applicantsData[key].uid}
                      />
                    );
                })}
              </MemberInfoDiv>
            )}
          </MemberInfoBox>
        )}
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
  background: ${COLORS.violetB400};
  border-radius: 0.625rem;
`;

const NodataMessage = styled.p`
  display: flex;
  justify-content: center;
  padding: 6rem 0;
  font-size: 2rem;
  font-weight: 700;
  margin-top: 0.375rem;
  color: ${COLORS.gray200};
  background-color: ${COLORS.white};
  cursor: default;
`;
