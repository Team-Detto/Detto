import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

const ApplyMotiveArea = ({ motive, setMotive, version = 'web' }: any) => {
  return (
    <MotiveContainer>
      <MotiveTitle version={version}>지원동기</MotiveTitle>
      <MotiveContentWrap>
        <MotiveTextArea
          placeholder="지원동기를 입력해주세요."
          onChange={(e: any) => setMotive(e.target.value)}
          value={motive}
          version={version}
        />
      </MotiveContentWrap>
    </MotiveContainer>
  );
};

export default ApplyMotiveArea;

const MotiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  gap: 0.5rem;

  width: 100%;
  /* height: 14.8125rem; */
  margin-top: 1.125rem;
`;

const MotiveTitle = styled.p`
  font-weight: 500;
  font-size: ${(props: { version: string }) =>
    props.version === 'mobile' ? '0.875rem' : '1.25rem'};
  line-height: 1.75rem;
`;

const MotiveContentWrap = styled.div``;

const MotiveTextArea = styled.textarea`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: ${(props: { version: string }) =>
    props.version === 'mobile' ? '0.625rem 1.25rem' : '0.625rem 1.75rem'};
  gap: 0.625rem;

  width: ${(props: { version: string }) =>
    props.version === 'mobile' ? '17.875rem' : '39.0625rem'};
  height: ${(props: { version: string }) =>
    props.version === 'mobile' ? '8.8125rem' : '12.3125rem'};
  border: 0.0625rem solid ${COLORS.gray300};
  border-radius: 0.25rem;
  resize: none;
  font-size: ${(props: { version: string }) =>
    props.version === 'mobile' ? '.75rem' : '1rem'}; ;
`;
