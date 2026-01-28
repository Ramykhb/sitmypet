import {Link, router} from "expo-router";
import React, {useEffect, useState} from "react";
import {
    ActivityIndicator,
    Image,
    Keyboard,
    Text, TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {SafeAreaView} from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import api from "@/config/api";
import {backendPath} from "@/config/backConfig";
import CustomDropdownProfile from "@/components/CustomDropdownProfile";

export enum MediaTypeOptions {
    All = "All",
    Videos = "Videos",
    Images = "Images",
}

type User = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    profileImageUrl: string;
    roles: ("OWNER" | "SITTER")[];
};

type Location = {
    id: string;
    createdAt: string;
    name: string;
    updatedAt: string;
};

const EditProfile = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [docLoading, setDocLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [locations, setLocations] = useState<Location[]>([]);
    const [userLocation, setUserLocation] = useState<Location | null>(null);

    const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

    const pickImage = async () => {
        setDocLoading(true);

        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert("Permission required");
            setDocLoading(false);
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
        });

        if (result.canceled) {
            setDocLoading(false);
            return;
        }

        const pickedImage = result.assets[0];
        setImage(pickedImage);

        const formData = new FormData();
        formData.append("file", {
            uri: pickedImage.uri,
            name: "profile.jpg",
            type: "image/jpeg",
        } as any);

        try {
            const res = await api.post("/users/me/profile-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setUser(prevState => {
                if (!prevState) {
                    return null;
                }
                return {
                    ...prevState,
                    profileImageUrl: res.data.profileImageUrl,
                };
            });
        } catch (e: any) {
            if (e.status === 400) {
                setError("Invalid image format or size.");
            } else {
                setError("An error has occurred.");
            }
        } finally {
            setDocLoading(false);
        }
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await api.get("/locations");
                console.log(res.data);
                setLocations(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        const temp = async () => {
            try {
                const res = await api.get("/users/me");
                setUser(res.data);
            } catch (e) {
                console.error(e);
            }
        }
        temp();
        fetchLocations();

    }, []);

    const imageUri = user?.profileImageUrl || "https://pub-4f8704924751443bbd3260d113d11a8f.r2.dev/uploads/pfps/default_pfp.png";

    return (
        <SafeAreaView style={{flex: 1}} edges={["right", "left", "bottom"]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAwareScrollView
                    contentContainerStyle={{flexGrow: 1}}
                    enableOnAndroid={true}
                    extraScrollHeight={35}
                    keyboardOpeningTime={100}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex flex-col flex-1 w-full p-10 py-5 items-center">
                        <TouchableOpacity className={'relative'} onPress={pickImage}>
                            <Image
                                source={{ uri: imageUri }}
                                alt="logo"
                                className="w-48 h-48 rounded-full mt-10"
                                resizeMode="cover"
                            />
                            <View className={"absolute bottom-0 right-0 bg-[#3944D5] w-14 h-14 rounded-full flex items-center justify-center"}>
                                <Image source={require("../../../assets/icons/camera.png")} className={"w-6 h-6"} />
                            </View>
                        </TouchableOpacity>
                        <View className={"px-5 w-full mt-10 text-[#0A0A0A]"}>
                            <Text className={"text-xl"}>First Name</Text>
                            <TextInput
                                className={
                                    "w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"
                                }
                                value={user?.firstname}
                                autoCapitalize={"none"}
                                autoComplete="off"
                                textContentType="none"
                                importantForAutofill="no"
                                onChangeText={(text) => {
                                    setUser((prevState) => {
                                        if (!prevState) return prevState;

                                        return {
                                            ...prevState,
                                            firstname: text,
                                        };
                                    });
                                }}
                            />
                        </View>
                        <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
                            <Text className={"text-xl"}>Last Name</Text>
                            <TextInput
                                className={
                                    "w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"
                                }
                                value={user?.lastname}
                                autoCapitalize={"none"}
                                autoComplete="off"
                                textContentType="none"
                                importantForAutofill="no"
                                onChangeText={(text) => {
                                    setUser((prevState) => {
                                        if (!prevState) return prevState;

                                        return {
                                            ...prevState,
                                            lastname: text,
                                        };
                                    });
                                }}
                            />
                        </View>
                        <View className={"px-5 w-full mt-5 mb-5 text-[#0A0A0A]"}>
                            <Text className={"text-xl"}>Location</Text>
                            <CustomDropdownProfile
                                data={locations}
                                value={userLocation?.id ?? null}
                                onChange={(value: string) => {
                                    const selected = locations.find(l => l.id === value) || null;
                                    setUserLocation(selected);
                                }}
                                placeholder="Select location"
                            />
                        </View>
                        <TouchableOpacity
                            className="w-[85%] bg-[#3944D5] h-14 rounded-full flex flex-row items-center justify-center mt-5 mb-5"

                        >
                            {loading ? (
                                <ActivityIndicator color={"#FFFFFF"} size={"small"} />
                            ) : (
                                <Text className="text-white text-lg font-bold">Save Changes</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};
export default EditProfile;
