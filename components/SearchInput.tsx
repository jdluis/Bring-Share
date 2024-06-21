import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import icons from "@/constants/icons";

interface SearchInputProps {
  value: any;
  handleChangeText: any;
  otherStyles?: any;
  keyboardType?: any;
}

const SearchInput = ({
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
}: SearchInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-full h-16 px-4 bg-gray-800 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-normal "
        value={value}
        placeholder={"Search for a Event name"}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
      />
      <TouchableOpacity>
        <Image 
            source={icons.search }
            resizeMode="contain"
            className="w-9 h-10"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
