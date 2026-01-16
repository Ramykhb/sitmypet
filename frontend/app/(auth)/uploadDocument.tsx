import api from "@/config/api";
import { Link, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import {
    ActivityIndicator,
    Image,
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const UploadDocument = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [docLoading, setDocLoading] = useState(false);

    const [document, setDocument] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

    const pickDocument = async () => {
        try {
            setDocLoading(true);
            const result = await DocumentPicker.getDocumentAsync({
                type: ["image/*", "application/pdf"],
                copyToCacheDirectory: true,
                multiple: false,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setDocument(result.assets[0]);
                setError("");
            }
        } catch (e) {
            setError("Failed to pick document");
        } finally {
            setDocLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    enableOnAndroid={true}
                    extraScrollHeight={35}
                    keyboardOpeningTime={100}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex flex-col flex-1 w-full p-10 items-center">
                        <Text className="text-[#0A0A0A] text-4xl self-start">Verify Profile</Text>
                        <Image
                            source={require("../../assets/images/idPic.png")}
                            alt="logo"
                            className="w-full h-64"
                            resizeMode="contain"/>
                        <View className={"px-5 w-full mt-10 text-[#0A0A0A]"}>
                            <Text className={"text-4xl text-center px-2"}>Please upload your ID Document</Text>
                            <Text className={"text-base text-center text-gray-400 mt-5"}>JPG, JPEG, PNG, PDF, up to 10MB</Text>
                        </View>
                        <TouchableOpacity
                            onPress={pickDocument}
                            className="w-[85%] bg-gray-300 h-16 rounded-full flex flex-row items-center justify-center mt-12 mb-3"
                        >
                            {docLoading ? (
                                <ActivityIndicator color={"#000000"} size={"small"} />
                            ) : (
                                <>
                                    <Image source={require("../../assets/icons/upload-cloud.png")} className={"w-6 h-6 mr-3"} />
                                    <Text className="text-[#0A0A0A] text-lg font-bold">{document ? `${document.name}` : "Upload Document"}</Text>

                                </>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => router.push("/(auth)/uploadPFP")}
                            disabled={document ? false : true}
                            className={`w-[85%] bg-[#3944D5] ${document ? "" : "opacity-30"} h-16 rounded-full flex flex-row items-center justify-center mt-3 mb-5`}
                        >
                            {loading ? (
                                <ActivityIndicator color={"#FFFFFF"} size={"small"} />
                            ) : (
                                <Text className={`text-white text-lg font-bold`}>Continue</Text>
                            )}
                        </TouchableOpacity>
                        <Text className={"text-base text-red-500 mt-5"}>{error}</Text>

                        <View className="flex-grow" />

                        <View className="flex flex-col items-center justify-center">
                            <Text className="text-text-gray-600 text-sm">Need help?</Text>
                            <Link href={"/(auth)/contactPage"}>
                                <Text className="text-[#0A0A0A] text-lg font-bold">
                                    Contact us
                                </Text>
                            </Link>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};
export default UploadDocument;
