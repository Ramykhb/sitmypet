import React from "react";
import { Image, Text, View } from "react-native";

const ClientHistoryCard = () => {
  return (
    <View className={"flex flex-col  w-20 items-center ml-3"}>
      <Image
        source={require("../assets/images/dog.jpg")}
        alt="Home Image"
        className={"w-16 h-16 rounded-full"}
        resizeMode={"cover"}
      />
      <Text className={"text-base text-[#0A0A0A] text-left mt-2"}>Falha</Text>
    </View>
  );
};

export default ClientHistoryCard;
