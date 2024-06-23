import { SafeAreaView, View, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import EmptyState from "@/components/EmptyState";
import EventCard from "@/components/EventCard";
import { getUserEvents, signOut } from "@/lib/appwrite";
import useAppWrite from "@/lib/useAppwrite";
import { useGlobalContex } from "@/context/GlobalProvider";
import icons from "@/constants/icons";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { data: userEvents } = useAppWrite(() => getUserEvents(user.$id));
  const { user, setUser, setIsLoggedIn } = useGlobalContex()

  const logOut = async () => {
    await signOut();
    setUser(null)
    setIsLoggedIn(false)

    router.push("/sign-in");
  }

  return (
    <SafeAreaView className="bg-primary border-2 h-full">
      <FlatList
        data={userEvents}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <EventCard event={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logOut}>
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }} resizeMode="cover" className="w-[90%] h-[90%]" />
            </View>
            <InfoBox title={user?.username} containerStyles='mt-5' titleStyles="text-lg" />

            <View className=" flex-row">
              <InfoBox title={userEvents.length || 0} subtitle="Events" containerStyles='mr-10' titleStyles="text-xl" />
              <InfoBox title={"3"} subtitle="Friends" titleStyles="text-xl" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Events Found"
            subtitle="No events found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};



export default Profile