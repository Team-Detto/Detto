import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { getUserInfoData } from 'apis/mypageUsers';
import { staleTime } from 'utils/staleTime';

interface Props {
  LinkToPublicProfile?: (uid: string) => void;
  participantsUid: string;
  version?: 'web' | 'mobile';
}

const ParticipantsProfile = ({
  LinkToPublicProfile,
  participantsUid,
  version = 'web',
}: Props) => {
  // 유저 정보 받아오는 쿼리
  const { data: applierInfoData } = useQuery({
    queryKey: ['users', participantsUid],
    queryFn: getUserInfoData,
    staleTime: staleTime.users,
  });

  return (
    <ProjectMemberItem version={version}>
      <MemberProfileImg
        onClick={() =>
          LinkToPublicProfile ? LinkToPublicProfile(participantsUid) : null
        }
        src={applierInfoData?.photoURL}
        alt={applierInfoData?.displayName}
        referrerPolicy="no-referrer"
      />
    </ProjectMemberItem>
  );
};
export default ParticipantsProfile;

const MemberProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  z-index: 0;
`;
const ProjectMemberItem = styled.li<{ version: string }>`
  width: ${({ version }) => (version === 'mobile' ? '2rem' : '2.6rem')};
  height: ${({ version }) => (version === 'mobile' ? '2rem' : '2.6rem')};
  border-radius: 50%;
  overflow: hidden;
  margin-top: 0.3rem;
  list-style-type: none;
`;
