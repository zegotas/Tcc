import { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { CardHorizontalServi } from './servi'
import { getMockApiUrl } from '../../global/api'; // Certifique-se de que o caminho para api está correto


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
  estimado: number;
}

export function AnuncioAlta() {
    const [servicos, setServicos] = useState<ServicoProps[]>([]);

    useEffect(() => {
       async function getServicos() {
        const response = await fetch(getMockApiUrl() + '/foods');
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