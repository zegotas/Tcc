import { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { CardHorizontalServi } from './servi'


export interface ServicoProps {
  id: string;
  name: string;
  price: string;
  time: string;
  rating: number;
  image: string;
  restaurantId: string;
  description: string;
  prestador: string;
  location: string;
  type: string;
  estimado?: number;
}

export function AnuncioLocal() {
    const [servicos, setServicos] = useState<ServicoProps[]>([]);

    useEffect(() => {
       async function getServicos() {
        const response = await fetch('http://192.168.0.7:3000/services');
        const data = await response.json();
        setServicos(data);
       }
         getServicos();
    }, []);
 return (
    <FlatList
        data={servicos}
        renderItem={ ({ item }) => <CardHorizontalServi servi={item}/>}
        horizontal={true}
        contentContainerStyle={{ gap: 14, paddingLeft : 16, paddingRight: 16 }}
        showsHorizontalScrollIndicator={false}
    />
  );
}