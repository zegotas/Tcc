import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Input } from '@/src/components/criarServi/input';

interface Props {
  control: Control<any>;
  name: string;
}

export function DescriptionInput({ control, name }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          formProps={{ name, control }}
          inputProps={{
            placeholder: "Descrição do serviço",
            className: 'pl-2 text-lg pt-3',
            multiline: true,
            textAlignVertical: 'top',
            style: { paddingTop: 12 },
            maxLength: 6000,
            value: field.value,
            onChangeText: field.onChange
          }}
          label={"Descrição do serviço *"}
          height={150}
        />
      )}
    />
  );
}
