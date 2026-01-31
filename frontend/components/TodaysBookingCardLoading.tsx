import React, { useEffect, useRef } from "react";
import { View, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const TodaysBookingCardLoading = () => {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        duration: 1500,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [translateX]);

  return (
    <View
      className={
        "flex flex-col px-6 py-6 w-[310px] h-48 rounded-3xl bg-[#DDDDDD] ml-8 justify-between overflow-hidden relative opacity-40"
      }
    >
      <View className={"flex-row flex w-full justify-between items-center " }>
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

      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 320,
          width: "100%",
          transform: [{ translateX }, { rotate: "45deg" }],
        }}
      >
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.4)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, width: 100 }}
        />
      </Animated.View>
    </View>
  );
};

export default TodaysBookingCardLoading;
