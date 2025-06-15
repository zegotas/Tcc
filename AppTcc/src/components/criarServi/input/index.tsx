import { TextInput, TextInputProps, View, Text } from "react-native";
import { Controller, UseControllerProps } from "react-hook-form";
import { forwardRef } from "react";

type Props = {
  label: string;
  formProps: UseControllerProps;
  inputProps?: TextInputProps;
  height?: number; // Aqui o segredo para o tamanho
};

const Input = forwardRef<TextInput, Props>(({ label, formProps, inputProps, height = 56 }, ref) => {
  return (
    <View className="w-full flex px-2">
      <View className="">
        <Text className="text-xl font-bold">{label}</Text>
        <View
          className="w-full bg-white border-2 overflow-hidden rounded-lg"
          style={{ height }}
        >
          <Controller
            {...formProps}
            render={({ field }) => (
              <TextInput
                ref={ref}
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
