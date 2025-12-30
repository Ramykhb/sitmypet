import NearYouCard from "@/components/NearYouCard";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NearYou = () => {
  return (
    <SafeAreaView className={"flex-1"} edges={["right", "bottom", "left"]}>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        className={"w-full mt-5"}
      >
        <View className={"w-full h-60 px-8 mb-6"}>
          <NearYouCard />
        </View>
        <View className={"w-full h-60 px-8 mb-6"}>
          <NearYouCard />
        </View>
        <View className={"w-full h-60 px-8 mb-6"}>
          <NearYouCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default NearYou;
