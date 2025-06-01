import { Field, Input } from '@chakra-ui/react';

export type TextInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  error?: string;
};

const TextInput = ({
  label,
  error,
  name,
  required,
  value,
  placeholder,
  ...otherProps
}: TextInputProps) => {
  const isError = error !== undefined;
  return (
    <Field.Root invalid={isError}>
      <Field.Label htmlFor={name}>
        {label}
        {required && <sup> *</sup>}
      </Field.Label>
      <Input
        id={name}
        name={name}
        type="text"
        value={value}
        placeholder={placeholder}
        {...otherProps}
      />
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  );
};

export default TextInput;
