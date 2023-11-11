"use client";

import { FC } from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';

import { InputControl, InputRoot } from './Input';

interface FormInputProps<T extends FieldValues> {
  name: string;
  control: Control<T>;
  type: string;
  placeholder: string;
  rules?: any;
}

export const FormInput: FC<FormInputProps<any>> = ({ name, control, type, placeholder, rules }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <InputRoot>
          <InputControl {...field} type={type} placeholder={placeholder} />
          {error && <p className='text-sm text-red-600'>{error.message}</p>}
        </InputRoot>
      )}
    />
  );
};
