import { View, Text } from 'react-native'
import React from 'react'

interface InfoBoxProps {
    title: string | number
    subtitle?: string
    containerStyles?: string
    titleStyles?: string
}

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }: InfoBoxProps) => {
    return (
        <View className={`${containerStyles} `}>
            <Text className={`${titleStyles} text-center text-white font-semibold `}>{title}</Text>
            <Text className='text-sm text-gray-100 font-normal'>{subtitle}</Text>
        </View>
    )
}

export default InfoBox