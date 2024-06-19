import React from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from "@/constants/images"
import CustomButton from '@/components/CustomButton'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'

const index = () => {
  return (
    <SafeAreaView className=' bg-bg_onboarding h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full justify-center items-center h-[85vh] px-4'>
          <Image
            source={images.logo}
            className='w-[280px] h-[84px]'
            resizeMode='contain'
          />
          <View className='relative mt-5'>
            <Text className='text-3xl text-white text-center font-bold'>
              Easily organize your events and collaborate with friends with {' '}
              <Text className='text-success'>
                BringAlong!
              </Text>
            </Text>

            <Image
              source={images.path}
              className='w-[200px] h-[15px] absolute -bottom-2 right-8'
              resizeMode='contain'
            />
          </View>

          <Text className='text-sm text-gray-100 mt-7 text-center font-light'>
            Create unique events, invite your friends, and together bring what you need. Make every gathering special!
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => {router.push('/sign-in')}}
            containerStyles='w-full mt-7'
          />
           <CustomButton
            title="Continue with event code"
            handlePress={() => {router.push('/enter-code')}}
            containerStyles='w-full mt-7 bg-gray-200 '
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}

export default index