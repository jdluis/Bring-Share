import React from 'react';
import { Text, SafeAreaView, ScrollView } from 'react-native';

const Chat: React.FC = () => {

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white'>Chat</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat