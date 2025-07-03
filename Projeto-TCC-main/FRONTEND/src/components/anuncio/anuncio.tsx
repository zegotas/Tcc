import { View, Text, Pressable, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import '../../../global.css';

const { width } = Dimensions.get('window');

const data = [
  {
    id: '1',
    image: require('../../assets/anuncio/lucas.png'),
    onPress: () => console.log('Anúncio 1 Pressionado'),
  },
  {
    id: '2',
    image: require('../../assets/anuncio/marcos.png'),
    onPress: () => console.log('Anúncio 2 Pressionado'),
  },
  {
    id: '3',
    image: require('../../assets/anuncio/flaviane.png'),
    onPress: () => console.log('Anúncio 3 Pressionado'),
  },
];

export function Anuncio() {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < data.length) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => scrollToIndex(currentIndex + 1);
  const handlePrev = () => scrollToIndex(currentIndex - 1);

  return (
    <View className="w-full h-36 md:h-60 rounded-2xl mt-5 mb-4 relative">
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / (width - 32));
          setCurrentIndex(newIndex);
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={item.onPress}
            className="w-full h-36 md:h-60 rounded-2xl mr-4"
            style={{ width: width - 32 }} 
          >
            <Image
              source={item.image}
              className="w-full h-36 md:h-60 rounded-2xl"
              resizeMode="cover"
            />
          </Pressable>
        )}
      />

      
      {currentIndex > 0 && (
        <TouchableOpacity
          onPress={handlePrev}
          className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full'
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
      )}

      
      {currentIndex < data.length - 1 && (
        <TouchableOpacity
          onPress={handleNext}
          className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full'
        >
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}
