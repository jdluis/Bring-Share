import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import FormTextField from "@/components/FormTextField";
import icons from "@/constants/icons";
import FormDateField from "@/components/FormDateField";
import useFormatDate from "@/lib/useFormatDate";
import { createEvent, uploadImage } from "@/lib/appwrite";
import CustomButton from "@/components/CustomButton/CustomButton";
import * as ImagePicker from 'expo-image-picker';
import { EventFormInterface } from "@/Interfaces/eventInterface";
import { router } from "expo-router";

const CreateEvent: React.FC = () => {
  const [creating, setCreating] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [form, setForm] = useState<Omit<EventFormInterface, '$id' | 'creator'>>({
    title: "",
    start_date: new Date(),
    finish_date: new Date(),
    description: "",
    coverImg: "",
    categories: [],
    members: [],
    location: ""
  });

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permiso requerido", "Se requiere permiso para acceder a la galería de imágenes.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      setForm(prev => ({ ...prev, coverImg: result.assets[0].uri }));
    }
  };

  const handleDateChange = (field: 'start_date' | 'finish_date', date: Date) => {
    setForm(prev => ({ ...prev, [field]: date }));
  };

  const handleSubmit = async () => {
    setCreating(true);
    try {
      if (!image) {
        setCreating(false);
        return Alert.alert('Please provide a cover image');
      }
      const coverImgId = await uploadImage({ image, setUploading });

      if (coverImgId instanceof Error) {
        setCreating(false);
        return Alert.alert('Error', coverImgId.message);
      }

      const eventData = {
        ...form,
        coverImg: coverImgId,
        start_date: form.start_date,
        finish_date: form.finish_date
      };

      const newEvent = await createEvent(eventData as EventFormInterface);
      Alert.alert("Éxito", "Evento creado exitosamente");
      router.push(`/${newEvent.$id}`)
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo crear el evento. Por favor, inténtalo de nuevo.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white">Create Event</Text>

        <FormTextField
          type="text"
          title="Event Title"
          value={form.title}
          placeholder="Give your event a catchy title..."
          handleChangeText={(e: string) => setForm(prev => ({ ...prev, title: e }))}
        />
        <View className="mt-7 space-y-2">
          <FormTextField
            type="text"
            title="Address"
            value={form.location}
            placeholder="Give your event a location..."
            handleChangeText={(e: string) => setForm(prev => ({ ...prev, location: e }))}
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
            title="Description"
            value={form.description}
            placeholder="Give your event a description..."
            handleChangeText={(e: string) =>
              setForm(prev => ({ ...prev, description: e }))
            }
          />
        </View>

        <View className="mt-7 space-y-2 flex flex-row justify-between">
          <FormDateField
            value={form.start_date}
            otherStyles="w-[43vw]"
            title="Start Date"
            handleChangeDate={(date) => handleDateChange("start_date", date)}
          />
          <FormDateField
            value={form.finish_date}
            otherStyles="w-[43vw]"
            title="Finish Date"
            handleChangeDate={(date) => handleDateChange("finish_date", date)}
          />
        </View>
      </ScrollView>
      <CustomButton
        title="Create Event"
        handlePress={handleSubmit}
        isLoading={creating}
      />
    </SafeAreaView>
  );
};

export default CreateEvent;