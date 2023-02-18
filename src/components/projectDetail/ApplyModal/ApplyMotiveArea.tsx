import styled from '@emotion/styled';

const ApplyMotiveArea = (props: any) => {
  const { motive, setMotive } = props;
  return (
    <MotiveContainer>
      <MotiveTitle>지원동기</MotiveTitle>
      <MotiveContentWrap>
        <MotiveTextArea
          placeholder="지원동기를 입력해주세요"
          onChange={(e: any) => setMotive(e.target.value)}
          value={motive}
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
  gap: 0.75rem;

  width: 39.0625rem;
  height: 14.8125rem;
  margin-top: 1.25rem;
`;

const MotiveTitle = styled.p`
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

const MotiveContentWrap = styled.div``;

const MotiveTextArea = styled.textarea`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0.625rem 1.75rem;
  gap: 0.625rem;

  width: 39.0625rem;
  height: 12.3125rem;
  border: 0.0625rem solid #ced3db;
  border-radius: 0.25rem;
`;
