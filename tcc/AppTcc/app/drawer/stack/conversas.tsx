// conversas.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { RouteProp, useRoute } from '@react-navigation/native';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type Message = {
  id: string;
  fromMe: boolean;
  text?: string;
  imageUri?: string;
  documentName?: string;
};

export default function Conversas() {
  const route = useRoute<RouteProp<{ params: { user: User } }, 'params'>>();
  const { user } = route.params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendText = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), fromMe: true, text: input.trim() },
    ]);
    setInput('');
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.7,
      allowsEditing: true,
    });
    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), fromMe: true, imageUri: uri },
      ]);
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          fromMe: true,
          documentName: result.assets[0].name,
        },
      ]);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    return (
      <View
        style={[
          styles.message,
          item.fromMe ? styles.fromMe : styles.fromOther,
        ]}
      >
        {item.text && <Text style={styles.messageText}>{item.text}</Text>}
        {item.imageUri && (
          <Image source={{ uri: item.imageUri }} style={styles.imagePreview} />
        )}
        {item.documentName && (
          <Text style={styles.docText}>📄 {item.documentName}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.status}>digitando...</Text>
      </View>

      {/* Mensagens */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.attachBtn}>📷</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickDocument}>
          <Text style={styles.attachBtn}>📎</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Digite uma mensagem"
          placeholderTextColor="#999"
          style={styles.input}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={sendText}>
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  userName: { fontWeight: 'bold', fontSize: 18, color: '#000' },
  status: { fontSize: 12, color: '#666' },
  message: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
  },
  fromMe: {
    backgroundColor: '#000',
    alignSelf: 'flex-end',
  },
  fromOther: {
    backgroundColor: '#eaeaea',
    alignSelf: 'flex-start',
  },
  messageText: { color: '#fff' },
  docText: {
    color: '#fff',
    fontStyle: 'italic',
    marginTop: 4,
  },
  imagePreview: {
    width: 180,
    height: 180,
    marginTop: 6,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    color: '#000',
    marginHorizontal: 8,
  },
  sendText: {
    color: '#000',
    fontWeight: 'bold',
  },
  attachBtn: {
    fontSize: 20,
    paddingHorizontal: 4,
  },
});
