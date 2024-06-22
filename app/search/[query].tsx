import { SafeAreaView, Text, View, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import EventCard from "@/components/EventCard";
import { searchEvents } from "@/lib/appwrite";
import useAppWrite from "@/lib/useAppwrite";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: searchedEvents, refetch } = useAppWrite(() => searchEvents(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary border-2 h-full">
      <FlatList
        data={searchedEvents}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <EventCard event={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="text-sm font-medium text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-semibold text-white">{query}</Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
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

export default Search;
