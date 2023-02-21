import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

interface TextInputProps {
  value: string;
  name: string;
  placeholder?: string;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validationMessage: string;
  isEmail?: boolean;
  isMobile?: boolean;
}

const TextInput = ({
  value,
  name,
  onChangeValue,
  placeholder,
  validationMessage,
  isEmail,
  isMobile,
}: TextInputProps) => {
  return (
    <InputBox isMobile={isMobile}>
      {!isEmail ? (
        <InfoTextInput
          type="text"
          name={name}
          defaultValue={value}
          onChange={onChangeValue}
          placeholder={placeholder}
          minLength={2}
          maxLength={7}
          isMobile={isMobile}
        />
      ) : (
        <InfoTextInput
          type="email"
          name={name}
          defaultValue={value}
          onChange={onChangeValue}
          placeholder={placeholder}
          minLength={2}
          maxLength={30}
          isMobile={isMobile}
        />
      )}
      <ValidationMessage>{validationMessage}</ValidationMessage>
    </InputBox>
  );
};

export default TextInput;

const InputBox = styled.div<{ isMobile?: boolean }>`
  height: 2.875rem;

  &:last-of-type {
    margin: ${({ isMobile }) => (isMobile ? '1rem 0' : '0')};
  }
`;

const InfoTextInput = styled.input<{ isMobile?: boolean }>`
  width: ${({ isMobile }) => (isMobile ? '18.875rem' : '22rem')};
  padding: 0.625rem 1.25rem;
  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;
  color: ${COLORS.gray800};
  font-size: ${({ isMobile }) => (isMobile ? '1rem' : '1.125rem')};
`;

const ValidationMessage = styled.p`
  font-size: 0.75rem;
  padding-left: 0.25rem;
  color: ${COLORS.red};
`;
