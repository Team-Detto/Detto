import Slider from 'react-slick';
import styled from '@emotion/styled';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import VectorPrev from '../../../assets/images/VectorPrev.png';
import VectorNext from '../../../assets/images/VectorNext.png';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { firestore } from 'apis/firebaseService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const FindUserSlider = () => {
  const [users, setUsers] = useState<any>([]);

  const firebaseGetProjectDataRequest = (setUsers: any) => {
    const q = query(collection(firestore, 'users'));

    onSnapshot(q, (querySnapshot) => {
      const data: any = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setUsers(data);
    });
  };

  useEffect(() => {
    firebaseGetProjectDataRequest(setUsers);
  }, []);

  console.log(users);

  const settings = {
    infinite: false,
    centerPadding: '60px',
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
  };
  return (
    <SlideArea>
      <StyledSlider {...settings}>
        {users.map((user: any) => {
          console.log(user.positions[0]);
          return (
            <Link to={'/'}>
              <Card key={user}>
                <CardImage src={user.photoURL} />
                <CardTextContainer>
                  <CardNickname>{user.displayName}</CardNickname>
                  <CardJob>{user.positions[0]}</CardJob>
                </CardTextContainer>
              </Card>
            </Link>
          );
        })}
      </StyledSlider>
    </SlideArea>
  );
};
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
    cursor: pointer;
    content: 'prev';
  }
  .slick-prev:before {
    width: 10px;
    height: 10px;
    content: url(${VectorPrev});
    color: #000;
  }
  .slick-next {
    right: -134px;
    cursor: pointer;
  }
  .slick-next:before {
    width: 10px;
    height: 10px;
    content: url(${VectorNext});
    color: #000;
  }
`;
const Card = styled.div`
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0px;
  gap: 16px;
  width: 128px;
  height: 201px;
`;
const CardImage = styled.img`
  background: url('https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1638101071/noticon/gpr07ptl1x6evhew7li7.png');
  background-size: cover;
  width: 128px;
  height: 128px;
  border-radius: 50%;
`;
const CardTextContainer = styled.div`
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0px;
  width: 90%;
  height: 57px;
  margin: 0 auto;
`;
const CardNickname = styled.div`
  width: 100%;
  height: 25px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
  text-align: center;
`;
const CardJob = styled.div`
  width: 100%;
  height: 32px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  text-align: center;
`;
export default FindUserSlider;
