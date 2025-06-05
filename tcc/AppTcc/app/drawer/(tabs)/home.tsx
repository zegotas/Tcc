import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { Header } from '@/src/components/header';
import { Anuncio } from '@/src/components/anuncio/anuncio';
import { PesquisarServi } from '@/src/components/PesquisarServi/PesquisarServi';
import { EmAlta } from '../../../src/components/alta/EmAlta';
import { AnuncioAlta } from '@/src/components/anuncioAlta';
import { Prestadores } from '@/src/components/prestadores';

const statusBarHeight = Constants.statusBarHeight;

export default function Home() {
  return (  
    <ScrollView
    style={{flex: 1}}
    className='bg-slate-200'
    showsVerticalScrollIndicator={false}
    >
      <View
      className='w-full px-4' 
      style={{marginTop: statusBarHeight}}
      >
        <Header/>

        <PesquisarServi/>

        <Anuncio/>

        <EmAlta
          name="Baseados na sua localização"
          label="Veja Mais"
          action={() => console.log('Clicou em Ver Mais')} 
          size={'text-2xl'}
          />
          

          <AnuncioAlta/>

        <EmAlta
          name="Serviços em Alta"
          label="Veja Mais"
          action={() => console.log('Clicou em Ver Mais')} 
          size={'text-2xl'}
          />

          <AnuncioAlta/>

                  <EmAlta
          name="Prestadores em Alta"
          label="Veja Mais"
          action={() => console.log('Clicou em Ver Mais')} 
          size={'text-xl'}
          />

          <Prestadores/>

      </View>
    </ScrollView>
  );
}
