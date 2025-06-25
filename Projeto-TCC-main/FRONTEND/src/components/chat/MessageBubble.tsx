import React from 'react';
import { View, Text, Image } from 'react-native';

type Props = {
  isSender: boolean;
  text?: string;
  image?: string;
  timestamp: string;
};

export default function MessageBubble({ isSender, text, image, timestamp }: Props) {
  return (
    <View
      style={{
        alignSelf: isSender ? 'flex-end' : 'flex-start',
        backgroundColor: isSender ? '#2563eb' : '#e5e7eb',
        borderRadius: 12,
        padding: 10,
        marginVertical: 4,
        maxWidth: '80%',
      }}
    >
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 180, height: 180, borderRadius: 8, marginBottom: 4 }}
          resizeMode="cover"
        />
      )}
      {text && (
        <Text style={{ color: isSender ? 'white' : 'black', fontSize: 16 }}>{text}</Text>
      )}
      <Text style={{ color: isSender ? 'white' : '#6b7280', fontSize: 10, marginTop: 4, textAlign: 'right' }}>
        {timestamp ? new Date(timestamp).toLocaleTimeString().slice(0, 5) : ''}
      </Text>
    </View>
  );
}
