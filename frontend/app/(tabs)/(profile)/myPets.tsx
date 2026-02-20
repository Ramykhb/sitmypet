import {router, useFocusEffect} from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, {useCallback, useEffect, useState} from "react";
import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    FlatList,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import api from "@/config/api";
import {BlurView} from "expo-blur";

type Pet = {
    id: string;
    name: string;
    breed: string;
    imageUrl: string;
};

export default function MyPets() {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const fetchPets = async () => {
                setLoading(true);
                try {
                    const res = await api.get("/owner/pets");
                    console.log(res.data);
                    setPets(res.data);
                } catch (e) {
                    console.error(e);
                } finally {
                    setLoading(false);
                }
            };
            fetchPets();
        }, []),
    );

    return (
        <SafeAreaView className="flex-1 pt-10" edges={["right", "left"]}>
            {loading ? (
                [0, 1, 2, 3, 4, 5].map((value) => (
                    <View
                        className={"w-[90%] ml-[5%] rounded-3xl border border-gray-300 h-24 px-8 mb-6 flex flex-row items-center opacity-40"}
                        key={value}>
                        <View className={"w-20 h-20 mr-4 bg-gray-400 rounded-full"}/>
                        <View className={"flex justify-around flex-1 h-20"}>
                            <View className={"h-4 w-20 bg-gray-400 rounded-3xl"}/>
                            <View className={"h-4 w-14 text-base bg-gray-300 rounded-3xl"}/>
                        </View>
                        <View className={"w-12 h-12 bg-gray-400 rounded-full"}>
                        </View>
                    </View>
                ))
            ) : pets.length === 0 ? (
                <View className={"flex-1 flex items-center justify-center px-10 mb-24"}>
                    <Text className="text-xl font-semibold text-[#0A0A0A] mb-2">
                        No pets found
                    </Text>
                    <Text className="text-center text-base text-gray-500">
                        {"You haven't added any pets yet."}
                    </Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={pets}
                        className={"w-full mt-5"}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => (
                            <View
                                className={"w-[90%] ml-[5%] rounded-3xl border border-gray-300 h-24 px-8 mb-6 flex flex-row items-center "}>
                                <Image
                                    source={item.imageUrl ? {uri: item.imageUrl} : require("../../../assets/images/dog-placeholder.png")}
                                    className={"w-20 h-20 mr-4 rounded-full"}/>
                                <View className={"flex justify-around flex-1 h-20"}>
                                    <Text className={"font-bold text-xl text-[#0a0a0a]"}>{item.name}</Text>
                                    <Text className={"font-semibold text-base text-gray-500"}>{item.breed}</Text>
                                </View>
                                <View
                                    className={"flex justify-center items-center w-12 h-12 bg-[#fcb3b3] rounded-full"}>
                                    <Image source={require("../../../assets/icons/trash.png")} tintColor={"#dc2626"}
                                           className={"w-8 h-8"}/>
                                </View>
                            </View>
                        )}
                        contentContainerStyle={{paddingBottom: 75}}
                    />
                </>
            )}
            {loading ? <></> : <TouchableOpacity className={"absolute bottom-28 right-10"}>
                <View
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {width: 0, height: 6},
                        shadowOpacity: 0.2,
                        shadowRadius: 14,
                        elevation: 10,
                    }}
                >
                    <View
                        style={{
                            borderRadius: 50,
                            overflow: "hidden",
                            width: 60,
                            height: 60,
                        }}
                    >
                        <BlurView
                            intensity={30}
                            tint="light"
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                borderWidth: 1,
                                borderColor: "rgba(255,255,255,0.25)",
                            }}
                        >
                            <View
                                style={{
                                    ...StyleSheet.absoluteFillObject,
                                    backgroundColor: "rgba(210,210,210,0.15)",
                                }}
                            />
                            <Image source={require("../../../assets/icons/post.png")} className={"w-10 h-10"}/>
                        </BlurView>
                    </View>
                </View>
            </TouchableOpacity>}
        </SafeAreaView>
    );
}
