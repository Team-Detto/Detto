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
  slidesToScroll: 1,
  swipeToSlide: true,
};

const FindUserSlider = () => {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: firebaseAllUsersRequest,
    staleTime: staleTime.users,
  });

  if (!users) return null;
  return (
    <SlideArea>
      <StyledSlider {...settings}>
        {users.map((user: any) => (
          <Link to={`/profile/${user.uid}`}>
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
    </SlideArea>
  );
};

export default FindUserSlider;

const SlideArea = styled.div`
  width: 1180px;
  height: 201px;
`;

const StyledSlider = styled(Slider)`
  display: flex;
  flex-direction: row;
  margin: 0 134px 0 134px;
  align-items: center;
  .slick-arrow {
    display: flex;
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
  margin: 0 auto;
  padding: 0px;
  gap: 16px;
  width: 9rem;
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

  width: 100%;
  height: 25px;

  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
  text-align: center;

  color: ${COLORS.gray800};
`;
const JuniorImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;
