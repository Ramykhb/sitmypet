import React, { useEffect, useRef } from "react";
import { Text, View, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const SitterNearYouCardLoading = () => {
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
            style={{ flex: 1 }}
            className="flex flex-col px-4 py-4 w-full h-full rounded-3xl bg-gray-300 overflow-hidden relative opacity-30"
        >
            <View className="w-full h-[70%] rounded-2xl overflow-hidden relative bg-gray-400">
                <View className="rounded-3xl absolute top-3 left-3 z-10 overflow-hidden bg-gray-400 w-18"></View>
            </View>
            <View className="w-full overflow-hidden mt-2 flex-col justify-between flex-1">
                <Text numberOfLines={1} ellipsizeMode="tail" className="w-full font-bold"></Text>
                <View className="w-full flex flex-row items-center h-8">
                    <View className="ml-2 bg-gray-500 rounded-3xl w-16 h-4"></View>
                    <View className="ml-2 bg-gray-500 rounded-3xl w-16 h-4"></View>
                    <View className="ml-2 bg-gray-500 rounded-3xl w-16 h-4"></View>
                </View>
            </View>

            <Animated.View
                pointerEvents="none"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 350,
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

export default SitterNearYouCardLoading;