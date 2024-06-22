import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import icons from "@/constants/icons";
import { router, usePathname } from "expo-router";

interface SearchInputProps {
  initialQuery?: string;
}

const SearchInput = ({
  initialQuery
}: SearchInputProps) => {
  const pathname = usePathname();
  const [query, setQuery] = useState<string>(initialQuery || '');

  return (
    <View className="w-full h-16 px-4 bg-gray-800 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-normal "
        value={query}
        placeholder={"Search for a Event name"}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missin query",
              "Please input somethinq to search results across database"
            );
          }

          if (pathname.startsWith("/seatch")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image
          source={icons.search}
          resizeMode="contain"
          className="w-9 h-10"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
