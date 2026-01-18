import {Stack, useRouter} from "expo-router";
import {Image, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";

export default function AuthLayout() {
    const router = useRouter();
    return (
        <Stack screenOptions={{
            headerStyle: {backgroundColor: "#F2F2F2",},
            headerTintColor: "#0A0A0A",
            headerShadowVisible: false,
        }}>
            <Stack.Screen
                name="signin"
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="signup"
                options={{
                    header: () => (
                        <View style={{height: 120, justifyContent: 'flex-end', paddingLeft: 15}}>
                            <TouchableOpacity onPress={() => {
                                router.back();
                            }}>
                                <View className="flex flex-row items-center">
                                    <Image
                                        source={require('../../assets/icons/back-arrow.png')}
                                        className="w-7 h-7 mr-3"
                                    />
                                    <Text className="text-[#0A0A0A] text-2xl font-bold">Create Account</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="homeAuth"
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="uploadDocument"
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="verifyEmail"
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="forgotPassword"
                options={{
                    header: () => (
                        <View style={{height: 120, justifyContent: 'flex-end', paddingLeft: 15}}>
                            <TouchableOpacity onPress={() => {
                                router.back();
                            }}>
                                <View className="flex flex-row items-center">
                                    <Image
                                        source={require('../../assets/icons/back-arrow.png')}
                                        className="w-7 h-7 mr-3"
                                    />
                                    <Text className="text-[#0A0A0A] text-2xl font-bold">Forgot Password</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="uploadPFP"
                options={{
                    header: () => (
                        <View style={{height: 120, justifyContent: 'flex-end', paddingLeft: 15}}>
                            <TouchableOpacity onPress={() => {
                                router.back();
                            }}>
                                <View className="flex flex-row items-center">
                                    <Image
                                        source={require('../../assets/icons/back-arrow.png')}
                                        className="w-7 h-7 mr-3"
                                    />
                                    <Text className="text-[#0A0A0A] text-2xl font-bold">Complete Profile</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="verifyPasswordReset"
                options={{
                    header: () => (
                        <View style={{height: 120, justifyContent: 'flex-end', paddingLeft: 15}}>
                            <TouchableOpacity onPress={() => {
                                router.back();
                            }}>
                                <View className="flex flex-row items-center">
                                    <Image
                                        source={require('../../assets/icons/back-arrow.png')}
                                        className="w-7 h-7 mr-3"
                                    />
                                    <Text className="text-[#0A0A0A] text-2xl font-bold">Reset Password</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="resetPassword"
                options={{
                    header: () => (
                        <View style={{height: 120, justifyContent: 'flex-end', paddingLeft: 15}}>
                            <TouchableOpacity onPress={() => {
                                router.back();
                            }}>
                                <View className="flex flex-row items-center">
                                    <Image
                                        source={require('../../assets/icons/back-arrow.png')}
                                        className="w-7 h-7 mr-3"
                                    />
                                    <Text className="text-[#0A0A0A] text-2xl font-bold">Forgot Password</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
        </Stack>
    );
}