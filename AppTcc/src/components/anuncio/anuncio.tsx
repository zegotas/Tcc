import { View, Text, Pressable, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import '../../../global.css'

export  function Anuncio() {
 return (
   <View className='w-full h-36 md:h-60 rounded-2xl mt-5 mb-4'>
    <PagerView 
        className=''
        style={{flex:1}} initialPage={0} pageMargin={14}
        >
            <Pressable 
            className='w-full h-36 md:h-60 rounded-2xl' 
            key='1'
            onPress={() => console.log('Anúncio 1 Pressionado')}
            >
                <Image
                source={require("../../assets/anuncio/lucas.png")}
                className='w-full h-36 md:h-60 rounded-2xl'
                />
            </Pressable>

            <Pressable 
            className='w-full h-36 md:h-60 rounded-2xl' 
            key='2'
            onPress={() => console.log('Anúncio 2 Pressionado')}
            >
                <Image
                source={require("../../assets/anuncio/marcos.png")}
                className='w-full h-36 md:h-60 rounded-2xl'
                />
            </Pressable>

             <Pressable 
             className='w-full h-36 md:h-60 rounded-2xl' 
             key='3'
             onPress={() => console.log('Anúncio 2 Pressionado')}
             >
                 <Image
                 source={require("../../assets/anuncio/flaviane.png")}
                 className='w-full h-36 md:h-60 rounded-2xl'
                 />
             </Pressable>

    </PagerView>
   </View>
  );
}