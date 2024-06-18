import React from 'react'
import { Text, View } from 'react-native'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text className='text-3xl font-black'>Notify</Text>
      <Link className=" text-lg rounded-2xl bg-blue-300 p-2" href="home">Go Home</Link>
    </View>
  )
}

export default index