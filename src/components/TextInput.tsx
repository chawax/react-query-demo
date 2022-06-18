import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

export type TextInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  error?: string;
};

const TextInput = (props: TextInputProps) => {
  const { label, error, name, required, value, placeholder, ...otherProps } =
    props;
  let className = '';
  if (error) {
    className = error ? 'is-invalid' : 'is-valid';
  }
  return (
    <FormGroup>
      <Label for={name}>
        {label}
        {required && <sup> *</sup>}
      </Label>
      <Input
        id={name}
        name={name}
        type="text"
        value={value}
        placeholder={placeholder}
        className={className}
        {...otherProps}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </FormGroup>
  );
};

export default TextInput;
