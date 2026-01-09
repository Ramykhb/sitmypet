import {router} from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, {useEffect, useState} from "react";
import {Image, Text, TextInput, TouchableOpacity, View, StyleSheet, FlatList} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import "../global.css";
import {BlurView} from "expo-blur";
import api from "@/config/api";
import SitterNearYouCardLoading from "@/components/SitterNearYouCardLoading";
import SitterNearYouCard from "@/components/SitterNearYouCard";

type NearbyRequest = {
    id: string;
    title: string;
    location: string;
    duration: string;
    imageUrl: string;
    isSaved: boolean;
    serviceType: string;
    rating: number;
    reviewCount: number;
};

export default function Index() {
    const [nearYouFound, setNearYouFound] = useState<NearbyRequest[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getNearYou = async () => {
            setLoading(true);
            try {
                const res = await api.get("/sitter/explore");
                setNearYouFound(res.data.requests);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getNearYou();
    }, []);

    return (
        <SafeAreaView className="flex-1">
            <View className="flex flex-col w-full p-10 items-center">
                <Text className="text-[#0A0A0A] text-4xl self-start">Explore</Text>
                <View className={"flex flex-row w-full items-center mt-6 justify-between"}>
                    <View
                        style={{
                            shadowColor: "#000",
                            shadowOffset: {width: 0, height: 8},
                            shadowOpacity: 0.18,
                            shadowRadius: 20,
                            elevation: 12,
                        }}
                    >
                        <View
                            style={{
                                borderRadius: 50,
                                overflow: "hidden",
                                width: 200,
                                height: 50,
                            }}
                        >
                            <BlurView
                                intensity={30}
                                tint="light"
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingHorizontal: 14,
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

                                <Image
                                    source={require("../../assets/icons/search.png")}
                                    tintColor="#666666"
                                    style={{width: 18, height: 18, marginRight: 8, zIndex: 2}}
                                />

                                <TextInput
                                    placeholder="Search"
                                    placeholderTextColor="#666666"
                                    style={{
                                        flex: 1,
                                        color: "#666666",
                                        fontSize: 14,
                                        zIndex: 2,
                                    }}
                                />
                            </BlurView>
                        </View>
                    </View>
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
                                width: 50,
                                height: 50,
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
                                <Image source={require("../../assets/icons/filter.png")} className={"w-8 h-8"}/>

                            </BlurView>
                        </View>
                    </View>
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
                                width: 50,
                                height: 50,
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
                                <Image source={require("../../assets/icons/sort.png")} className={"w-8 h-8"}/>
                            </BlurView>
                        </View>
                    </View>
                </View>
            </View>
            {loading ? (
                <View className="flex mt-5">
                    <View className={"w-full h-60 px-8 mb-6"}>
                        <SitterNearYouCardLoading/>
                    </View>
                    <View className={"w-full h-60 px-8 mb-6"}>
                        <SitterNearYouCardLoading/>
                    </View>
                    <View className={"w-full h-60 px-8 mb-6"}>
                        <SitterNearYouCardLoading/>
                    </View>
                </View>
            ) : (
                <FlatList
                    data={nearYouFound}
                    className={"w-full mb-16 mt-2"}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <View className={"w-full h-60 px-8 mb-6"}>
                            <SitterNearYouCard {...item} />
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
}
