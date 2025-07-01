import { Slot } from "expo-router";
import Toast from "react-native-toast-message";
import { View, Text } from "react-native";
import { themas } from "@/src/global/themes";
import '../global.css';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from "@/src/utils/notifications";
import React, { useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Handler para exibir notificações no foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Toast personalizado
const toastConfig = {
  success: ({ text1, text2 }: any) => (
    <View style={{
      backgroundColor: themas.colors.primary,
      padding: 16,
      borderRadius: 8,
      width: '90%',
      marginHorizontal: '5%',
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    }}>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        includeFontPadding: false
      }}>
        {text1}
      </Text>
      <Text style={{
        fontSize: 18,
        color: 'white',
        marginTop: 4,
        includeFontPadding: false
      }}>
        {text2}
      </Text>
    </View>
  ),

  error: ({ text1, text2, props }: any) => (
    <View style={{
      backgroundColor: themas.colors.primary,
      padding: 16,
      borderRadius: 8,
      width: '90%',
      marginHorizontal: '5%',
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    }}>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        includeFontPadding: false
      }}>
        {text1}
      </Text>
      <Text style={{
        fontSize: 18,
        color: 'white',
        marginTop: 4,
        includeFontPadding: false
      }}
        numberOfLines={props?.textNumberOfLines || 3}
      >
        {text2}
      </Text>
    </View>
  )
};

// Função para salvar a notificação no AsyncStorage
async function salvarNotificacao(notificacao: Notifications.Notification) {
  try {
    const notificacoesAntigas = await AsyncStorage.getItem('notificacoes');
    const lista = notificacoesAntigas ? JSON.parse(notificacoesAntigas) : [];

    const novaNotificacao = {
      id: notificacao.request.identifier,
      titulo: notificacao.request.content.title,
      corpo: notificacao.request.content.body,
      data: new Date().toISOString(),
    };

    const novaLista = [novaNotificacao, ...lista];
    await AsyncStorage.setItem('notificacoes', JSON.stringify(novaLista));
  } catch (error) {
    console.log("Erro ao salvar notificação:", error);
  }
}

export default function Layout() {
  const notificationsListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync();

    // Quando receber notificações em foreground
    notificationsListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificação recebida:', notification);
      salvarNotificacao(notification);
    });

    // Quando o usuário clicar na notificação
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Resposta da notificação:', response);
      if (response.notification) {
        salvarNotificacao(response.notification);
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationsListener.current!);
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  return (
    <>
      <Slot />

      <Toast
        config={toastConfig}
        position="bottom"
        visibilityTime={4000}
        autoHide={true}
        topOffset={20}
        bottomOffset={40}
        keyboardOffset={50}
      />
    </>
  );
}
