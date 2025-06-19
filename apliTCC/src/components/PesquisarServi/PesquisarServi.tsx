import { Feather } from '@expo/vector-icons';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


export function PesquisarServi() {
 return (
   <View className='w-full flex-row border border-slate-500 h-14 rounded-full items-center gap-2 px-4 mt-2 bg-transparent'>
    <Feather name='search' size={24} color={'#64748b'} />

    <TextInput
        className='w-full h-ful flex-1 bg-transparent'
        placeholder='Pesquisar serviços'
    />
   </View>
  );
}