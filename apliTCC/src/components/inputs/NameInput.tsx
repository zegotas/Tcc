import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Input } from '@/src/components/criarServi/input';

interface Props {
  control: Control<any>;
  name: string;
}

export function NameInput({ control, name }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          formProps={{ name, control }}
          inputProps={{
            placeholder: "Nome do serviço",
            className: 'pl-2 text-lg pt-3',
            returnKeyType: "next",
            maxLength: 100,
            value: field.value,
            onChangeText: field.onChange
          }}
          label={"Nome do serviço *"}
        />
      )}
    />
  );
}
