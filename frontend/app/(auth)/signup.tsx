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

const Signin = () => {
    const [isAccepted, setIsAccepted] = useState(false);
    return (
        <SafeAreaView className="home-auth flex-1">
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="flex flex-col flex-1 w-full px-10 items-center">
                        <View className={"flex flex-row items-center justify-center w-full"}>
                            <View className={"px-5 w-[50%] text-[#0A0A0A]"}>
                                <Text className={"text-xl"}>First Name</Text>
                                <TextInput className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"}
                                           autoCapitalize={"none"}></TextInput>
                            </View>
                            <View className={"px-5 w-[50%] text-[#0A0A0A]"}>
                                <Text className={"text-xl"}>Last Name</Text>
                                <TextInput className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"}
                                           autoCapitalize={"none"}></TextInput>
                            </View>
                        </View>
                        <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
                            <Text className={"text-xl"}>Email</Text>
                            <TextInput className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"}
                                       autoCapitalize={"none"}></TextInput>
                        </View>
                        <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
                            <Text className={"text-xl"}>Password</Text>
                            <TextInput className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"}
                                       autoCapitalize={"none"}
                                       secureTextEntry={true}
                                       returnKeyType="done"></TextInput>
                        </View>
                        <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
                            <Text className={"text-xl"}>Confim Password</Text>
                            <TextInput className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"}
                                       autoCapitalize={"none"}
                                       secureTextEntry={true}
                                       returnKeyType="done"></TextInput>
                        </View>
                        <View className={"px-5 pr-10 w-full mt-7 flex flex-row items-center"}>
                            <Checkbox
                                value={isAccepted}
                                onValueChange={setIsAccepted}
                                color={isAccepted ? '#3944D5' : undefined}
                                className={"mr-3"}
                            />
                            <Text className={"text-sm text-gray-600"}>I agree to the <Link href={"/"}><Text
                                className={"font-bold underline"}>terms of use</Text></Link> and acknowledge the <Link
                                href={"/"}><Text className={"font-bold underline"}>privacy policy</Text></Link>.</Text>
                        </View>
                        <TouchableOpacity
                            className="w-[85%] bg-[#3944D5] h-14 rounded-full flex flex-row items-center justify-center my-10"
                            onPress={() => {
                            }}
                        >
                            <Text className="text-white text-lg font-bold">Create Account</Text>
                        </TouchableOpacity>

                        <View className="flex-grow"/>

                        <View className="flex flex-col items-center justify-center mb-5">
                            <Text className="text-text-gray-600 text-sm">Need help?</Text>
                            <Link href="/">
                                <Text className="text-[#0A0A0A] text-lg font-bold">Contact us</Text>
                            </Link>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
export default Signin
