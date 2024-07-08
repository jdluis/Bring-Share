import { SafeAreaView, ScrollView, Text } from 'react-native'
import React, { useState } from 'react'
import FormTextField from '@/components/FormTextField'

const AddItem = () => {
  const [form, setForm] = useState({
    name: "",
    creator: "",
    category: [],
    tags: [],
    event: "",
    quantity: 0
  })

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white'>Bring Item</Text>

        <FormTextField
          type='text'
          title={'Item Name'}
          value={form.name}
          placeholder='Give your event a catch title...'
          handleChangeText={(e: string) => setForm({ ...form, name: e })}
        />

      </ScrollView>
    </SafeAreaView>
  )
}

export default AddItem