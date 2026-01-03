import React from "react";
import { Text, View } from "react-native";

const SitterNearYouCardLoading = () => {
  return (
    <View
      className={
        "flex flex-col px-4 py-4 w-full h-full rounded-3xl bg-gray-300 opacity-[0.2]"
      }
    >
      <View
        className={
          "w-full h-[70%] rounded-2xl overflow-hidden relative bg-gray-400"
        }
      >
        <View
          className={
            "rounded-3xl absolute top-3 left-3 z-10 overflow-hidden bg-gray-400 w-18"
          }
        ></View>
      </View>
      <View
        className={
          "w-full overflow-hidden mt-2 flex-col justify-between flex-1"
        }
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="w-full font-bold"
        ></Text>
        <View className={"w-full flex flex-row items-center h-8"}>
          <View className={"ml-2 bg-gray-500 rounded-3xl w-16 h-4 "}></View>
          <View className={"ml-2 bg-gray-500 rounded-3xl w-16 h-4 "}></View>
          <View className={"ml-2 bg-gray-500 rounded-3xl w-16 h-4 "}></View>
        </View>
      </View>
    </View>
  );
};

export default SitterNearYouCardLoading;
