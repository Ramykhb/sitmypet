import {
    View, Text, Image, TouchableOpacity, TextInput, Platform, Keyboard, KeyboardAvoidingView,
    TouchableWithoutFeedback
} from 'react-native'
import React, {useState} from 'react'
import {Link} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {Label} from "@react-navigation/elements";
import CheckBox from "@react-native-community/checkbox";
import {Checkbox} from "expo-checkbox";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const ContactPage = () => {
    return (
        <SafeAreaView className="home-auth flex-1">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAwareScrollView
                    contentContainerStyle={{flexGrow: 1}}
                    enableOnAndroid={true}
                    extraScrollHeight={35}
                    keyboardOpeningTime={100}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex flex-col flex-1 w-full px-10 items-center">
                        <View className={"px-5 w-full text-[#0A0A0A] "}>
                            <Text className={"text-xl"}>Full Name</Text>
                            <TextInput className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"}
                                       autoCapitalize={"none"}></TextInput>
                        </View>
                        <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
                            <Text className={"text-xl"}>Email</Text>
                            <TextInput className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"}
                                       autoCapitalize={"none"}></TextInput>
                        </View>
                        <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
                            <Text className={"text-xl"}>Subject</Text>
                            <TextInput className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"}
                                       autoCapitalize={"none"}></TextInput>
                        </View>
                        <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
                            <Text className={"text-xl"}>Message</Text>
                            <TextInput className={"w-full h-40 border border-gray-300 rounded-xl mt-3 px-5 py-3"}
                                       multiline={true}
                                       textAlignVertical={"top"}
                            >

                            </TextInput>
                        </View>
                        <TouchableOpacity
                            className="w-[85%] bg-[#3944D5] h-14 rounded-full flex flex-row items-center justify-center my-10"
                            onPress={() => {
                            }}
                        >
                            <Text className="text-white text-lg font-bold">Send Message</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}
export default ContactPage;
