import { StyleSheet, Text, View, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import FormTextField from "@/components/FormTextField";
import CustomButton from "@/components/CustomButton/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { useGlobalContex } from '@/context/GlobalProvider'


const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContex();

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      return Alert.alert("Error", "Please fill all the fields");
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form);
      setUser(result)
      setIsLoggedIn(true)

      if (!result) throw Error;

      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[200px] h-[35px] mx-auto"
          />

          <Text className="text-2xl text-white mt-10 font-semibold">
            Sign up to Bring & Share
          </Text>

          <FormTextField
            type="text"
            title="Username"
            value={form.username}
            handleChangeText={(e: string) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            placeholder="Example: Cora"
          />

          <FormTextField
            type="text"
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="Example: bringshare@gmail.com"
          />

          <FormTextField
            type="password"
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-regular">
              Have an account already?
            </Text>
            <Link
              className="text-lg font-semibold text-secondary"
              href="/sign-in"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
