import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Input } from '@/src/components/criarServi/input';

interface Props {
  control: Control<any>;
  name: string;
  onBlurCep?: () => void;
}

export function CepInput({ control, name, onBlurCep }: Props) {
  function formatCep(value: string) {
    return value.replace(/\D/g, '').slice(0, 8);
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          formProps={{ name, control }}
          inputProps={{
            placeholder: "Digite o CEP",
            keyboardType: "numeric",
            maxLength: 8,
            className: 'pl-2 text-lg pt-3',
            value: field.value,
            onChangeText: (value: string) => field.onChange(formatCep(value)),
            onBlur: onBlurCep
          }}
          label={"CEP *"}
        />
      )}
    />
  );
}
