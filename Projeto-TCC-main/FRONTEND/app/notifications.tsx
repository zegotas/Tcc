import { StatusBar } from 'expo-status-bar'
import { View, Text, Pressable, Button} from 'react-native'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true
  })
})

export default function Notification (){

  async function handleCallNotification() {
    const { status } = await Notifications.getPermissionsAsync();
    if (status === 'granted'){
        alert('Você não possui permição para receber notificações')
        return;
    }
    let token = (await  Notifications.getExpoPushTokenAsync())
    console.log(token)
  }

  return(
    <View className='flex-1 items-center justify-center'>
      <Text>Sistema de notificações</Text>
      <Button title="Notificar" onPress={handleCallNotification} />
      <StatusBar></StatusBar>
    </View>
  )

}