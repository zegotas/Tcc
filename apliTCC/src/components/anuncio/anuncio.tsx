import { View, Text, Pressable, Image, FlatList, Dimensions } from 'react-native';
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
  return (
    <View className="w-full h-36 md:h-60 rounded-2xl mt-5 mb-4">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        renderItem={({ item }) => (
          <Pressable
            onPress={item.onPress}
            className="w-full h-36 md:h-60 rounded-2xl mr-4"
            style={{ width: width - 32 }} // margem horizontal (px-4 → 16 + 16)
          >
            <Image
              source={item.image}
              className="w-full h-36 md:h-60 rounded-2xl"
              resizeMode="cover"
            />
          </Pressable>
        )}
      />
    </View>
  );
}
