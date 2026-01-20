import {router, Stack} from "expo-router";
import {Image, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";

export default function RootLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="(tabs)"
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="privacyPolicy"
                options={{
                    headerShown: true,

                    header: () => (
                        <View
                            style={{
                                height: 120,
                                justifyContent: "flex-end",
                                paddingLeft: 15,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    router.back();
                                }}
                            >
                                <View className="flex flex-row items-center">
                                    <Image
                                        source={require("../assets/icons/back-arrow.png")}
                                        className="w-7 h-7 mr-3"
                                    />
                                    <Text className="text-[#0A0A0A] text-2xl font-bold">
                                        Privacy Policy
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="termsAndConditions"
                options={{
                    headerShown: true,
                    header: () => (
                        <View
                            style={{
                                height: 120,
                                justifyContent: "flex-end",
                                paddingLeft: 15,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    router.back();
                                }}
                            >
                                <View className="flex flex-row items-center">
                                    <Image
                                        source={require("../assets/icons/back-arrow.png")}
                                        className="w-7 h-7 mr-3"
                                    />
                                    <Text className="text-[#0A0A0A] text-2xl font-bold">
                                        Terms and Conditions
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="notifications"
                options={{
                    headerShown: true,
                    header: () => (
                        <View
                            style={{
                                height: 120,
                                justifyContent: "flex-end",
                                paddingLeft: 15,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    router.back();
                                }}
                            >
                                <View className="flex flex-row items-center">
                                    <Image
                                        source={require("../assets/icons/back-arrow.png")}
                                        className="w-7 h-7 mr-3"
                                    />
                                    <Text className="text-[#0A0A0A] text-2xl font-bold">
                                        Notifications
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="[postId]"
                options={{
                    headerShown: true,
                    header: () => (
                        <View
                            style={{
                                height: 120,
                                justifyContent: "flex-end",
                                paddingLeft: 15,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    router.back();
                                }}
                            >
                                <View className="flex flex-row items-center">
                                    <Image
                                        source={require("../assets/icons/back-arrow.png")}
                                        className="w-7 h-7 mr-3"
                                    />
                                    <Text className="text-[#0A0A0A] text-2xl font-bold">
                                        Job Details
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="contactPage"
                options={{
                    headerShown: true,
                    header: () => (
                        <View style={{height: 120, justifyContent: 'flex-end', paddingLeft: 15}}>
                            <TouchableOpacity onPress={() => {
                                router.back();
                            }}>
                                <View className="flex flex-row items-center">
                                    <Image
                                        source={require('../assets/icons/back-arrow.png')}
                                        className="w-7 h-7 mr-3"
                                    />
                                    <Text className="text-[#0A0A0A] text-2xl font-bold">Contact Us</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
        </Stack>
    );
}