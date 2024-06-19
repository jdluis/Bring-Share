import { View, Text, FlatList, SafeAreaView } from 'react-native'
import React from 'react'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
  <View >
    <Text >{title}</Text>
  </View>
);

const Home = () => {
  return (
    <View className='flex-1 justify-center items-center'>
      <SafeAreaView className=''>
        <Text className='text-2xl'>My Events</Text>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />


        <Text className='text-2xl'>Events</Text>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  )
}

export default Home

