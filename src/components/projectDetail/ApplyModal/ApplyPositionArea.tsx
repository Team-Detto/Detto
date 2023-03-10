import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import PositionButton from 'components/common/ApplyPositionButton';

interface ApplyPositionAreaProps {
  positions: string[];
  clickValue: number;
  setClickValue: (value: number) => void;
  version?: 'web' | 'mobile';
}

const ApplyPositionArea = ({
  positions,
  clickValue,
  setClickValue,
  version = 'web',
}: ApplyPositionAreaProps) => {
  return (
    <PositionContainer>
      <PositionTitle version={version}>
        포지션
        <PositionNotification version={version}>
          (중복 선택이 불가능 해요)
        </PositionNotification>
      </PositionTitle>
      <PositionContentWrap version={version}>
        <PositionButton
          clickValue={clickValue}
          setClickValue={setClickValue}
          version={version}
          positions={positions}
        />
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
  font-size: ${(props: { version: string }) =>
    props.version === 'mobile' ? '0.875rem' : '1.25rem'};
  line-height: 1.5rem;
  gap: 0.5rem;
`;

const PositionNotification = styled.span`
  font-weight: 500;
  font-size: ${(props: { version: string }) =>
    props.version === 'mobile' ? '0.875rem' : '1rem'};
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
  gap: ${(props: { version: string }) =>
    props.version === 'mobile' ? '0.375rem' : '1.1875rem'};
  margin-top: 0.75rem;
  width: 100%;
  height: 2.5rem;
`;
