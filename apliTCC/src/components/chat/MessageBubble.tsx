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
      className={`max-w-[80%] rounded-lg p-2 my-1 ${
        isSender ? 'self-end bg-blue-500' : 'self-start bg-gray-200'
      }`}
    >
      {image && (
        <Image
          source={{ uri: image }}
          className="w-48 h-48 rounded-md mb-1"
          resizeMode="cover"
        />
      )}
      {text && (
        <Text className={`${isSender ? 'text-white' : 'text-black'} text-base`}>
          {text}
        </Text>
      )}
      <Text className={`text-xs ${isSender ? 'text-white' : 'text-gray-500'} mt-1 text-right`}>
        {new Date(timestamp).toLocaleTimeString().slice(0, 5)}
      </Text>
    </View>
  );
}
