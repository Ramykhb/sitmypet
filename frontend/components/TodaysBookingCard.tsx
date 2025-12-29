import React from "react";
import { Image, Text, View } from "react-native";

const TodaysBookingCard = () => {
  return (
    <View
      className={
        "flex flex-col px-6 py-6 w-[310px] h-48 rounded-3xl border-gray-300 border ml-8 justify-between"
      }
    >
      <View className={"flex-row flex w-full justify-between items-center "}>
        <View className={"flex flex-row"}>
          <Image
            source={require("../assets/images/pfp.jpg")}
            alt="Home Image"
            className={"w-12 h-12 rounded-full"}
            resizeMode={"cover"}
          />
          <View className={"flex flex-col ml-3"}>
            <Text className={"text-base text-[#0A0A0A] text-left"}>
              RK da Goat
            </Text>
            <Text className={"text-sm text-gray-500 text-left"}>
              Falha ahh dog
            </Text>
          </View>
        </View>
        <Image
          source={require("../assets/icons/bell-red.png")}
          alt="Home Image"
          className={"w-8 h-8 rounded-full"}
          resizeMode={"cover"}
        />
      </View>
      <View
        className={
          "w-full flex-row flex h-20 p-4 bg-[#E8ECED] rounded-2xl justify-between"
        }
      >
        <View className={"flex justify-around"}>
          <Text className={"text-xs text-gray-500"}>Service type</Text>
          <Text className={"text-base"}>Dog Walking</Text>
        </View>
        <View className={"h-full w-[1px] bg-gray-300"} />

        <View className={"flex justify-around"}>
          <Text className={"text-xs text-gray-500"}>Hamra, Beirut</Text>
          <Text className={"text-base"}>10:00 AM</Text>
        </View>
      </View>
    </View>
  );
};

export default TodaysBookingCard;
