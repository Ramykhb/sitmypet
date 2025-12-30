import React, { useRef, useState } from "react";
import {View, TextInput, StyleSheet, Text, Image, TouchableOpacity} from "react-native";
import * as SecureStore from "expo-secure-store";
import {Link, router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

const OTP_LENGTH = 6;

export default function OtpInput({ onChange }: { onChange?: (otp: string) => void }) {
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const inputs = useRef<(TextInput | null)[]>([]);

    const handleChange = (text: string, index: number) => {
        if (!/^\d?$/.test(text)) return;

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        onChange?.(newOtp.join(""));

        if (text && index < OTP_LENGTH - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (key: string, index: number) => {
        if (key === "Backspace" && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <SafeAreaView className="home-auth flex-1">
            <View className="flex flex-col flex-1 w-full p-10 items-center">
                <Text className="text-[#0A0A0A] text-4xl self-start">Email Verification</Text>
                <Image
                    source={require("../../assets/images/verify-email.png")}
                    alt="logo"
                    className="w-full h-64 mt-12"
                    resizeMode="contain"
                />
                <Text className="text-[#0A0A0A] text-lg mt-5 font-bold">
                    OTP Verification
                </Text>
                <Text className="text-gray-500 text-base mt-5 font-bold text-center">
                    Enter the OTP we just sent to your email address
                </Text>
                <View style={styles.container}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => {
                                inputs.current[index] = ref;
                            }}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={({ nativeEvent }) =>
                                handleKeyPress(nativeEvent.key, index)
                            }
                            keyboardType="number-pad"
                            maxLength={1}
                            style={styles.input}
                            textAlign="center"
                            autoFocus={index === 0}
                        />
                    ))}
                </View>
                <TouchableOpacity
                    className="w-[75%] bg-[#3944D5] h-16 rounded-full flex flex-row items-center justify-center my-5"
                >
                    <Text className="text-white text-lg font-bold">Submit</Text>
                </TouchableOpacity>
                <Text className="text-gray-500 text-base mt-5 font-bold text-center">
                    {"Didn't receive OTP?"}<Link href={"/"}><Text className="text-[#3944D5] text-base mt-5 font-bold text-center">{" Resend OTP"}</Text></Link>
                </Text>
            </View>
        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        marginBottom: 20,
    },
    input: {
        width: 48,
        height: 56,
        marginHorizontal: 4,
        borderWidth: 1,
        borderRadius: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: "#3944D5",
        fontSize: 22,
        borderColor: "#ccc",
    },
});