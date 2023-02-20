import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import PositionButton from 'components/common/ApplyPositionButton';

const ApplyPositionArea = (props: any) => {
  const { clickValue, setClickValue } = props;
  return (
    <PositionContainer>
      <PositionTitle>
        포지션
        <PositionNotification>(중복 선택이 불가능 해요)</PositionNotification>
      </PositionTitle>
      <PositionContentWrap>
        <PositionButton clickValue={clickValue} setClickValue={setClickValue} />
      </PositionContentWrap>
    </PositionContainer>
  );
};

export default ApplyPositionArea;

const PositionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3.5rem;
  margin-bottom: 1.5rem;
`;

const PositionTitle = styled.p`
  display: flex;
  width: 100%;
  text-align: start;
  height: 1.5rem;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
  gap: 0.5rem;
`;

const PositionNotification = styled.span`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.75rem;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: ${COLORS.gray750};
`;

const PositionContentWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0rem;
  gap: 0.75rem;
  margin-top: 0.75rem;
  width: 100%;
  height: 2.5rem;
`;
