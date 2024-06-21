import { FlatList, Image, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import EventInterface from "@/Interfaces/eventInterface";
import * as Animatable from "react-native-animatable";
import { router } from "expo-router";

interface LatestEventsProps {
  events: EventInterface[];
}

const zoomIn: any = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1.1 }],
  },
};

const zoomOut: any = {
  0: {
    transform: [{ scale: 1.1 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
};

interface LatestEventItemProps {
  activeItem: EventInterface;
  item: EventInterface;
}

const LatestEventItem = ({ activeItem, item }: LatestEventItemProps) => {
  return (
    <Animatable.View
      className="mr-5 pt-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push("")} /* To the event id detail */
        className="mt-3 relative justify-center items-center"
      >
        <Image
          source={{ uri: item.coverImg }}
          resizeMode="cover"
          className=" my-4 w-52 h-72 rounded-[35px] overflow-hidden shadow-lg shadow-black/40"
        />
        <Text className="absolute bg-black/50 text-white text-center   bottom-10 w-full p-2">
          {item.title}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const LatestEvents = ({ events }: LatestEventsProps) => {
  const [activeItem, setActiveItem] = useState<EventInterface>(events[1]);

  const viewableItemsChanges = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={events}
      keyExtractor={(item) => item.$id}
      horizontal
      onViewableItemsChanged={viewableItemsChanges}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentInset={{ x: 170 }}
      renderItem={({ item }) => (
        <LatestEventItem activeItem={activeItem} item={item} />
      )}
    />
  );
};

export default LatestEvents;
