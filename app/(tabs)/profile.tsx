import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton/CustomButton'
import { signOut } from '@/lib/appwrite'

const Profile = () => {
  return (
    <SafeAreaView className="bg-primary border-2 h-full">
      <Text>Profile</Text>
      <CustomButton title={'Log Out'} handlePress={() => signOut()}     
      />
    </SafeAreaView>
  )
}

export default Profile