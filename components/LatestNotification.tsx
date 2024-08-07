import { Text, FlatList, View, Image } from "react-native";
import React from "react";
import NotificationInterface from "@/Interfaces/notificationsInterface";

interface LatestNotificationProps {
  notifications: NotificationInterface[];
}

/*   //Temporal
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      creator: user,
      action: "addItem",
      date: 5,
    },
    {
      id: "2",
      creator: user,
      action: "deleteItem",
      date: 10,
    },
  ]); */

const LatestNotification = ({ notifications }: LatestNotificationProps) => {
  return (
    <>
      <View className="border-t-2 w-10/12 m-auto">
        <Text className="text-lg text-white" >News</Text>
      </View>
      <FlatList
        className="px-4"
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
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
    </>
  );
};

export default LatestNotification;
