import {BlurView} from "expo-blur";
import React, {useState} from "react";
import {Image, Pressable, Text, View} from "react-native";

const OwnerNearYouCard = (props: any) => {
    const [isSaved, setIsSaved] = useState(false);
    return (
        <View
            className={
                "flex flex-col px-4 py-4 w-full h-full rounded-3xl border-gray-300 border"
            }
        >
            <View className={"w-full h-[60%] rounded-2xl overflow-hidden relative"}>
                <View className={"rounded-full absolute top-1 right-3 z-10 overflow-hidden"}>
                    <BlurView
                        intensity={60}
                        tint="dark"
                        className="flex-row items-center px-2 py-1"
                    >
                        <Image
                            source={require("../assets/icons/star.png")}
                            className={"w-4 h-4 ml-1"}
                        />
                        <Text className={"text-[#FFCA00] text-sm ml-1"}>4.7</Text>
                        <Text className={"text-sm text-white ml-1"}>(320)</Text>
                    </BlurView>
                </View>
                <Image
                    source={require("../assets/images/pfp.jpg")}
                    className={"w-14 h-14 absolute rounded-full"}
                    resizeMode={"cover"}
                />
                <Text className={"text-[#0A0A0A] text-lg bottom-0 absolute left-0 font-bold"}>Yeat Da Goat</Text>
            </View>
            <View
                className={
                    "w-full overflow-hidden mt-2 flex-col justify-between flex-1"
                }
            >
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className="text-base text-gray-500 w-full"
                >
                    Services: Pet Sitting, Pet Walking, Grooming, Showering, Gooning.
                </Text>
                <View className={"w-full flex flex-row items-center h-8"}>
                    <Image
                        source={require("../assets/icons/pin.png")}
                        className={"w-4 h-4"}
                    />
                    <Text className={"text-gray-500 ml-2 font-semibold text-sm"}>
                        Beirut
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default OwnerNearYouCard;
