import React from 'react';
import { FlatList, Pressable, Text, View, Image } from 'react-native';

type Chat = {
  chatId: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  image?: string;
};

type Props = {
  chats: Chat[];
  onSelectChat: (chatId: string) => void;
};

const ChatList = ({ chats, onSelectChat }: Props) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={chats}
      keyExtractor={(item) => item.chatId}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onSelectChat(item.chatId)}
          className="flex-row items-center px-4 py-3 border-b border-gray-200"
        >
          <Image
            source={{ uri: item.avatar }}
            className="w-12 h-12 rounded-full mr-4"
          />
          <View className="flex-1">
            <Text className="text-base font-semibold">{item.name}</Text>
            <Text className="text-gray-500" numberOfLines={1}>
              {item.lastMessage}
            </Text>
          </View>
          <Text className="text-xs text-gray-400">
            {new Date(item.timestamp).toLocaleTimeString().slice(0, 5)}
          </Text>
        </Pressable>
      )}
    />
  );
};

export default ChatList;
