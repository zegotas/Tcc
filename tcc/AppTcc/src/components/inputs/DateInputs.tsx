import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Input } from '@/src/components/criarServi/input';

interface Props {
  control: Control<any>;
  name: string;
}

export function DateInput({ control, name }: Props) {
  function formatDate(value: string) {
    const cleaned = value.replace(/\D/g, '').slice(0, 8);
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 4) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          formProps={{ name, control }}
          inputProps={{
            placeholder: "DD/MM/AAAA",
            keyboardType: "numeric",
            maxLength: 10,
            className: 'pl-2 text-lg pt-3',
            value: field.value,
            onChangeText: (value: string) => field.onChange(formatDate(value))
          }}
          label={"Data do serviço *"}
        />
      )}
    />
  );
}
