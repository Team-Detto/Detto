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
import { firebaseAllUsersRequest } from 'apis/userService';
import COLORS from 'assets/styles/colors';

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
    queryFn: firebaseAllUsersRequest,
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
          <Link to={`/profile/${user.uid}`} key={user.uid}>
            <MobileCard key={user}>
              <CardImage src={user.photoURL} />
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
  height: 169px;
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${COLORS.gray500};
`;

const StyledSlider = styled(Slider)`
  margin: 15px 0 29px 0;
  .slick-arrow {
    z-index: 10;
  }
  .slick-prev {
    left: -25px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .slick-prev:before {
    width: 24px;
    height: 24px;
    background-image: url(${VectorPrev});
    background-size: 24px 24px;
    display: inline-block;
    content: '';
    opacity: 1;
  }
  .slick-next {
    right: -25px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .slick-next:before {
    width: 24px;
    height: 24px;
    background-image: url(${VectorNext});
    background-size: 24px 24px;
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
  gap: 6px;
  /* width: 84px;
  height: 123px; */
`;

const CardImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 100%;
`;
const CardNickname = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  height: 20px;

  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  text-align: center;

  color: ${COLORS.gray800};
`;
const JuniorImage = styled.img`
  position: absolute;
  left: -20px;
  width: 16px;
  height: 16px;
`;
