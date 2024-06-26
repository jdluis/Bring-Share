

import {  Text, View, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import FormTextField from '@/components/FormTextField'
import CustomButton from '@/components/CustomButton/CustomButton'
import { Link, router } from 'expo-router'
import { joinWithCode } from '@/lib/appwrite'

const JoinWithCode = () => {
  const [form, setForm] = useState({
    eventCode: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(null);




  const submit = async () => {
    if (!form.eventCode) {
      return Alert.alert('Error', 'Please fill enter a Code')
    }

    setIsSubmitting(true)

    try {
      await joinWithCode(form)
    } catch (error: any) {
      Alert.alert("Error", error.message)
    } finally {
      setIsSubmitting(false)
    }

  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[200px] h-[35px] mx-auto'
          />

          <Text className='text-2xl text-white mt-10 font-semibold'>Join with your code invatition</Text>

          <FormTextField
            type='password'
            title="Event Code"
            value={form.eventCode}
            handleChangeText={(e: string) => setForm({ ...form, eventCode: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title='Join Event'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-regular'>
              Want an account?
            </Text>
            <Link className='text-lg font-semibold text-secondary' href="/sign-up" >Sign Up</Link>
          </View>

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-regular'>
              Already with account?
            </Text>
            <Link className='text-lg font-semibold text-secondary' href="/sign-in" >Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default JoinWithCode