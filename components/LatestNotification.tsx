import { Text, FlatList, View, Image } from "react-native";
import React from "react";
import NotificationInterface from "@/Interfaces/notificationsInterface";

interface LatestNotificationProps {
  notifications: NotificationInterface[];
}

const LatestNotification = ({ notifications }: LatestNotificationProps) => {
  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <View className="justify-start flex-row flex-1 items-center">
        <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
              <Image
                source={{ uri: item.creator ? item.creator.avatar : "https://preview.redd.it/prr7c5lgfsfc1.png?auto=webp&s=61c8e4f788f32659e1278f8fdbde3f164d767378" }}
                resizeMode="cover"
                className="w-full h-full rounded-lg"
              />
            </View>
        <Text className="text-sm">{item.creator ? item.creator.username : "Username"}</Text>
        <Text className="text-sm">{item.action}</Text>
      </View>
      )}
    />
  );
};

export default LatestNotification;
