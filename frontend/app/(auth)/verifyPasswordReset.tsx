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
import api from "@/config/api";

const OTP_LENGTH = 6;

export default function OtpInput({onChange}: { onChange?: (otp: string) => void }) {
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const inputs = useRef<(TextInput | null)[]>([]);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [canResend, setCanResend] = useState(false);
    const resendTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const startResendCooldown = () => {
        setCanResend(false);

        if (resendTimerRef.current) {
            clearTimeout(resendTimerRef.current);
        }

        resendTimerRef.current = setTimeout(() => {
            setCanResend(true);
        }, 60_000);
    };

    useEffect(() => {
        const getEmail = async () => {
            const em:string | null = await SecureStore.getItemAsync("passResetEmail");
            setEmail(em as string);
        }
        getEmail();

        return () => {
            if (resendTimerRef.current) {
                clearTimeout(resendTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const sendOTP = async () =>{
            if (email.length > 0) {
                handleResend();
                startResendCooldown();
            }
        }
        sendOTP();
    }, [email]);

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

    const handleSubmit = async () => {
        let newOtp = '';
        setError("");
        otp.forEach((otp, i) => {
            newOtp += String(otp);
        })
        try {
            const res = await api.post(`/auth/verify-otp`, {
                email: email,
                otp: newOtp,
            })
            await SecureStore.setItemAsync("passResetToken", String(newOtp));
            router.push("/(auth)/resetPassword");
        } catch (error: any) {
            setError("Invalid OTP, please try again.");
        }
    }

    const handleResend = async () => {
        if (!canResend) return;

        setError("");
        try {
            await api.post(`/auth/request-password-reset`, {
                email: email,
            });
            startResendCooldown();
        } catch (error: any) {
            setError("Please wait before resending another OTP.");
        }
    };

    return (
        <SafeAreaView className="home-auth flex-1" edges={["left", "right", "bottom"]}>
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
                            onKeyPress={({nativeEvent}) =>
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
                    className="w-[75%] bg-[#3944D5] h-16 rounded-full flex flex-row items-center justify-center my-8"
                    onPress={handleSubmit}
                >

                    <Text className="text-white text-lg font-bold">Submit</Text>
                </TouchableOpacity>
                <Text className={"text-base text-red-600 my-4"}>{error}</Text>
                <Text className="text-gray-500 text-base font-bold text-center">
                    {"Didn't receive OTP?"}
                    <TouchableWithoutFeedback onPress={handleResend} disabled={!canResend} className={"ml-2"}>
                        <Text
                            className={`text-base mt-5 font-bold text-center ${
                                canResend ? "text-[#3944D5]" : "text-gray-300"
                            }`}
                        >
                            {" Resend OTP"}
                        </Text>
                    </TouchableWithoutFeedback>
                </Text>
            </View>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
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