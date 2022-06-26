import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

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
    <FormControl isInvalid={isError}>
      <FormLabel htmlFor={name}>
        {label}
        {required && <sup> *</sup>}
      </FormLabel>
      <Input
        id={name}
        name={name}
        type="text"
        value={value}
        placeholder={placeholder}
        {...otherProps}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextInput;
