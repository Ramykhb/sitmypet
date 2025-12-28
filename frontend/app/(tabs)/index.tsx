import "../global.css"
import {Image, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Link, router} from "expo-router";
import React from "react";
import * as SecureStore from 'expo-secure-store';


export default function Index() {

    async function clearAuthData() {
        try {
            await SecureStore.deleteItemAsync('accessToken');

            await SecureStore.deleteItemAsync('firstname');
            await SecureStore.deleteItemAsync('lastname');
            await SecureStore.deleteItemAsync('email');
            router.push('/(auth)/signin');
            console.log('Auth data cleared');
        } catch (error) {
            console.error('Failed to clear auth data:', error);
        }
    }

    return (
        <SafeAreaView className="home-auth flex-1 ">
            <View className="flex flex-col flex-1 w-full p-10 items-center">
                <Text className="text-[#0A0A0A] text-5xl self-start">Welcome</Text>
                <Image
                    source={require('../../assets/images/heroImage.png')}
                    alt="logo"
                    className="w-full h-64 mt-12"
                    resizeMode="contain"
                />
                <Text className="text-[#0A0A0A] text-lg mt-5 font-bold">Homepage 1</Text>
                <TouchableOpacity onPress={clearAuthData}>
                    <Text>Logout</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}