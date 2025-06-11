import { StatusBar } from "expo-status-bar"
import {View, Text, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export function FormServiOne(){

    return(
        <View className="bg-slate-300 items-center">
            <View className="">              
                 <Text className="font-bold text-2xl mt-4 mb-16">Crie seu anúncio</Text>                
            </View>
        </View>
    );
}