import { Text, SafeAreaView, ScrollView, View, Image } from "react-native";
import React from "react";
import useAppWrite from "@/lib/useAppwrite";
import { getEventById } from "@/lib/appwrite";
import { useLocalSearchParams } from "expo-router";
import icons from "@/constants/icons";

const Event = () => {
  const params = useLocalSearchParams();
  const { $id } = params;
  const { data: event, isLoading } = useAppWrite(() => getEventById($id));

  //Skeleton
  isLoading && (
    <Image
      source={icons.search}
      resizeMode="contain"
      className="w-20 h-20 m-auto"
    />
  );

  return (
    <SafeAreaView className="bg-primary border-2 h-full pt-8 px-4 ">
      {event[0] && !isLoading && (
        <>
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6 ">
              <View>
                <Text className="text-2xl font-semibold text-white">
                  Title: {event[0].title}
                </Text>
              </View>
            </View>
          </View>
          <ScrollView>
            <View className="p-4 ">
              <Text className="text-lg font-normal text-gray-100 ">
                Description: {event[0].description}
              </Text>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default Event;
