import { TextInput, TextInputProps, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Controller, UseControllerProps, FieldValues } from "react-hook-form";
import { forwardRef } from "react";

type Props  = {
  formProps: UseControllerProps;
  inputProps?: TextInputProps;
};

const Input = forwardRef <TextInput, Props> (({ formProps, inputProps}, ref) => {
  return (
    <View className="w-full flex px-2 ">
        <View className="mt-4"> 
               <Text className="text-xl font-bold">Nome do serviço</Text>
                  <View className="w-full h-14 bg-white flex-row items-center overflow-hidden  rounded-lg">
                    <Controller
                    {...formProps}
                    render={({ field }) => (
                    <TextInput
                        ref={ref}
                        className="flex-1 pl-4 text-base"
                        onChangeText={field.onChange}
                         value={field.value}
                        {...inputProps}
                    />
                    )}
                    />
                </View> 
        </View>
    </View>
    );
  });
export { Input };