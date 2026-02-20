import { router, useFocusEffect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { BlurView } from "expo-blur";
import api from "@/config/api";
import SitterNearYouCardLoading from "@/components/SitterNearYouCardLoading";
import SitterNearYouCard from "@/components/SitterNearYouCard";

type Pet = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export default function MyPets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchPets = async () => {
        try {
          const res = await api.get("/owner/pets");
          setPets(res.data);
        } catch (e) {
          console.error(e);
        }
      };
      fetchPets();
    }, []),
  );

  return (
    <SafeAreaView className="flex-1" edges={["top", "right", "left"]}>
      <View className="flex flex-col w-full p-10 items-center pb-3">
        <Text className="text-[#0A0A0A] text-4xl self-start">My posts</Text>
      </View>
      {loading ? (
        <View className="flex mt-5">
          <View className={"w-full h-60 px-8 mb-6"}>
            <SitterNearYouCardLoading />
          </View>
          <View className={"w-full h-60 px-8 mb-6"}>
            <SitterNearYouCardLoading />
          </View>
          <View className={"w-full h-60 px-8 mb-6"}>
            <SitterNearYouCardLoading />
          </View>
        </View>
      ) : pets.length === 0 ? (
        <View className={"flex-1 flex items-center justify-center px-10"}>
          <Text className="text-xl font-semibold text-[#0A0A0A] mb-2">
            No pets found
          </Text>
          <Text className="text-center text-base text-gray-500">
            You haven't added any pet yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={pets}
          className={"w-full mt-5"}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className={"w-full h-60 px-8 mb-6"}></View>
          )}
          contentContainerStyle={{ paddingBottom: 75 }}
        />
      )}
    </SafeAreaView>
  );
}
