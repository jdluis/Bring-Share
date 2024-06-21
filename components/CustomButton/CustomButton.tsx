import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { EventHandler } from 'react-native-reanimated'
import CustomButtonProps from './CustomButton.types'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
            className={`bg-orange-400 rounded-xl min-h-[62px] justify-center items-center ${isLoading ? 'opacity-50' : ''} ${containerStyles}  `}
        >
            <Text className={`text-primary font-semibold text-lg ${textStyles}`}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton