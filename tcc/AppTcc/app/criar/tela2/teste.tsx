import { View, Text } from 'react-native';

import { FormServiOne } from '@/src/components/criarServi/header';
import { Voltar } from '@/src/components/voltar';
import { Input } from '@/src/components/criarServi/input';

import { useForm } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import { useRef } from 'react';

export default function Criar() {

  const {control, handleSubmit } = useForm();

  function handleNextStep (data: any){
    console.log(data)
  }

  const descriptionRef = useRef<TextInput>(null);

 return (
      <View 
        style={{flex: 1}}
        className=' bg-slate-300 px-2'>
          <Voltar/>     

          <FormServiOne/>

          <Input 
          formProps={{
            name: "name",
            control
          }}
          inputProps={{
            placeholder: "Titulo do serviço",
            onSubmitEditing: () => descriptionRef.current?.focus,
            returnKeyType: "next"
          }}
          />
          <Input
           ref={descriptionRef}
           formProps={{
           name: "description",
           control
          }}
          inputProps={{
            onSubmitEditing: handleSubmit(handleNextStep)
          }}
          />

      </View>

  );
}