import React from 'react';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

interface props {
  input: {
    id: string;
    type: string;
    width: string;
    height: string;
    name: string;
  };
  value: number | string | readonly string[] | undefined;
  onChangeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void; // eslint-disable-line no-unused-vars
  label: string;
  text?: string;
}

const LabelInput = ({ input, label, text, value, onChangeEvent }: props) => {
  if (value === 0) value = '';
  return (
    <LabelInputContainer>
      <Label htmlFor={input.id}>{label}</Label>
      <Input {...input} value={value} onChange={onChangeEvent} />
      <Text>{text}</Text>
    </LabelInputContainer>
  );
};

const LabelInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;
  text-align: end;
  padding-right: 0.5rem;
  background: ${COLORS.white};
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const Label = styled.label`
  height: 1.75rem;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.75rem;
  color: #383838; //색상표에 없음
  margin-right: 1rem;
`;
const Text = styled.p`
  width: 1.125rem;
  height: 1.75rem;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.75rem;
  color: ${COLORS.gray700};
  margin-left: 0.5rem;
`;

export default LabelInput;
