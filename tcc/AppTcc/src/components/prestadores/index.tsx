import { View, Text, FlatList } from 'react-native';
import {useEffect, useState} from 'react'
import { PrestadoresItem } from './horizontal'
import '../../../global.css'

export interface PrestadoresProps{
    id: string;
    name: string;
    image: string;
}

export function Prestadores() {
    const [prestadores, setPrestadores] = useState<PrestadoresProps[]> ([])

    useEffect(() => {
       async function getServicos() {
        const response = await fetch('http://192.168.2.193:3000/restaurants');
        const data = await response.json();
        setPrestadores(data);
       }
         getServicos();
    }, []);

 return (
    <FlatList
        data={prestadores}
        renderItem={ ({ item }) => <PrestadoresItem item={item}/>}
        horizontal={true}
        contentContainerStyle={{ gap: 14, paddingLeft : 16, paddingRight: 16 }}
        showsHorizontalScrollIndicator={false}
    />
  );
}