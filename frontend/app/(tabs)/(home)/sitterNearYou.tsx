import SitterNearYouCard from "@/components/SitterNearYouCard";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SitterNearYou = () => {
  return (
    <SafeAreaView className={"flex-1"} edges={["right", "bottom", "left"]}>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        className={"w-full mt-5 mb-24"}
      >
        <View className={"w-full h-60 px-8 mb-6"}>
          <SitterNearYouCard />
        </View>
        <View className={"w-full h-60 px-8 mb-6"}>
          <SitterNearYouCard />
        </View>
        <View className={"w-full h-60 px-8 mb-6"}>
          <SitterNearYouCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SitterNearYou;
