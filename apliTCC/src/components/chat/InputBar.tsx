import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

type Props = {
  onSend: (message: string) => void;
  onSendImage: (uri: string) => Promise<void>;
};

export default function InputBar({ onSend, onSendImage }: Props) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      onSendImage(uri);
    }
  };

  return (
    <View className="flex-row items-center p-2 border-t border-gray-300">
      <TouchableOpacity onPress={handlePickImage} className="p-2">
        <Ionicons name="image" size={24} color="gray" />
      </TouchableOpacity>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Digite sua mensagem"
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 mx-2"
      />
      <TouchableOpacity onPress={handleSend} className="p-2">
        <Ionicons name="send" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
}
