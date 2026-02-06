import {View, Text, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import CustomDropdown from "@/components/CustomDropdown";

const pets = [
    { id: '1', createdAt: '', name: 'Dog', updatedAt: '' },
    { id: '2', createdAt: '', name: 'Cat', updatedAt: '' },
    { id: '3', createdAt: '', name: 'Bird', updatedAt: '' },
    { id: '4', createdAt: '', name: 'Rabbit', updatedAt: '' },
];

const CreatePost = () => {
    const [imageUri, setImageUri] = useState<string>("https://pub-4f8704924751443bbd3260d113d11a8f.r2.dev/uploads/pfps/default_pfp.png");
    const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
    const [selectedPet, setSelectedPet] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const pickImage = async () => {

        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert("Permission required");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
        });

        if (result.canceled) {
            return;
        }

        const pickedImage = result.assets[0];
        setImage(pickedImage);
        setImageUri(pickedImage.uri);
    };

    return (
        <SafeAreaView className="home-auth flex-1" edges={["right", "top", "left"]}>
            <ScrollView className={"w-full flex-1"}>
                <View className="flex flex-col flex-1 w-full p-10 items-center">
                    <Text className="text-[#0A0A0A] text-5xl self-start">Create Post</Text>
                </View>
                <View className={"w-full flex flex-row h-48"}>
                    <TouchableOpacity className={'relative w-[50%] px-8'} onPress={pickImage}>
                        <Image
                            source={{uri: "https://media-wallmantra.com/product/original/product_placeholder.webp"}}
                            alt="logo"
                            className="w-44 h-44 rounded-3xl border border-[#dddddd]"
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                    <View className={'w-[50%] pr-4 flex justify-around h-44'}>
                        <CustomDropdown
                            data={pets}
                            value={selectedPet}
                            onChange={setSelectedPet}
                            placeholder="Select a pet"
                            wrapperWidth={"100%"}
                        />
                        <CustomDropdown
                            data={pets}
                            value={selectedPet}
                            onChange={setSelectedPet}
                            placeholder="Select location"
                            wrapperWidth={"100%"}
                        />
                        <CustomDropdown
                            data={pets}
                            value={selectedPet}
                            onChange={setSelectedPet}
                            placeholder="Select service type"
                            wrapperWidth={"100%"}
                        />
                    </View>
                </View>
                <View className={"px-5 w-full text-[#0A0A0A]"}>
                    <Text className={"text-xl"}>Title</Text>
                    <TextInput
                        className={
                            "w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"
                        }
                        autoCapitalize={"none"}
                        autoComplete="off"
                        textContentType="none"
                        importantForAutofill="no"
                        returnKeyType="next"
                    />
                </View>
                <View className={"px-5 w-full mt-4 text-[#0A0A0A]"}>
                    <Text className={"text-xl"}>Description</Text>
                    <TextInput
                        className={
                            "w-full h-28 border border-gray-300 rounded-xl mt-3 px-5"
                        }
                        autoCapitalize={"none"}
                        autoComplete="off"
                        textContentType="none"
                        importantForAutofill="no"
                        returnKeyType="next"
                    />
                </View>
                <View className={"w-full flex-row flex mt-4"}>
                    <View className={"px-5 pr-2 w-[50%] text-[#0A0A0A] "}>
                        <Text className={"text-xl"}>Duration</Text>
                        <TextInput
                            className={
                                "w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"
                            }
                            autoCapitalize={"none"}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                        ></TextInput>
                    </View>
                    <View className={"px-5 pl-2 w-[50%] text-[#0A0A0A]"}>
                        <Text className={"text-xl"}>Price</Text>
                        <TextInput
                            className={
                                "w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"
                            }
                            autoCapitalize={"none"}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                        ></TextInput>
                    </View>
                </View>
                <TouchableOpacity
                    className="w-[85%] ml-[7.5%] bg-[#3944D5] h-14 rounded-full flex flex-row items-center justify-center mt-8 mb-5"
                >
                    {loading ? (
                        <ActivityIndicator color={"#FFFFFF"} size={"small"} />
                    ) : (
                        <Text className="text-white text-lg font-bold">Submit Post</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
export default CreatePost
