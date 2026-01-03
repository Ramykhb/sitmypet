import React from "react";
import { View } from "react-native";

const ClientHistoryCardLoading = () => {
  return (
    <View className={"flex flex-col  w-20 items-center ml-3 opacity-[0.5]"}>
      <View className={"w-16 h-16 rounded-full bg-gray-300"} />
      <View className="w-16 h-4 bg-gray-400 rounded-3xl mt-2" />
    </View>
  );
};

export default ClientHistoryCardLoading;
