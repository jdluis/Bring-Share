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
import EmptyState from "@/components/EmptyState";
import { getAllEvents, getLatestEvents } from "@/lib/appwrite";
import useAppWrite from "@/lib/useAppwrite";
import EventCard from "@/components/EventCard";
import { useGlobalContex } from "@/context/GlobalProvider";
import LatestEvents from "@/components/LatestEvents";

const Home = () => {
  const { user } = useGlobalContex();
  const [refreshing, setRefreshing] = useState(false);
  const { data: events, refetch, isLoading } = useAppWrite(getAllEvents);
  const { data: latestEvents } = useAppWrite(getLatestEvents);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  
  return (
    <SafeAreaView className="bg-primary border-2 h-full">
      <FlatList
        data={events}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <EventCard event={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6 ">
              <View>
                <Text className="text-sm font-medium text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-semibold text-white">
                  {user?.username}
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

            <SearchInput />
            
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-300">Latest Events</Text>
              <LatestEvents events={latestEvents} />
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
