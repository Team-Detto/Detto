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
  infinite: false,
  centerPadding: '60px',
  slidesToShow: 5,
  slidesToScroll: 5,
  swipeToSlide: true,
  autoplay: true,
  autoplaySpeed: 4000,
};

const FindUserSlider = ({ tap }: { tap: string }) => {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: firebaseAllUsersRequest,
    staleTime: staleTime.users,
  });

  if (!users) return null;

  // 랜덤으로 섞기
  const randomUsers = users.sort(() => Math.random() - 0.5);

  return (
    <StyledSlider {...settings}>
      {randomUsers
        .filter((user) => user.positions.includes(tap))
        .map((user: any) => (
          <Link to={`/profile/${user.uid}`} key={user.uid}>
            <Card key={user}>
              <CardImage src={user.photoURL} />
              <CardNickname>
                {user.isJunior && <JuniorImage src={Junior} />}{' '}
                {user.displayName}
              </CardNickname>
            </Card>
          </Link>
        ))}
    </StyledSlider>
  );
};

export default FindUserSlider;

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
  }
  .slick-prev:before {
    width: 24px;
    height: 24px;
    background-image: url(${VectorPrev});
    background-size: 24px 24px;
    display: inline-block;
    content: '';
  }
  .slick-next {
    right: -134px;
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
