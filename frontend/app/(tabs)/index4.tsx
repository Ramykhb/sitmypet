import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function Index() {
  return (
    <SafeAreaView className="home-auth flex-1 ">
      <View className="flex flex-col flex-1 w-full p-10 items-center">
        <Text className="text-[#0A0A0A] text-5xl self-start">Welcome</Text>
        <Image
          source={require("../../assets/images/heroImage.png")}
          alt="logo"
          className="w-full h-64 mt-12"
          resizeMode="contain"
        />
        <Text className="text-[#0A0A0A] text-lg mt-5 font-bold">
          Homepage 4
        </Text>
      </View>
    </SafeAreaView>
  );
}
