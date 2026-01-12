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

type postRequest = {
    id: string;
    title: string;
    location: string;
    duration: string;
    imageUrl: string;
    serviceType: string;
    rating: number;
    reviewCount: number;
    ownerName: string;
};

export default function Saved() {
    const [posts, setPosts] = useState<postRequest[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getNearYou = async () => {
            setLoading(true);
            try {
                const res = await api.get("/sitter/explore");
                setPosts(res.data.requests);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getNearYou();
    }, []);

    return (
        <SafeAreaView className="flex-1 ">
            <View className="flex flex-col w-full p-10 items-center pb-3">
                <Text className="text-[#0A0A0A] text-4xl self-start">Saved posts</Text>
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
                    data={posts}
                    className={"w-full mb-16 mt-5"}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <View className={"w-full h-60 px-8 mb-6"}>
                            {/*<SitterNearYouCard {...item} />*/}
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
}
