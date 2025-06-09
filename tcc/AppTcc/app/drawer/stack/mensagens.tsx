// src/screens/mensagens.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerButton } from '../../../src/components/drawer'

type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
};

const initialData: Conversation[] = [
  {
    id: '1',
    name: 'João Silva',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'Olá! Está disponível amanhã?',
    time: '13:45',
    unread: true,
  },
  {
    id: '2',
    name: 'Maria Souza',
    avatar: 'https://i.pravatar.cc/150?img=2',
    lastMessage: 'Enviei os documentos!',
    time: 'Ontem',
    unread: false,
  },
    {
    id: '3',
    name: 'Lucas Gomes',
    avatar: 'https://i.pravatar.cc/150?img=2',
    lastMessage: 'Testando',
    time: 'Hoje',
    unread: false,
  },
];

export default function Mensagens() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [search, setSearch] = useState('');
  const filtered = initialData.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('/', { user: item })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      <View style={styles.meta}>
        <Text style={styles.time}>{item.time}</Text>
        {item.unread && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

       <View>      
       <DrawerButton/>
       </View>     

      <TextInput
        style={styles.search}
        placeholder="Buscar conversa"
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList data={filtered} keyExtractor={(i) => i.id} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  search: {
    margin: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    color: '#000',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  chatInfo: { flex: 1 },
  name: { fontWeight: 'bold', fontSize: 16, color: '#000' },
  lastMessage: { color: '#555', fontSize: 14, marginTop: 2 },
  meta: { alignItems: 'flex-end' },
  time: { fontSize: 12, color: '#888' },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
    marginTop: 6,
  },
});
