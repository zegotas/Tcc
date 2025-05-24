import React from 'react';
import { BaseToast, BaseToastProps } from 'react-native-toast-message';


const createCenteredToast = (
  backgroundColor: string,
  textColor: string
) => (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
  <BaseToast
    {...props}
    style={{
      width: '95%',
      backgroundColor,
      alignItems: 'center',
    }}
    contentContainerStyle={{
      alignItems: 'center',
    }}
    text1NumberOfLines={0}
    text1Style={{
      fontSize: 19,
      fontWeight: 'bold',
      color: textColor,
      textAlign: 'center',
    }}
    text2NumberOfLines={0}
    text2Style={{
      fontSize: 19,
      color: 'gray',
      textAlign: 'center',
    }}
    renderLeadingIcon={undefined}
  />
);
export const toastConfig = {
  success: createCenteredToast('#e6f4ea', '#2e7d32'),
  error: createCenteredToast('#fdecea', '#d32f2f'), 
};

