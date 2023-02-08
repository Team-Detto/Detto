import WritePageStack from './WritePageStack';
import WritePagePosition from './WritePagePosition';
import styled from '@emotion/styled';

const ProjectWritePageBody = () => {
  return (
    <WritePageBodyContainer>
      <WritePageBodyPositionBox>
        <WritePageBodyPositionText>필요 포지션</WritePageBodyPositionText>
        <WritePagePosition />
      </WritePageBodyPositionBox>
      <WritePageBodyStackBox>
        <WritePageStack />
      </WritePageBodyStackBox>
      <WirtePageBodyEstimatedPeriodBox>
        <WritePageBodyPositionText>예상 기간</WritePageBodyPositionText>
        <WritePageBodyDateInput type="date" />
        <WritePageBodyDateInput type="date" />
      </WirtePageBodyEstimatedPeriodBox>
      <WritePageBodyDeadlineBox>
        <WritePageBodyPositionText>모집 마감일</WritePageBodyPositionText>
        <WritePageBodyDateInput type="date" />
      </WritePageBodyDeadlineBox>
    </WritePageBodyContainer>
  );
};

const WritePageBodyContainer = styled.div`
  width: 100%;
`;
const WritePageBodyPositionBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
`;
const WritePageBodyPositionText = styled.h2`
  width: 10.5%;
  display: flex;
  align-items: center;
  font-weight: 400;
  line-height: 1.75rem;
  letter-spacing: -0.02rem;
  color: #383838;
`;
const WritePageBodyStackBox = styled.div`
  width: 100%;
  margin-top: 2rem;
`;
const WirtePageBodyEstimatedPeriodBox = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding-right: 25rem;
  display: flex;
  flex-direction: row;
`;
const WritePageBodyDateInput = styled.input`
  width: 9.5625rem;
  height: 2.75rem;
  border: 1px solid #ced3db;
  border-radius: 4px;
  background: #ffffff;
  margin-left: 1.5rem;
  padding-left: 1rem;
`;
const WritePageBodyDeadlineBox = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding-right: 25rem;
  display: flex;
  flex-direction: row;
`;

export default ProjectWritePageBody;
