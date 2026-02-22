import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Linking,
    Alert,
    FlatList, TouchableWithoutFeedback
} from 'react-native'
import React, {useEffect, useState} from 'react'
import {router, useLocalSearchParams} from 'expo-router'
import api from "@/config/api";
import {SafeAreaView} from "react-native-safe-area-context";
import {backendPath} from "@/config/backConfig";
import * as SecureStore from "expo-secure-store";
import TodaysBookingCard from "@/components/TodaysBookingCard";

type Pet = {
    id: string;
    name: string;
    breed: string;
    imageUrl: string | null;
};

const pets: Pet[] = [
    {
        id: "1",
        name: "Max",
        breed: "Golden Retriever",
        imageUrl: null,
    },
    {
        id: "2",
        name: "Luna",
        breed: "Persian Cat",
        imageUrl: null,
    },
    {
        id: "3",
        name: "Rocky",
        breed: "German Shepherd",
        imageUrl: null,
    },
];

const starNums = ["one", "two", "three", "four", "five"];


const UserProfile = () => {
    const [loading, setLoading] = useState(false);
    const [isPetsOpen, setIsPetsOpen] = useState(true);
    const [filledStars, setFilledStars] = useState({one: false, two: false, three: false, four: false, five: false});

    const fillStars = (starNum: number) => {
        let tempStars: any = {};
        for (let i = 0; i < 5; i++) {
            if (i <= starNum) tempStars[starNums[i]] = true;
            else tempStars[starNums[i]] = false;
        }
        setFilledStars(tempStars);
    }

    return (
        <SafeAreaView edges={["bottom", "right", "left"]} className={"relative flex-1"}>
            {loading ? <View className={"flex flex-col flex-1 justify-center items-center h-full w-full"}>
                    <ActivityIndicator size="large"/>
                    <Text className={"text-2xl mt-6 text-[#0a0a0a] text-center"}>Fetching user...</Text>
                </View> :
                <ScrollView horizontal={false} className={"flex-1"}>
                    <View className={"flex p-10 py-7 flex-1"}>
                        <View className={"w-full flex flex-row h-20 items-center"}>
                            <Image source={require("../../assets/images/pfp.jpg")}
                                   className={"w-16 h-16 rounded-full"}/>
                            <View className={"flex-1 flex flex-col h-20 py-3 px-5 justify-between "}>
                                <View className={"flex flex-row items-center"}>
                                    <Text className={"text-xl text-[#0a0a0a] font-semibold"}>Ramy Khachab</Text>
                                    <Image source={require("../../assets/icons/verified-shield.png")}
                                           className={"w-4 h-4 ml-2"}/>
                                </View>
                                <Text className={"text-sm text-gray-500 font-semibold"}>Dahye, Beirut</Text>
                            </View>
                        </View>
                        <Text className={"text-2xl text-[#0a0a0a] mt-8"}>Pet Sitter Profile</Text>
                        <View className={"w-full flex flex-row items-center rounded-2xl bg-gray-200 h-20 mt-5"}>
                            <View className={"w-[33%] flex items-center justify-center border-r border-r-gray-400"}>
                                <Text
                                    className={"text-xl font-bold text-[#0a0a0a]"}>27</Text>
                                <Text className={" text-gray-500"}>Clients</Text>
                            </View>
                            <View className={"w-[33%] flex items-center justify-center border-r border-r-gray-400"}>
                                <Text
                                    className={"text-xl font-bold text-[#0a0a0a]"}>189</Text>
                                <Text className={" text-gray-500"}>Reviews</Text>
                            </View>
                            <View className={"w-[33%] flex items-center justify-center"}>
                                <View className={"w-full flex flex-row justify-center items-center"}>
                                    <Image source={require("../../assets/icons/star.png")} alt="Star"
                                           className={"w-6 h-6 mr-2"}/>
                                    <Text
                                        className={"text-xl font-bold text-[#0a0a0a]"}>4.8</Text>
                                </View>
                                <Text className={" text-gray-600"}>Rating</Text>
                            </View>
                        </View>
                        <Text className={"text-2xl text-[#0a0a0a] mt-8"}>Pet Owner Profile</Text>
                        <View className={"w-full flex flex-row items-center rounded-2xl bg-gray-200 h-20 mt-5"}>
                            <View className={"w-[50%] flex items-center justify-center border-r border-r-gray-400"}>
                                <Text
                                    className={"text-xl font-bold text-[#0a0a0a]"}>6</Text>
                                <Text className={" text-gray-500"}>Sitter Worked With</Text>
                            </View>
                            <View className={"w-[50%] flex items-center justify-center"}>
                                <Text
                                    className={"text-xl font-bold text-[#0a0a0a]"}>57</Text>
                                <Text className={" text-gray-500"}>Posts</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            className="w-[100%] mb-4 mt-8"
                            onPress={() => setIsPetsOpen(prev => !prev)}
                        >
                            <View className="w-full flex flex-row justify-between items-center">
                                <Text className={"text-2xl text-[#0a0a0a]"}>Pets</Text>
                                <Text>{isPetsOpen ? "▲" : "▼"}</Text>
                            </View>
                        </TouchableOpacity>
                        {isPetsOpen &&
                            pets.map((pet) => (
                                <View key={pet.id} className={"w-full"}>
                                    <View

                                        className={"w-full rounded-full h-20 py-4 flex flex-row items-center"}>
                                        <Image

                                            source={pet.imageUrl ? {uri: pet.imageUrl} : require("../../assets/images/dog-placeholder.png")}
                                            className={"w-16 h-16 mr-4 rounded-full"}/>
                                        <View className={"flex justify-around flex-1 h-20 py-3"}>
                                            <Text className={"font-bold text-lg text-[#0a0a0a]"}>{pet.name}</Text>
                                            <Text className={"font-semibold text-sm text-gray-500"}>{pet.breed}</Text>
                                        </View>
                                    </View>
                                    <View className={"w-[50%] ml-[25%] h-[2px] bg-gray-300 my-3"}/>
                                </View>
                            ))
                        }
                        <Text className={"text-2xl text-[#0a0a0a] mt-8"}>Contact Information</Text>
                        <Text className={"text-gray-500 text-lg mt-5"}>Email: ramykhb18@gmail.com</Text>

                    </View>
                </ScrollView>
            }
        </SafeAreaView>
    )
}
export default UserProfile;
