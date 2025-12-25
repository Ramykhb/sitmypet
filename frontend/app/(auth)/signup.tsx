import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native'
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
            <View className="flex flex-col flex-1 w-full p-10 items-center">
                <Link href={"/(auth)/signin"} className={"self-start"}>
                    <View className={"flex flex-row items-center justify-center"}>
                        <Image source={require('../../assets/icons/back-arrow.png')} alt="arrow" className={"w-7 h-7 mr-3"} />
                        <Text className="text-[#0A0A0A] text-2xl font-bold">Create Account</Text>
                    </View>
                </Link>
                <View className={"flex flex-row items-center justify-center w-full mt-10"}>
                    <View className={"px-5 w-[50%] text-[#0A0A0A]"}>
                        <Text className={"text-xl"}>First Name</Text>
                        <TextInput className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"} autoCapitalize={"none"}></TextInput>
                    </View>
                    <View className={"px-5 w-[50%] text-[#0A0A0A]"}>
                        <Text className={"text-xl"}>Last Name</Text>
                        <TextInput className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"} autoCapitalize={"none"}></TextInput>
                    </View>
                </View>
                <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
                    <Text className={"text-xl"}>Email</Text>
                    <TextInput className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"} autoCapitalize={"none"}></TextInput>
                </View>
                <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
                    <Text className={"text-xl"}>Password</Text>
                    <TextInput className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"} autoCapitalize={"none"} ></TextInput>
                </View>
                <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
                    <Text className={"text-xl"}>Confim Password</Text>
                    <TextInput className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"} autoCapitalize={"none"} ></TextInput>
                </View>
                <View className={"px-5 pr-10 w-full mt-7 flex flex-row items-center"}>
                    <Checkbox
                        value={isAccepted}
                        onValueChange={setIsAccepted}
                        color={isAccepted ? '#3944D5' : undefined}
                        className={"mr-3"}
                    />
                    <Text className={"text-sm text-gray-600"}>I agree to the <Link href={"/"}><Text className={"font-bold underline"}>terms of use</Text></Link> and acknowledge the <Link href={"/"}><Text className={"font-bold underline"}>privacy policy</Text></Link>.</Text>
                </View>
                <TouchableOpacity
                    className="w-[85%] bg-[#3944D5] h-14 rounded-full flex flex-row items-center justify-center my-10"
                    onPress={() => {}}
                >
                    <Text className="text-white text-lg font-bold">Create Account</Text>
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
    )
}
export default Signin
