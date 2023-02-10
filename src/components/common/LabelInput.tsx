import React from 'react';
import styled from '@emotion/styled';

interface props {
  input: {
    id: string;
    type: string;
    width: string;
    height: string;
    name: string;
  };
  value: number | string | readonly string[] | undefined;
  onChageEvent: (e: React.ChangeEvent<HTMLInputElement>) => void; // eslint-disable-line no-unused-vars
  label: string;
  text?: string;
}

const LabelInput = ({ input, label, text, value, onChageEvent }: props) => {
  return (
    <LabelInputContainer>
      <Label htmlFor={input.id}>{label}</Label>
      <Input {...input} value={value} onChange={onChageEvent} />
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
  border: 1px solid #ced3db;
  border-radius: 4px;
  text-align: end;
  padding-right: 0.5rem;
  background: #ffffff;
`;
const Label = styled.label`
  height: 1.75rem;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.75rem;
  color: #383838;
  margin-right: 1rem;
`;
const Text = styled.p`
  width: 1.125rem;
  height: 1.75rem;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.75rem;
  color: #8b95a1;
  margin-left: 0.5rem;
`;

export default LabelInput;
