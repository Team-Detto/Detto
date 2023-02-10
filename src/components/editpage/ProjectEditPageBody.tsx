import styled from '@emotion/styled';
import EidtPagePosition from './EditPagePosition';
import EditPageStack from './EditPageStack';

const ProjectEditPageBody = () => {
  return (
    <BodyContainer>
      <BodyPositionBox>
        <BodyText>필요 포지션</BodyText>
        <EidtPagePosition />
      </BodyPositionBox>
      <BodyStackBox>
        <EditPageStack />
      </BodyStackBox>
      <BodyEstimatedPeriodBox>
        <BodyText>예상 기간</BodyText>
        <BodyDateInput type="date" name="startDate" />
        <BodyDateInput type="date" name="endDate" />
      </BodyEstimatedPeriodBox>
      <BodyDeadlineBox>
        <BodyText>모집 마감일</BodyText>
        <BodyDateInput type="date" name="deadline" />
      </BodyDeadlineBox>
    </BodyContainer>
  );
};

const BodyContainer = styled.div`
  width: 100%;
`;
const BodyPositionBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
`;
const BodyText = styled.h2`
  width: 10.5%;
  margin-top: 0.5rem;
  font-weight: 400;
  line-height: 1.75rem;
  letter-spacing: -0.02rem;
  color: #383838;
`;
const BodyStackBox = styled.div`
  width: 100%;
  margin-top: 2rem;
`;
const BodyEstimatedPeriodBox = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding-right: 25rem;
  display: flex;
  flex-direction: row;
`;
const BodyDateInput = styled.input`
  width: 9.5625rem;
  height: 2.75rem;
  border: 1px solid #ced3db;
  border-radius: 4px;
  background: #ffffff;
  margin-left: 1.5rem;
  padding-left: 1rem;
`;
const BodyDeadlineBox = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding-right: 25rem;
  display: flex;
  flex-direction: row;
`;

export default ProjectEditPageBody;
