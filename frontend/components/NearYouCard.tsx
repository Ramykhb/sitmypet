import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

const NearYouCard = (props: any) => {
  const [isSaved, setIsSaved] = useState(false);
  return (
    <View
      className={
        "flex flex-col px-4 py-4 w-[280px] h-52 rounded-3xl border-gray-300 border ml-8"
      }
    >
      <View className={"w-full h-[70%] rounded-2xl overflow-hidden relative"}>
        <BlurView
          intensity={60}
          tint="dark"
          className="absolute top-3 left-3 z-10 flex-row items-center px-2 py-1 rounded-lg"
        >
          <Image
            source={require("../assets/icons/star.png")}
            className={"w-4 h-4 ml-1"}
          />
          <Text className={"text-[#FFCA00] text-sm ml-1"}>4.8</Text>
          <Text className={"text-sm text-white ml-1"}>(320)</Text>
        </BlurView>
        <Image
          source={require("../assets/images/dog.jpg")}
          className={"w-full h-full"}
          resizeMode={"cover"}
        />
        <Pressable
          onPress={() => {
            setIsSaved(!isSaved);
          }}
          className="absolute top-3 right-3 z-50 p-2"
        >
          {isSaved ? (
            <Image
              source={require("../assets/icons/bookmark-filled.png")}
              tintColor={"#ffffff"}
              className={"z-20 w-6 h-6"}
            />
          ) : (
            <Image
              source={require("../assets/icons/bookmark.png")}
              tintColor={"#ffffff"}
              className={"z-20 w-6 h-6"}
            />
          )}
        </Pressable>
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
        >
          Golden retriever needs a walk to the park
        </Text>
        <View className={"w-full flex flex-row items-center h-8"}>
          <Image
            source={require("../assets/icons/pin.png")}
            className={"w-4 h-4"}
          />
          <Text className={"text-gray-500 ml-2 font-semibold text-sm"}>
            Beirut
          </Text>
          <View className={"w-1 h-1 rounded-full ml-2 bg-gray-500"} />
          <Text className={"text-gray-500 ml-2 font-semibold text-sm"}>
            Hike
          </Text>
          <View className={"w-[1px] h-[12px] rounded-full ml-2 bg-gray-500"} />
          <Text className={"text-gray-500 ml-2 font-semibold text-sm"}>
            2-3 Days
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NearYouCard;
