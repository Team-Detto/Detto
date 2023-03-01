import Slider from 'react-slick';
import styled from '@emotion/styled';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import VectorPrev from 'assets/images/VectorPrev.png';
import VectorNext from 'assets/images/VectorNext.png';
import Junior from 'assets/images/junior.png';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { staleTime } from 'utils/staleTime';
import { firebaseActiveUsersRequest } from 'apis/userService';
import COLORS from 'assets/styles/colors';
import defaultProfile from 'assets/images/default_profile.jpg';
import { getCurrentPathName, logEvent } from 'utils/amplitude';

const settings = {
  centerPadding: '60px',
  slidesToShow: 3,
  slidesToScroll: 3,
  swipeToSlide: true,
  autoplay: true,
  autoplaySpeed: 4000,
};

const MobileFindUserSlider = ({ tap }: { tap: string }) => {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: firebaseActiveUsersRequest,
    staleTime: staleTime.users,
  });

  if (!users) return null;

  // 포지션 필터링
  const filteredUsers = users.filter((user) => user.positions.includes(tap));

  if (filteredUsers.length === 0) {
    return <NoDataMessage>팀원을 찾을 수 없어요 :/</NoDataMessage>;
  }

  return (
    <StyledSlider {...settings} infinite={filteredUsers.length >= 5}>
      {filteredUsers
        // 랜덤으로 섞기
        .sort(() => Math.random() - 0.5)
        .map((user: any) => (
          <Link
            onClick={() => {
              logEvent('Visit Page', {
                from: getCurrentPathName(),
                to: 'profile',
                name: 'find_user',
              });
            }}
            to={`/profile/${user.uid}`}
            key={user.uid}
          >
            <MobileCard key={user}>
              <CardImage
                src={user.photoURL || defaultProfile}
                referrerPolicy="no-referrer"
                alt={user.displayName}
              />
              <CardNickname>
                {user.isJunior && <JuniorImage src={Junior} />}{' '}
                {user.displayName}
              </CardNickname>
            </MobileCard>
          </Link>
        ))}
    </StyledSlider>
  );
};

export default MobileFindUserSlider;

const NoDataMessage = styled.div`
  display: flex;
  justify-content: center;
  padding: 4rem 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${COLORS.gray300};
`;

const StyledSlider = styled(Slider)`
  margin-top: 0.9375rem;
  .slick-arrow {
    z-index: 10;
  }
  .slick-prev {
    left: -1.5625rem;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
  .slick-prev:before {
    width: 1.5rem;
    height: 1.5rem;
    background-image: url(${VectorPrev});
    background-size: 1.5rem 1.5rem;
    display: inline-block;
    content: '';
    opacity: 1;
  }
  .slick-next {
    right: -1.5625rem;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
  .slick-next:before {
    width: 1.5rem;
    height: 1.5rem;
    background-image: url(${VectorNext});
    background-size: 1.5rem 1.5rem;
    display: inline-block;
    content: '';
    opacity: 1;
  }
`;

const MobileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 0.625rem 0;
`;

const CardImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  object-fit: cover;
`;
const CardNickname = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;

  color: ${COLORS.gray800};
`;
const JuniorImage = styled.img`
  position: absolute;
  left: -1.125rem;
  width: 0.875rem;
  height: 0.875rem;
`;
