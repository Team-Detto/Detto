import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { DocumentData } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { logEvent } from 'utils/amplitude';
import ParticipantsProfile from '../ParticipantsProfile';

const MobileMemberInfoArea = ({ applicantsData }: DocumentData) => {
  const navigate = useNavigate();
  if (applicantsData === undefined) applicantsData = {};

  const data = Object?.keys(applicantsData).filter((key) => {
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
    <MobileMemberInfoAreaContainer>
      <MemberInfoTitle>현재 참여 중인 인원</MemberInfoTitle>
      {data.length <= 0 ? (
        <NodataMessage>아직 모집 중이에요 :/</NodataMessage>
      ) : (
        <MemberInfoWrapper>
          {handlePosition('기획').length > 0 && (
            <MemberInfoObject>
              <MemberInfoKey>기획</MemberInfoKey>
              {data?.map((key) => {
                if (applicantsData[key].position === '기획')
                  return (
                    <ParticipantsProfile
                      key={key}
                      LinkToPublicProfile={onClickEvent}
                      participantsUid={applicantsData[key].uid}
                      version="mobile"
                    />
                  );
              })}
            </MemberInfoObject>
          )}
          {handlePosition('디자인').length > 0 && (
            <MemberInfoObject>
              <MemberInfoKey>디자인</MemberInfoKey>
              {data?.map((key) => {
                if (applicantsData[key].position === '디자인')
                  return (
                    <ParticipantsProfile
                      key={key}
                      LinkToPublicProfile={onClickEvent}
                      participantsUid={applicantsData[key].uid}
                      version="mobile"
                    />
                  );
              })}
            </MemberInfoObject>
          )}
          {handlePosition('프론트엔드').length > 0 && (
            <MemberInfoObject>
              <MemberInfoKey>프론트</MemberInfoKey>
              {data?.map((key) => {
                if (applicantsData[key].position === '프론트엔드')
                  return (
                    <ParticipantsProfile
                      key={key}
                      LinkToPublicProfile={onClickEvent}
                      participantsUid={applicantsData[key].uid}
                      version="mobile"
                    />
                  );
              })}
            </MemberInfoObject>
          )}
          {handlePosition('백엔드').length > 0 && (
            <MemberInfoObject>
              <MemberInfoKey>백엔드</MemberInfoKey>
              {data?.map((key) => {
                if (applicantsData[key].position === '백엔드')
                  return (
                    <ParticipantsProfile
                      key={key}
                      LinkToPublicProfile={onClickEvent}
                      participantsUid={applicantsData[key].uid}
                      version="mobile"
                    />
                  );
              })}
            </MemberInfoObject>
          )}
        </MemberInfoWrapper>
      )}
    </MobileMemberInfoAreaContainer>
  );
};

export default MobileMemberInfoArea;

const MobileMemberInfoAreaContainer = styled.div`
  margin-top: 1.125rem;
`;
const MemberInfoTitle = styled.div`
  font-size: 0.75rem;
  margin-left: 1rem;
`;
const MemberInfoWrapper = styled.div`
  height: 100%;
  margin-top: 0.375rem;
  background: ${COLORS.white};
  padding: 1.4375rem 1.0625rem 2.3125rem 1.0625rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;
const MemberInfoObject = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0rem;
  gap: 1.125rem;
  height: 2.5rem;
`;
const MemberInfoKey = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0rem;
  gap: 0.625rem;

  width: 3.75rem;
  height: 1.75rem;

  background: ${COLORS.violetB400};
  border-radius: 0.5rem;
  font-size: 0.75rem;
  color: ${COLORS.white};
`;

const MemberProfileImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
`;

const NodataMessage = styled.p`
  display: flex;
  justify-content: center;
  padding: 4rem 0;
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 0.375rem;
  color: ${COLORS.gray200};
  background-color: ${COLORS.white};
  cursor: default;
`;
