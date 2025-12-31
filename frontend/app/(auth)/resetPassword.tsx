import React, {useEffect, useRef, useState} from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import * as SecureStore from "expo-secure-store";
import {Link, router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import axios from "axios";
import {backendPath} from "@/config/backConfig";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default function OtpInput({onChange}: { onChange?: (otp: string) => void }) {
    const [email, setEmail] = useState("");
    const [otp, setOTP] = useState("");
    const [error, setError] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const getEmail = async () => {
            const em:string | null = await SecureStore.getItemAsync("passResetEmail");
            const tok:string | null = await SecureStore.getItemAsync("passResetToken");
            setEmail(em as string);
            setOTP(tok as string);
            await SecureStore.deleteItemAsync("passResetEmail");
            await SecureStore.deleteItemAsync("passResetToken");
        }
        getEmail();
    }, []);

    const handleSubmit = async () => {
        setError("");
        try {
            await axios.post(`${backendPath}/auth/reset-password`, {
                email: email,
                otp: otp,
                newPassword: newPassword,
            });
            router.push("/(auth)/signin")

        } catch (error: any) {
            console.log(error);
            setError("An error has occured.");
        }
    };

    return (
        <SafeAreaView className="home-auth flex-1" edges={["right", "left", "bottom"]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAwareScrollView
                    contentContainerStyle={{flexGrow: 1}}
                    enableOnAndroid={true}
                    extraScrollHeight={35}
                    keyboardOpeningTime={100}
                    keyboardShouldPersistTaps="handled"
                >
            <View className="flex flex-col flex-1 w-full p-10 items-center">
                <Image
                    source={require("../../assets/images/forgot-password.png")}
                    alt="logo"
                    className="w-full h-64"
                    resizeMode="contain"
                />
                <Text className="text-[#0A0A0A] text-lg mt-5 font-bold">
                    Reset Password
                </Text>

                <View className={"px-5 w-full mt-10 text-[#0A0A0A]"}>
                    <Text className={"text-xl"}>New Password</Text>
                    <TextInput
                        className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"}
                        autoCapitalize={"none"}
                        secureTextEntry={true}
                        autoComplete="off"
                        textContentType="none"
                        importantForAutofill="no"
                        returnKeyType="next"
                        onChangeText={(text) => {
                            setNewPassword(text);
                        }}
                    />
                </View>
                <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
                    <Text className={"text-xl"}>Confirm New Password</Text>
                    <TextInput
                        className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"}
                        autoCapitalize={"none"}
                        secureTextEntry={true}
                        autoComplete="off"
                        textContentType="none"
                        importantForAutofill="no"
                        returnKeyType="done"
                        onChangeText={(text) => {
                            setConfirmPassword(text);
                        }}
                    />
                </View>


                <Text className={"text-base text-red-600 my-2"}>{error}</Text>


                <TouchableOpacity
                    className="w-[75%] bg-[#3944D5] h-16 rounded-full flex flex-row items-center justify-center my-8"
                    onPress={handleSubmit}

                >

                    <Text className="text-white text-lg font-bold">Reset Password</Text>
                </TouchableOpacity>
            </View>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>


    );
}