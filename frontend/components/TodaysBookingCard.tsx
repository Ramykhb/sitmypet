import React from "react";
import { Image, Text, View } from "react-native";

type TodaysBooking = {
    id: string;
    location: string;
    ownerImageURL: string;
    ownerName: string;
    petName: string;
    serviceType: string;
    time: string;
    styling: string
};

const serviceIcons: Record<string, any> = {
    "dog walking": require("../assets/icons/dogWalking.png"),
    "pet sitting": require("../assets/icons/petSitting.png"),
    "grooming": require("../assets/icons/petGrooming.png"),
    "medication administration'": require("../assets/icons/petHealth.png"),
};

const TodaysBookingCard = (props:TodaysBooking) => {
  return (
    <View
      className={
        `flex flex-col px-6 py-6 rounded-3xl border-gray-300 border ml-8 justify-between ${props.styling}`
      }
    >
      <View className={"flex-row flex w-full justify-between items-center "}>
        <View className={"flex flex-row"}>
          <Image
            source={{uri: props.ownerImageURL}}
            alt="Home Image"
            className={"w-12 h-12 rounded-full"}
            resizeMode={"cover"}
          />
          <View className={"flex flex-col ml-3"}>
            <Text className={"text-base text-[#0A0A0A] text-left"}>
                {props.ownerName}
            </Text>
            <Text className={"text-sm text-gray-500 text-left"}>
                {props.petName}
            </Text>
          </View>
        </View>
          <Image
              source={serviceIcons[props.serviceType.toLowerCase()]}
              className="w-10 h-10 rounded-full"
              resizeMode="cover"
          />
      </View>
        <View
            className={"w-full flex-row h-20 p-4 bg-[#E8ECED] rounded-2xl justify-between"}
        >
        <View className={"flex justify-around"}>
          <Text className={"text-xs text-gray-500"}>Service type</Text>
          <Text className={"text-base"}>{props.serviceType}</Text>
        </View>
        <View className={"h-full w-[1px] bg-gray-300"} />

        <View className={"flex justify-around"}>
          <Text className={"text-xs text-gray-500"}>{props.location}</Text>
          <Text className={"text-base"}>{props.time}</Text>
        </View>
      </View>
    </View>
  );
};

export default TodaysBookingCard;
