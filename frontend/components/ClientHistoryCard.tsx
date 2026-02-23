import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {router} from "expo-router";

type ClientHistory = {
    id: string;
    ownerName: string;
    ownerImageUrl: string;
}

const ClientHistoryCard = (props:ClientHistory) => {
    const fName = props.ownerName.split(" ")[0]
  return (
    <TouchableOpacity className={"flex flex-col w-20 items-center ml-3"} onPress={() => router.push(`/users/${props.id}`)}>
      <Image
        source={{ uri: props.ownerImageUrl }}
        alt="Home Image"
        className={"w-16 h-16 rounded-full"}
        resizeMode={"cover"}
      />
      <Text className={"text-base text-[#0A0A0A] text-center mt-2"}>{fName}</Text>
    </TouchableOpacity>
  );
};

export default ClientHistoryCard;
