import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import ApplicantCard from './ApplicantCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import VectorPrev from 'assets/images/VectorPrev.png';
import VectorNext from 'assets/images/VectorNext.png';
import { useEffect, useState } from 'react';
import InviteModal from './InviteModals/InviteModal';
import { useModal } from 'hooks';
import { allowScroll, preventScroll } from 'utils/modal';
import { DocumentData } from 'firebase/firestore';

interface ApplicantListAreaProps {
  projectData: DocumentData;
  pid: string;
}

const ApplicantListArea = ({ projectData, pid }: ApplicantListAreaProps) => {
  const { applicants } = projectData;
  const [clickApplicant, setClickApplicant] = useState('');
  const { isOpen, handleModalStateChange } = useModal(false);
  let countFlag = 0;
  const settings = {
    centerPadding: '60px',
    slidesToShow: 4,
    slidesToScroll: 4,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  useEffect(() => {
    if (isOpen) {
      preventScroll();
      return () => {
        allowScroll();
      };
    }
  }, [isOpen]);
  return (
    <>
      <ApplicantListContainer>
        <ApplicantListTitle>지원자 목록</ApplicantListTitle>
        <ApplicantListContent>
          <StyledSlider {...settings} infinite={applicants.length >= 4}>
            {applicants &&
              Object.keys(applicants).map((key) => {
                if (applicants?.[key]?.recruit === false) {
                  countFlag += 1;
                  return (
                    <ApplicantCard
                      key={key}
                      pid={pid}
                      applicantUid={key}
                      applicant={applicants?.[key]}
                      setClickApplicant={setClickApplicant}
                      handleModalStateChange={handleModalStateChange}
                      isOpen={isOpen}
                    />
                  );
                }
              })}
          </StyledSlider>
        </ApplicantListContent>
        {countFlag === 0 && (
          <CannotFoundApplicant>아직 지원자가 없어요 :/</CannotFoundApplicant>
        )}
      </ApplicantListContainer>
      <InviteModal
        isOpen={isOpen}
        applicant={applicants?.[clickApplicant]}
        onClickEvent={handleModalStateChange}
        pid={pid}
        applicantKey={clickApplicant}
      />
    </>
  );
};

export default ApplicantListArea;

const ApplicantListContainer = styled.div`
  padding: 5rem 6.0625rem;
`;

const ApplicantListTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
`;

const ApplicantListContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 3.5625rem;
`;
const CannotFoundApplicant = styled.div`
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${COLORS.gray500};
`;

const StyledSlider = styled(Slider)`
  width: 100%;

  .slick-arrow {
    z-index: 10;
  }
  .slick-prev {
    left: -50px;
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
    right: -50px;
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
  }
`;
