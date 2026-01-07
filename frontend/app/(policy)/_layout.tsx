import {Stack, useRouter} from "expo-router";
import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import * as SecureStore from "expo-secure-store";

export default function PolicyLayout() {
    const router = useRouter();
    return (
        <Stack
            screenOptions={{
                headerStyle: {backgroundColor: "#F2F2F2"},
                headerTintColor: "#0A0A0A",
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name="privacyPolicy"
                options={{
                    header: () => (
                        <View
                            style={{
                                height: 120,
                                justifyContent: "flex-end",
                                paddingLeft: 15,
                            }}
                        >
                            <TouchableOpacity
                                onPress={async () => {
                                    const role = await SecureStore.getItemAsync("role");
                                    if (role) {
                                        router.push("/(tabs)/(home)");
                                    } else {
                                        router.push("/(auth)/signin");
                                    }
                                }}
                            >
                                <View className="flex flex-row items-center">
                                    <Image
                                        source={require("../../assets/icons/back-arrow.png")}
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
                    header: () => (
                        <View
                            style={{
                                height: 120,
                                justifyContent: "flex-end",
                                paddingLeft: 15,
                            }}
                        >
                            <TouchableOpacity
                                onPress={async () => {
                                    const role = await SecureStore.getItemAsync("role");
                                    if (role) {
                                        router.push("/(tabs)/(home)");
                                    } else {
                                        router.push("/(auth)/signin");
                                    }
                                }}
                            >
                                <View className="flex flex-row items-center">
                                    <Image
                                        source={require("../../assets/icons/back-arrow.png")}
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
        </Stack>
    );
}
