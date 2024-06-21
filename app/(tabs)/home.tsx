import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import images from "@/constants/images";
import SearchInput from "@/components/SearchInput";
import LatestNotification from "@/components/LatestNotification";
import EmptyState from "@/components/EmptyState";
import { getAllEvents } from "@/lib/appwrite";
import useAppWrite from "@/lib/useAppwrite";
import EventCard from "@/components/EventCard";
import { useGlobalContex } from "@/context/GlobalProvider";

const Home = () => {
  const { user } = useGlobalContex();
  const [refreshing, setRefreshing] = useState(false);
  const { data: events, refetch, isLoading } = useAppWrite(getAllEvents);

  //Temporal
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
  ]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  {
    console.log(user);
  }
  return (
    <SafeAreaView className="bg-primary border-2 h-full">
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6 ">
              <View>
                <Text className="text-sm font-medium text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-semibold text-white">
                  {user ? user.username : "Username"}
                </Text>
              </View>

              <View>
                <Image
                  source={images.logo}
                  className="w-24 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput value={undefined} handleChangeText={undefined} />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-300">Latest Notifications</Text>
              <LatestNotification notifications={notifications} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Events Found"
            subtitle="Create Your first Event or request to your friend to join."
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
