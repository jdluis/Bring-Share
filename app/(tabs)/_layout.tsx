import { Tabs, Redirect } from "expo-router";
import { View, Image, Text, ImageSourcePropType } from "react-native";
import icons from "@/constants/icons"

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />

      <Text className={`${focused ? 'font-semibold' : "font-bold"} text-xs`}
        style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}

function TabsLayout() {

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false, tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCD30',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              return <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused} />;
            }
          }} />

        <Tabs.Screen
          name="add-item"
          options={{
            title: "Add",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              return <TabIcon
                icon={icons.plus}
                color={color}
                name="Add"
                focused={focused} />;
            }
          }} />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              return <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused} />;
            }
          }} />
      </Tabs>
    </>
  );
}

export default TabsLayout