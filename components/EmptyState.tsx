import { View, Text, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import CustomButton from "./CustomButton/CustomButton";
import { router } from "expo-router";

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className=" justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[215px]"
      />
      <View>
        <Text className="text-sm font-semibold text-gray-100">{subtitle}</Text>
        <Text className="text-xl font-medium text-white text-center">{title}</Text>
      </View>

      <CustomButton 
        title= "Create Event"
        handlePress={() => router.push("/create-event")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
