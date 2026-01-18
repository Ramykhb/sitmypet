import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

const notifications = () => {
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} className={"pt-10 px-10"}>
      <View className={"flex"}>
        <View className={"flex flex-row items-center"}>
          <Image
            source={require("../../../assets/icons/tray-filled.png")}
            className={"w-8 h-8 mr-3"}
          />
          <Text className={"text-2xl text-[#0a0a0a]"}>Inbox</Text>
        </View>
        <View className={"flex w-full"}>
          <View className={"flex flex-row items-center mt-4"}>
            <Image
              source={require("../../../assets/images/pfp.jpg")}
              className={"w-16 h-16 mr-3 rounded-full"}
            />
            <View className={"flex justify-between flex-1"}>
              <Text className={"text-2xl text-[#0a0a0a]"}>Ramy Khachab</Text>
              <Text className={"text-md text-[#666666]"} numberOfLines={1}>
                Hey brow! just admit that yeat is da goat and you like listening
                to yeat.
              </Text>
            </View>
            <View
              className={
                "w-6 h-6 rounded-full bg-red-500 flex justify-center items-center ml-3"
              }
            >
              <Text className={"text-white"}>1</Text>
            </View>
          </View>
          <View className={"flex flex-row items-center mt-4"}>
            <Image
              source={require("../../../assets/images/pfp.jpg")}
              className={"w-16 h-16 mr-3 rounded-full"}
            />
            <View className={"flex justify-between flex-1"}>
              <Text className={"text-2xl text-[#0a0a0a]"}>Ramy Khachab</Text>
              <Text className={"text-md text-[#666666]"} numberOfLines={1}>
                Hey brow! just admit that yeat is da goat and you like listening
                to yeat.
              </Text>
            </View>
            <View
              className={
                "w-6 h-6 rounded-full bg-red-500 flex justify-center items-center ml-3"
              }
            >
              <Text className={"text-white"}>1</Text>
            </View>
          </View>
          <View className={"flex flex-row items-center mt-4"}>
            <Image
              source={require("../../../assets/images/pfp.jpg")}
              className={"w-16 h-16 mr-3 rounded-full"}
            />
            <View className={"flex justify-between flex-1"}>
              <Text className={"text-2xl text-[#0a0a0a]"}>Ramy Khachab</Text>
              <Text className={"text-md text-[#666666]"} numberOfLines={1}>
                Hey brow! just admit that yeat is da goat and you like listening
                to yeat.
              </Text>
            </View>
            <View
              className={
                "w-6 h-6 rounded-full bg-red-500 flex justify-center items-center ml-3"
              }
            >
              <Text className={"text-white"}>1</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity className="w-[36%] ml-[32%] bg-[#3944D5] h-10 rounded-full flex flex-row items-center justify-center mt-3 mb-2">
          <Text className="text-white text-md font-bold">View All</Text>
        </TouchableOpacity>
        <View className={"flex flex-row items-center"}>
          <Image
            source={require("../../../assets/icons/half-review.png")}
            className={"w-8 h-8 mr-3"}
          />
          <Text className={"text-2xl text-[#0a0a0a]"}>Inbox</Text>
        </View>
        <View className={"flex w-full"}>
          <View className={"flex flex-row items-center mt-4"}>
            <Image
              source={require("../../../assets/images/pfp.jpg")}
              className={"w-16 h-16 mr-6 rounded-full"}
            />
            <View className={"flex justify-between flex-1"}>
              <Text className={"text-xl text-[#0a0a0a]"}>
                Ramy Khachab has left you a review!
              </Text>
            </View>
            <Image
              source={require("../../../assets/icons/right-arrow.png")}
              className={"w-4 ml-6 h-4"}
            />
          </View>
          <View className={"flex flex-row items-center mt-4"}>
            <Image
              source={require("../../../assets/images/pfp.jpg")}
              className={"w-16 h-16 mr-6 rounded-full"}
            />
            <View className={"flex justify-between flex-1"}>
              <Text className={"text-xl text-[#0a0a0a]"}>
                Ramy Khachab has left you a review!
              </Text>
            </View>
            <Image
              source={require("../../../assets/icons/right-arrow.png")}
              className={"w-4 ml-6 h-4"}
            />
          </View>
          <View className={"flex flex-row items-center mt-4"}>
            <Image
              source={require("../../../assets/images/pfp.jpg")}
              className={"w-16 h-16 mr-6 rounded-full"}
            />
            <View className={"flex justify-between flex-1"}>
              <Text className={"text-xl text-[#0a0a0a]"}>
                Ramy Khachab has left you a review!
              </Text>
            </View>
            <Image
              source={require("../../../assets/icons/right-arrow.png")}
              className={"w-4 ml-6 h-4"}
            />
          </View>
        </View>
        <TouchableOpacity className="w-[36%] ml-[32%] bg-[#3944D5] h-10 rounded-full flex flex-row items-center justify-center mt-5 mb-5">
          <Text className="text-white text-md font-bold">View All</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default notifications;
