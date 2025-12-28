import {
    View, Text, Image, TouchableOpacity, TextInput, Platform, Keyboard, KeyboardAvoidingView,
    TouchableWithoutFeedback, Alert
} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import * as SecureStore from 'expo-secure-store';
import {Checkbox} from "expo-checkbox";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

const SignUp = () => {
    const [isAccepted, setIsAccepted] = useState(false);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = async () => {
        if (!isAccepted) {
            Alert.alert("You must agree to the Terms and Conditions before proceeding.");
            return;
        }
        if (!formData.email || !formData.password || !formData.firstname || !formData.confirmPassword || !formData.lastname) {
            Alert.alert("Please fill out all the required fields.");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }

        try {
            delete (formData as Record<string, any>)['confirmPassword'];
            const res = await axios.post("http://localhost:3000/auth/register", {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                password: formData.password
            });

            await SecureStore.setItemAsync('firstname', String(res.data.firstname));
            await SecureStore.setItemAsync('lastname', String(res.data.lastname));
            await SecureStore.setItemAsync('email', String(res.data.email));
            await SecureStore.setItemAsync('id', String(res.data.id));
            await SecureStore.setItemAsync('accessToken', String(res.data.accessToken));
            router.push("/(auth)/homeAuth");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView className="flex-1 py-12" edges={["left", "right", "bottom"]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} className={"bg-green-200 h-screen"}>
                <KeyboardAwareScrollView
                    contentContainerStyle={{flexGrow: 1}}
                    enableOnAndroid={true}
                    extraScrollHeight={35}
                    keyboardOpeningTime={100}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex flex-col flex-1 w-full px-10 items-center">
                        <View className={"flex flex-row items-center justify-center w-full"}>
                            <View className={"px-5 pr-2 w-[50%] text-[#0A0A0A] "}>
                                <Text className={"text-xl"}>First Name</Text>
                                <TextInput className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"}
                                           autoCapitalize={"none"} onChangeText={(text) => {
                                    setFormData((prevState) => ({
                                        ...prevState,
                                        firstname: text
                                    }));
                                }}></TextInput>
                            </View>
                            <View className={"px-5 pl-2 w-[50%] text-[#0A0A0A]"}>
                                <Text className={"text-xl"}>Last Name</Text>
                                <TextInput className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"}
                                           autoCapitalize={"none"} onChangeText={(text) => {
                                    setFormData((prevState) => ({
                                        ...prevState,
                                        lastname: text
                                    }));
                                }}></TextInput>
                            </View>
                        </View>
                        <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
                            <Text className={"text-xl"}>Email</Text>
                            <TextInput className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"}
                                       autoCapitalize={"none"} keyboardType="email-address" onChangeText={(text) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    email: text
                                }));
                            }}></TextInput>
                        </View>
                        <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
                            <Text className={"text-xl"}>Password</Text>
                            <TextInput className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"}
                                       autoCapitalize={"none"}
                                       secureTextEntry={true}
                                       returnKeyType="next"
                                       onChangeText={(text) => {
                                           setFormData((prevState) => ({
                                               ...prevState,
                                               password: text
                                           }));
                                       }}></TextInput>
                        </View>
                        <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
                            <Text className={"text-xl"}>Confim Password</Text>
                            <TextInput className={"w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"}
                                       autoCapitalize={"none"}
                                       secureTextEntry={true}
                                       returnKeyType="done" onChangeText={(text) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    confirmPassword: text
                                }));
                            }}></TextInput>
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
                            onPress={handleSubmit}
                        >
                            <Text className="text-white text-lg font-bold">Create Account</Text>
                        </TouchableOpacity>

                        <View className="flex-grow"/>

                        <View className="flex flex-col items-center justify-center mb-5">
                            <Text className="text-text-gray-600 text-sm">Need help?</Text>
                            <Link href={"/(auth)/contactPage"}>
                                <Text className="text-[#0A0A0A] text-lg font-bold">Contact us</Text>
                            </Link>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}
export default SignUp
