import { View, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { Header } from '@/src/components/header';
import { Anuncio } from '@/src/components/anuncio/anuncio';
import { PesquisarServi } from '@/src/components/PesquisarServi/PesquisarServi';
import { EmAlta } from '../../../src/components/alta/EmAlta';
import { AnuncioAlta } from '@/src/components/anuncioAlta';
import { Prestadores } from '@/src/components/prestadores';
import { AnuncioLocal } from '@/src/components/AnuncioLocal';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ServicoProps } from '@/src/utils/ServicoProps';

const statusBarHeight = Constants.statusBarHeight;

export default function Home() {
  const data = [{}]; 

  const handleSearch = (termo: string) => {
    if (termo.trim()) {
      router.push({ pathname: '/drawer/(tabs)/pesquisar', params: { q: termo } });
    }
  };


  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ backgroundColor: '#e2e8f0' }} 
      renderItem={() => (
        <View className="w-full px-4" style={{ marginTop: statusBarHeight }}>
          <Header />

          <PesquisarServi onSearch={handleSearch} />

          <Anuncio />

          <EmAlta
            name="Baseados na sua localização"
            label="Veja mais"
            action={() => router.push({ pathname: '/VejaMais/VejaMais', params: { tipo: 'alta' } })}
            size={'text-2xl'}
          />

          <AnuncioLocal/>

          <EmAlta
            name="Serviços em alta"
            label="Veja mais"
            action={() => router.push({ pathname: '/VejaMais/VejaMaisAlta', params: { tipo: 'alta' } })}
            size={'text-2xl'}
          />

          <AnuncioAlta />

          <EmAlta
            name="Prestadores em alta"
            label="Veja mais"
            action={() => console.log('Clicou em Ver Mais')}
            size={'text-xl'}
          />

          <Prestadores />
        </View>
      )}
    />
  );
}
