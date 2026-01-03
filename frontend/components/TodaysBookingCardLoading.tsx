import React from "react";
import { View } from "react-native";

const TodaysBookingCardLoading = () => {
  return (
    <View
      className={
        "flex flex-col px-6 py-6 w-[310px] h-48 rounded-3xl bg-[#DDDDDD] ml-8 justify-between opacity-[0.4]"
      }
    >
      <View className={"flex-row flex w-full justify-between items-center "}>
        <View className={"flex flex-row"}>
          <View className={"w-12 h-12 rounded-full bg-gray-400"} />
          <View className={"flex flex-col ml-3"}>
            <View className="w-32 h-4 bg-gray-500 my-1 rounded-3xl" />
            <View className="w-16 h-4 bg-gray-400 rounded-3xl" />
          </View>
        </View>
        <View className={"w-8 h-8 rounded-full bg-gray-400"} />
      </View>
      <View
        className={
          "w-full flex-row flex h-20 p-4 bg-[#CCCCCC] rounded-2xl justify-between"
        }
      >
        <View className={"flex justify-around"}>
          <View className="w-16 h-4 bg-gray-500 rounded-3xl" />
          <View className="w-32 h-4 bg-gray-400 rounded-3xl" />
        </View>

        <View className={"flex justify-around"}>
          <View className="w-16 h-4 bg-gray-500 rounded-3xl " />
          <View className="w-32 h-4 bg-gray-400 rounded-3xl" />
        </View>
      </View>
    </View>
  );
};

export default TodaysBookingCardLoading;
