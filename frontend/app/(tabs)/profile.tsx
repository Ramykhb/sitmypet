import React from "react";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import "../global.css";
import {Link, router} from "expo-router";

export default function Index() {
    return (
        <SafeAreaView className="home-auth flex-1 ">
            <ScrollView className={"w-full mb-20"}>
                <View className="flex flex-col flex-1 w-full p-10 items-center">
                    <Text className="text-[#0A0A0A] text-5xl self-start">Profile</Text>
                    <View className={"flex flex-col items-center justify-center w-full relative"}>
                        <Image source={require("../../assets/images/pfp.jpg")}
                               className={"w-44 h-44 my-5 mt-10 rounded-full"}/>
                        <Text className="text-[#0A0A0A] text-2xl font-bold">Ramy Khachab</Text>
                        <View
                            className={"flex justify-center items-center bg-green-500 rounded-full w-16 h-16 absolute right-24 bottom-14 border-4 border-white"}>
                            <Image source={require("../../assets/icons/pencil.png")} className={"w-8 h-8"}/>
                        </View>
                    </View>
                    <TouchableOpacity
                        className={"w-full h-[60px] bg-[#dfe4e8] mt-5 rounded-full flex flex-row justify-center items-center"}>
                        <Image source={require("../../assets/icons/edit-profile.png")} className={"w-8 h-8 mr-3"}
                               tintColor={"#555555"}/>
                        <Text className={"text-[#0A0A0A] font-bold text-xl"}>Edit Profile</Text>
                    </TouchableOpacity>
                    <Text className="text-[#0A0A0A] text-2xl font-bold self-start mt-10 mb-5">Help and Support</Text>
                    <View className={"w-full bg-[#dfe4e8] rounded-2xl"}>
                        <TouchableOpacity className={"w-full h-16 flex flex-row justify-between items-center pl-7 pr-2"}
                                          onPress={() => {
                                              router.push("/(auth)/contactPage");
                                          }}>
                            <View className={"flex flex-row justify-center items-center"}>
                                <Image source={require("../../assets/icons/contact.png")} className={"w-8 h-8 mr-4"}
                                       tintColor={"#555555"}/>
                                <Text className={"text-[#0A0A0A] font-bold text-xl"}>Contact Us</Text>
                            </View>
                            <Image source={require("../../assets/icons/right-arrow.png")} className={"w-4 h-4 mr-4 "}
                                   tintColor={"#555555"}/>
                        </TouchableOpacity>
                        <View className={"w-[75%] self-center h-[1px] bg-gray-300"}/><TouchableOpacity
                        className={"w-full h-16 flex flex-row justify-between items-center pl-7 pr-2"}>
                        <View className={"flex flex-row justify-center items-center"}>
                            <Image source={require("../../assets/icons/terms.png")} className={"w-8 h-8 mr-4"}
                                   tintColor={"#555555"}/>
                            <Text className={"text-[#0A0A0A] font-bold text-xl"}>Terms of Use</Text>
                        </View>
                        <Image source={require("../../assets/icons/right-arrow.png")} className={"w-4 h-4 mr-4 "}
                               tintColor={"#555555"}/>
                    </TouchableOpacity>
                        <View className={"w-[75%] self-center h-[1px] bg-gray-300"}/>
                        <TouchableOpacity
                            className={"w-full h-16 flex flex-row justify-between items-center pl-7 pr-2"}>
                            <View className={"flex flex-row justify-center items-center"}>
                                <Image source={require("../../assets/icons/privacy.png")} className={"w-8 h-8 mr-4"}
                                       tintColor={"#555555"}/>
                                <Text className={"text-[#0A0A0A] font-bold text-xl"}>Privacy Policy</Text>
                            </View>
                            <Image source={require("../../assets/icons/right-arrow.png")} className={"w-4 h-4 mr-4 "}
                                   tintColor={"#555555"}/>
                        </TouchableOpacity>
                    </View>

                    <Text className="text-[#0A0A0A] text-2xl font-bold self-start mt-10 mb-5">Account Settings</Text>
                    <View className={"w-full bg-[#dfe4e8] rounded-2xl"}>
                        <TouchableOpacity
                            className={"w-full h-16 flex flex-row justify-between items-center pl-7 pr-2"}>
                            <View className={"flex flex-row justify-center items-center"}>
                                <Image source={require("../../assets/icons/switch-accounts.png")}
                                       className={"w-8 h-8 mr-4"}
                                       tintColor={"#555555"}/>
                                <Text className={"text-[#0A0A0A] font-bold text-xl"}>Switch Role</Text>
                            </View>
                            <Image source={require("../../assets/icons/right-arrow.png")} className={"w-4 h-4 mr-4 "}
                                   tintColor={"#555555"}/>
                        </TouchableOpacity>
                        <View className={"w-[75%] self-center h-[1px] bg-gray-300"}/>
                        <TouchableOpacity
                            className={"w-full h-16 flex flex-row justify-between items-center pl-7 pr-2"}>
                            <View className={"flex flex-row justify-center items-center"}>
                                <Image source={require("../../assets/icons/lock.png")} className={"w-8 h-8 mr-4"}
                                       tintColor={"#555555"}/>
                                <Text className={"text-[#0A0A0A] font-bold text-xl"}>Change Password</Text>
                            </View>
                            <Image source={require("../../assets/icons/right-arrow.png")} className={"w-4 h-4 mr-4 "}
                                   tintColor={"#555555"}/>
                        </TouchableOpacity>
                        <View className={"w-[75%] self-center h-[1px] bg-gray-300"}/>
                        <TouchableOpacity
                            className={"w-full h-16 flex flex-row justify-between items-center pl-7 pr-2"}>
                            <View className={"flex flex-row justify-center items-center"}>
                                <Image source={require("../../assets/icons/logout.png")} className={"w-8 h-8 mr-4"}
                                       tintColor={"#555555"}/>
                                <Text className={"text-[#0A0A0A] font-bold text-xl"}>Logout</Text>
                            </View>
                            <Image source={require("../../assets/icons/right-arrow.png")} className={"w-4 h-4 mr-4 "}
                                   tintColor={"#555555"}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        className={"w-full h-[60px] bg-[#fcb3b3] mt-5 rounded-full flex flex-row justify-center items-center"}>
                        <Image source={require("../../assets/icons/trash.png")} className={"w-8 h-8 mr-3"}
                               tintColor={"#dc2626"}/>
                        <Text className={"text-red-600 font-bold text-xl"}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
