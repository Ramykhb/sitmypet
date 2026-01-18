import { Link, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeAuth = () => {
  const [name, setName] = useState("");
  const [sitLoading, setSitLoading] = useState(false);
  const [ownLoading, setOwnLoading] = useState(false);

  useEffect(() => {
    const getName = async () => {
      const fname: string | null = await SecureStore.getItemAsync("firstname");
      setName(fname as string);
    };
    getName();
  }, []);
  return (
    <SafeAreaView className="home-auth flex-1">
      <View className="flex flex-col flex-1 w-full p-10 items-center">
        <Text className="text-[#0A0A0A] text-5xl self-start">Hi, {name}</Text>
        <Image
          source={require("../../assets/images/heroImage.png")}
          alt="logo"
          className="w-full h-64 mt-12"
          resizeMode="contain"
        />
        <Text className="text-[#0A0A0A] text-lg mt-5 font-bold">
          Continue as
        </Text>
        <TouchableOpacity
          className="w-[75%] bg-[#3944D5] h-16 rounded-full flex flex-row items-center justify-center my-5"
          onPress={async () => {
            setOwnLoading(true);
            await SecureStore.setItemAsync("role", "owner");
            setOwnLoading(false);
            router.push("/(tabs)/(home)");
          }}
        >
          {ownLoading ? (
            <ActivityIndicator color={"#FFFFFF"} size={"small"} />
          ) : (
            <>
              <Image
                source={require("../../assets/icons/house-filled.png")}
                alt="logo"
                className="w-6 h-6 mr-3"
              />
              <Text className="text-white text-lg font-bold">Pet Owner</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[75%] bg-[#0F1998] h-16 rounded-full flex flex-row items-center justify-center"
          onPress={async () => {
            setSitLoading(true);
            await SecureStore.setItemAsync("role", "sitter");
            setSitLoading(false);
            router.push("/(tabs)/(home)");
          }}
        >
          {sitLoading ? (
            <ActivityIndicator color={"#FFFFFF"} size={"small"} />
          ) : (
            <>
              <Image
                source={require("../../assets/icons/paw.png")}
                alt="logo"
                className="w-6 h-6 mr-3"
              />
              <Text className="text-white text-lg font-bold">Pet Sitter</Text>
            </>
          )}
        </TouchableOpacity>

        <View className="flex-grow" />

        <View className="flex flex-col items-center justify-center">
          <Text className="text-text-gray-600 text-sm">Need help?</Text>
          <Link href={"/contactPage"}>
            <Text className="text-[#0A0A0A] text-lg font-bold">Contact us</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default HomeAuth;
