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
import { firebaseRandomActiveUsersRequest } from 'apis/userService';
import COLORS from 'assets/styles/colors';
import { getCurrentPathName, logEvent } from 'utils/amplitude';

const settings = {
  centerPadding: '60px',
  slidesToShow: 5,
  slidesToScroll: 5,
  swipeToSlide: true,
  autoplay: true,
  autoplaySpeed: 4000,
};

const FindUserSlider = ({ tap }: { tap: string }) => {
  const { data: users } = useQuery({
    queryKey: ['users', 'random'],
    queryFn: firebaseRandomActiveUsersRequest,
    staleTime: staleTime.randomUsers,
  });

  if (!users) return null;

  // 포지션 필터링
  const filteredUsers = users.filter((user) => user.positions.includes(tap));

  if (filteredUsers.length === 0) {
    return <NoDataMessage>팀원을 찾을 수 없어요 :/</NoDataMessage>;
  }

  return (
    <StyledSlider {...settings} infinite={filteredUsers.length >= 5}>
      {filteredUsers.map((user: any) => (
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
          <Card key={user}>
            <CardImage
              src={user.photoURL}
              alt={user.displayName}
              referrerPolicy="no-referrer"
            />
            <CardNickname>
              {user.isJunior && <JuniorImage src={Junior} alt="주니어" />}{' '}
              {user.displayName}
            </CardNickname>
          </Card>
        </Link>
      ))}
    </StyledSlider>
  );
};

export default FindUserSlider;

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
  margin: 0 134px;
  .slick-arrow {
    z-index: 10;
  }
  .slick-prev {
    left: -134px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
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
    right: -134px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
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

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const CardImage = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 100%;
  object-fit: cover;
`;

const CardNickname = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  height: 25px;

  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
  text-align: center;

  color: ${COLORS.gray800};
`;

const JuniorImage = styled.img`
  position: absolute;
  left: -20px;
  width: 16px;
  height: 16px;
`;
