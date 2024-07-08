import { Text, SafeAreaView, ScrollView, View, Image } from "react-native";
import React from "react";
import useAppWrite from "@/lib/useAppwrite";
import { getEventById } from "@/lib/appwrite";
import { useLocalSearchParams } from "expo-router";
import icons from "@/constants/icons";
import LatestNotification from "@/components/LatestNotification";

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
    <SafeAreaView className="bg-primary border-2 h-full pt-8">
      {event[0] && !isLoading && (
        <>
          <Image
            source={{ uri: event[0].coverImg }}
            className="w-full h-40"
            resizeMode="cover"
            alt={event[0].title}
          />
          <View className="mt-6 px-4 ">
            <View className="justify-between items-start flex-row mb-6 ">
              <View>
                <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                  <Image
                    source={{ uri: event[0].creator.avatar }}
                    resizeMode="cover"
                    className="w-full h-full rounded-lg"
                  />
                </View>
                <Text className="text-xs text-white text-center">
                  {event[0].creator.username}
                </Text>
              </View>
              <Text className="text-xl font-semibold text-white">
                {event[0].title}
              </Text>

            </View>
          </View>
          <ScrollView>
            <View>
              <Text className="text-lg font-normal text-gray-100 px-4 ">
                {event[0].description}
              </Text>
            </View>
          </ScrollView>

          <LatestNotification notifications={[{
            id: "1",
            creator: event[0].creator,
            action: "add",
            date: Date.now()
          }]} />
        </>
      )}
    </SafeAreaView>
  );
};

export default Event;
