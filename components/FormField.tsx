import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons'

interface FormFieldProps {
    title: string,
    value: any,
    placeholder?: string,
    handleChangeText: any,
    otherStyles?: any,
    keyboardType?: any
}

const FormField = ({ title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    keyboardType }: FormFieldProps) => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className='text-base text-gray-100 font-medium'>{title}</Text>

            <View className='w-full h-16 px-4 bg-gray-800 rounded-2xl focus:border-secondary items-center flex-row'>
                <TextInput
                    className='flex-1 text-white font-semibold w-full'
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                />
                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image 
                            source={!showPassword ? icons.eye : icons.eyehide }
                            resizeMode='contain'
                            className='w-6 h-6'
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField