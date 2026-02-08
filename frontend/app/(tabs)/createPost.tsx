import {View, Text, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import CustomDropdown from "@/components/CustomDropdown";
import DatePicker from "react-native-date-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const pets = [
    {id: '1', createdAt: '', name: 'Dog', updatedAt: ''},
    {id: '2', createdAt: '', name: 'Cat', updatedAt: ''},
    {id: '3', createdAt: '', name: 'Bird', updatedAt: ''},
    {id: '4', createdAt: '', name: 'Rabbit', updatedAt: ''},
];

const CreatePost = () => {
    const [imageUri, setImageUri] = useState<string>("https://pub-4f8704924751443bbd3260d113d11a8f.r2.dev/uploads/pfps/default_pfp.png");
    const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
    const [selectedPet, setSelectedPet] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [date, setDate] = useState<Date | null>(null);
    const [isPickerVisible, setPickerVisible] = useState(false);

    const showDatePicker = () => setPickerVisible(true);
    const hideDatePicker = () => setPickerVisible(false);

    const handleConfirm = (selectedDate: Date) => {
        setDate(selectedDate);
        hideDatePicker();
    };

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
                <TouchableOpacity className={'relative w-full px-10 mb-4'} onPress={pickImage}>
                    <Image
                        source={require("../../assets/images/placeholder.png")}
                        alt="logo"
                        className="w-full h-52 rounded-3xl border border-[#dddddd]"
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <View className={'w-full flex-row flex justify-between px-10 my-4'}>
                    <CustomDropdown
                        data={pets}
                        value={selectedPet}
                        onChange={setSelectedPet}
                        placeholder="Select Pet"
                        wrapperWidth={"w-[45%]"}
                        buttonColor={"#f1f1f1"}
                    />
                    <CustomDropdown
                        data={pets}
                        value={selectedPet}
                        onChange={setSelectedPet}
                        placeholder="Select Service"
                        wrapperWidth={"w-[45%]"}
                        buttonColor={"#f1f1f1"}
                    />
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
                            "w-full h-28 border border-gray-300 rounded-xl mt-3 px-5 py-3"
                        }
                        multiline={true}

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
                                "w-full h-14 border border-gray-300 rounded-xl mt-3 px-5 placeholder:text-xl pb-2"
                            }
                            autoCapitalize={"none"}
                            style={{textAlignVertical: 'center'}}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                            placeholder={"5 Days"}
                        />
                    </View>
                    <View className={"px-5 pl-2 w-[50%] text-[#0A0A0A]"}>
                        <Text className={"text-xl"}>Price</Text>
                        <View
                            className={
                                "w-full h-14 border border-gray-300 rounded-xl mt-3 px-3 flex-row items-center"
                            }
                        >
                            <Text className={"text-2xl text-[#0a0a0a]"}>$</Text>
                            <TextInput
                                className={
                                    "w-full h-14 px-2 flex flex-row items-center justify-center placeholder:text-xl pb-2"
                                }
                                style={{textAlignVertical: 'center'}}
                                autoCapitalize={"none"}
                                autoComplete="off"
                                placeholder={"0.00"}
                                textContentType="none"
                                importantForAutofill="no"
                            />
                        </View>
                    </View>
                </View>
                <View className={"px-5 w-full mt-4 text-[#0A0A0A]"}>
                    <Text className={"text-xl"}>Job Date</Text>
                    <TouchableOpacity onPress={showDatePicker} className={
                        "w-full h-14 border border-gray-300 rounded-xl mt-3 px-5 flex-row items-center justify-between"
                    }>
                        <Text>
                            {date
                                ? date.toLocaleDateString() + " " + date.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })
                                : "Choose date & time"}
                        </Text>
                        <Image source={require("../../assets/icons/arrow-down.png")} className={"w-4 h-4"}/>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isPickerVisible}
                        mode="datetime"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        date={date || new Date()}
                    />
                </View>
                <TouchableOpacity
                    className="w-[85%] ml-[7.5%] bg-[#3944D5] h-14 rounded-full flex flex-row items-center justify-center mt-8 mb-5"
                >
                    {loading ? (
                        <ActivityIndicator color={"#FFFFFF"} size={"small"}/>
                    ) : (
                        <Text className="text-white text-lg font-bold">Submit Post</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
export default CreatePost
