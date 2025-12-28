import {
    View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard,
    ScrollView, Alert
} from 'react-native'
import React, {useRef, useState} from 'react'
import {Link, router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const Signin = () => {
    const [formData, setFormData] = useState({email: "", password: ""});

    const handleSubmit = async () => {
        if (!formData.email || !formData.password) {
            Alert.alert("Please fill out all the required fields.");
            return;
        }
        try {
            const res = await axios.post("http://localhost:3000/auth/login", formData);
            await SecureStore.setItemAsync('lastname', String(res.data.user.lastname));
            await SecureStore.setItemAsync('firstname', String(res.data.user.firstname));
            await SecureStore.setItemAsync('email', String(res.data.user.email));
            await SecureStore.setItemAsync('id', String(res.data.user.id));
            await SecureStore.setItemAsync('accessToken', String(res.data.accessToken));
            router.push("/(tabs)");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAwareScrollView
                    contentContainerStyle={{flexGrow: 1}}
                    enableOnAndroid={true}
                    extraScrollHeight={35}
                    keyboardOpeningTime={100}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex flex-col flex-1 w-full px-10 items-center">
                        <Image
                            source={require('../../assets/images/loginIcon.png')}
                            alt="logo"
                            className="w-full h-60"
                            resizeMode="contain"
                        />
                        <View className={"px-5 w-full mt-10 text-[#0A0A0A]"}>
                            <Text className={"text-xl"}>Email</Text>
                            <TextInput
                                className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"}
                                autoCapitalize={"none"}
                                keyboardType="email-address"
                                returnKeyType="next"
                                onChangeText={(text) => {
                                    setFormData((prevState) => ({
                                        ...prevState,
                                        email: text
                                    }));
                                }}
                            />
                        </View>
                        <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
                            <Text className={"text-xl"}>Password</Text>
                            <TextInput
                                className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"}
                                autoCapitalize={"none"}
                                secureTextEntry={true}
                                returnKeyType="done"
                                onChangeText={(text) => {
                                    setFormData((prevState) => ({
                                        ...prevState,
                                        password: text
                                    }));
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            className="w-[85%] bg-[#3944D5] h-14 rounded-full flex flex-row items-center justify-center mt-10 mb-5"
                            onPress={handleSubmit}
                        >
                            <Text className="text-white text-lg font-bold">Login</Text>
                        </TouchableOpacity>

                        <Link href={"/"}>
                            <Text className={"text-gray-600 underline"}>Forgot password?</Text>
                        </Link>

                        <View className="flex-grow"/>

                        <View className={"flex flex-row justify-around w-full mb-5"}>
                            <View className="flex flex-col items-center justify-center">
                                <Text className="text-text-gray-600 text-sm">Need help?</Text>
                                <Link href={"/(auth)/contactPage"}>
                                    <Text className="text-[#0A0A0A] text-lg font-bold">Contact us</Text>
                                </Link>
                            </View>
                            <View className="flex flex-col items-center justify-center">
                                <Text className="text-gray-600 text-sm">{"No account?"}</Text>
                                <Link href={"/(auth)/signup"}>
                                    <Text className="text-[#0A0A0A] text-lg font-bold">Register now</Text>
                                </Link>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}
export default Signin