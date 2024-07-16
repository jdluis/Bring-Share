import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import React, { useState } from "react";
import FormTextField from "@/components/FormTextField";
import icons from "@/constants/icons";
import FormDateField from "@/components/FormDateField";
import useFormatDate from "@/lib/useFormatDate";
import { createEvent, uploadImage } from "@/lib/appwrite";
import CustomButton from "@/components/CustomButton/CustomButton";
import * as ImagePicker from 'expo-image-picker';

const CreateEvent = () => {
  const [creating, setCreating] = useState<boolean>(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    start_date: new Date(),
    finish_date: new Date(),
    coverImg: "",
    location: "",
  });

  const handleDateChange = (field: string, date: Date) => {
    setForm({ ...form, [field]: useFormatDate(date) });
  };

  const handleSubmit = async () => {
    setCreating(true);
    try {
      let coverImgUrl;
      if (form.coverImg) {
        coverImgUrl = await uploadImage(form.coverImg);
      }
      
      //const newEvent = await createEvent({ ...form, coverImg: coverImgUrl });
      const newEvent = await createEvent(form);

      setCreating(false);

      return newEvent;
    } catch (error) {
      console.log(error);
    } finally {
      setCreating(false);
    }
  };
  

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Permission to access the gallery is required!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, coverImg: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white">Create Event</Text>

        <FormTextField
          type="text"
          title={"Event Title"}
          value={form.title}
          placeholder="Give your event a catch title..."
          handleChangeText={(e: string) => setForm({ ...form, title: e })}
        />
        <View className="mt-7 space-y-2">
          <FormTextField
            type="text"
            title={"Adress"}
            value={form.location}
            placeholder="Give your event a location..."
            handleChangeText={(e: string) => setForm({ ...form, location: e })}
          />
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-normal">
            Upload Cover
          </Text>
          <TouchableOpacity onPress={handleImagePicker}>
            {form.coverImg ? (
              <Image
                source={{ uri: form.coverImg }}
                resizeMode="cover"
                className="w-full h-64"
              />
            ) : (
              <View className="w-full h-40 px-4 rounded-2xl bg-gray-700 justify-center items-center ">
                <View className="w-14 h-14 border border-dashed border-secondary justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <FormTextField
            type="textarea"
            title={"Description"}
            value={form.description}
            placeholder="Give your event a description..."
            handleChangeText={(e: string) =>
              setForm({ ...form, description: e })
            }
          />
        </View>

        {/* DATE FORMAT ON DATABASE MM/DD/AA HH-MM-SS */}
        <View className="mt-7 space-y-2 flex flex-row justify-between">
          <FormDateField
            value={form.start_date}
            otherStyles="w-[43vw]"
            title={"Start Date"}
            handleChangeDate={(date) => handleDateChange("startDate", date)}
          />
          <FormDateField
            value={form.finish_date}
            otherStyles="w-[43vw]"
            title={"Finish Date"}
            handleChangeDate={(date) => handleDateChange("finishDate", date)}
          />
        </View>
      </ScrollView>
      <CustomButton
        title={"Create Event"}
        handlePress={handleSubmit}
        isLoading={creating}
      />
    </SafeAreaView>
  );
};

export default CreateEvent;
