import "./global.css"
import {Image, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Link, router} from "expo-router";
import React from "react";

export default function Index() {
    return (
        <SafeAreaView className="home-auth flex-1">
            <View className="flex flex-col flex-1 w-full p-10 items-center">
                <Text className="text-[#0A0A0A] text-5xl self-start">Welcome</Text>
                <Image
                    source={require('../assets/images/heroImage.png')}
                    alt="logo"
                    className="w-full h-60 mt-12"
                    resizeMode="contain"
                />
                <Text className="text-[#0A0A0A] text-lg mt-5 font-bold">Continue as</Text>
                <TouchableOpacity
                    className="w-[75%] bg-[#3944D5] h-16 rounded-full flex flex-row items-center justify-center my-5"
                    onPress={() => router.push("/(auth)/signin")}
                >
                    <Image source={require('../assets/icons/house.png')} alt="logo" className="w-6 h-6 mr-3" />
                    <Text className="text-white text-lg font-bold">Pet Owner</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="w-[75%] bg-[#0F1998] h-16 rounded-full flex flex-row items-center justify-center"
                    onPress={() => router.push("/(auth)/signin")}
                >
                    <Image source={require('../assets/icons/paw.png')} alt="logo" className="w-6 h-6 mr-3" />
                    <Text className="text-white text-lg font-bold">Pet Sitter</Text>
                </TouchableOpacity>

                <View className="flex-grow" />

                <View className="flex flex-col items-center justify-center">
                    <Text className="text-text-gray-600 text-sm">Need help?</Text>
                    <Link href="/">
                        <Text className="text-[#0A0A0A] text-lg font-bold">Contact us</Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
}