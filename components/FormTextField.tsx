import { View, Text, TextInput, TouchableOpacity, Image, KeyboardTypeOptions } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons'

interface FormTextFieldProps {
    title: string,
    type: "password" | "textarea" | "text"
    value: string,
    placeholder?: string,
    handleChangeText: (text: string) => void,
    otherStyles?: string,
    keyboardType?: KeyboardTypeOptions
}

const FormTextField = ({
    title,
    value,
    type,
    placeholder,
    handleChangeText,
    otherStyles,
    keyboardType
}: FormTextFieldProps) => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className='text-base text-gray-100 font-medium'>{title}</Text>

            <View className={`w-full ${type === "textarea" ? "h-24" : "h-16"} px-4 bg-gray-800 rounded-2xl focus:border-secondary items-center flex-row`}>
                {(type === "text" || type === "password") && (
                    <>
                        <TextInput
                            className='flex-1 text-white font-semibold w-full'
                            value={value}
                            placeholder={placeholder}
                            placeholderTextColor="#7b7b8b"
                            onChangeText={handleChangeText}
                            secureTextEntry={type === "password" && !showPassword}
                            keyboardType={keyboardType}
                        />
                        {type === "password" && (
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Image
                                    source={!showPassword ? icons.eye : icons.eyehide}
                                    resizeMode='contain'
                                    className='w-6 h-6'
                                />
                            </TouchableOpacity>
                        )}
                    </>
                )}

                {type === "textarea" && (
                    <TextInput
                        className='flex-1 text-white font-semibold w-full h-full py-2'
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor="#7b7b8b"
                        onChangeText={handleChangeText}
                        multiline={true}
                        keyboardType={keyboardType}
                        textAlignVertical='top'
                    />
                )}
            </View>
        </View>
    )
}

export default FormTextField
