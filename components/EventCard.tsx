import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import EventInterface from "@/Interfaces/eventInterface";
import icons from "@/constants/icons";
import { router } from "expo-router";

interface EventCardProps {
  event: EventInterface;
}

const EventCard = ({
  event: {
    $id,
    title,
    creator: { username, avatar },
    coverImg,
  },
}: EventCardProps) => {
  return (
    <View className="flex-col items-center justify-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center flex-row flex-1 items-center">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              resizeMode="cover"
              className="w-full h-full rounded-lg"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              numberOfLines={1}
              className="text-sm font-semibold text-white"
            >
              {title}
            </Text>
            <Text
              numberOfLines={1}
              className="text-xs font-normal text-gray-100"
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} resizeMode="contain" className="w-5 h-5" />
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push(`/${$id}`)}
        className="w-full h-60 mt-3 relative justify-center items-center"
      >
        <Image
          source={{ uri: coverImg }}
          resizeMode="cover"
          className="w-full h-full rounded-xl mt-3"
        />
      </TouchableOpacity>
    </View>
  );
};

export default EventCard;
