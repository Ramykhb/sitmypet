import ClientHistoryCard from "@/components/ClientHistoryCard";
import ClientHistoryCardLoading from "@/components/ClientHistoryCardLoading";
import SitterNearYouCard from "@/components/SitterNearYouCard";
import SitterNearYouCardLoading from "@/components/SitterNearYouCardLoading";
import TodaysBookingCard from "@/components/TodaysBookingCard";
import TodaysBookingCardLoading from "@/components/TodaysBookingCardLoading";
import api from "@/config/api";
import {Link, router, useFocusEffect} from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, {useCallback, useEffect, useState} from "react";
import {
    FlatList,
    Image, RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import "../../global.css";

type Service = {
    id: string;
    createdAt: string;
    name: string;
    updatedAt: string;
}

type NearbyPost = {
    id: string;
    title: string;
    location: string;
    duration: string;
    imageUrl: string;
    isSaved: boolean;
    service: Service;
    rating: number;
    reviewCount: number;
};

type ClientHistory = {
    id: string;
    ownerName: string;
    ownerImageUrl: string;
};

type TodaysBooking = {
    id: string;
    location: string;
    ownerImageURL: string;
    ownerName: string;
    petName: string;
    service: Service;
    time: string;
};

type Location = {
    id: string;
    name: string;
}

type User = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    profileImageUrl: string;
    roles: ("OWNER" | "SITTER")[];
    location: Location;
};

export default function Sitter() {
    const [user, setUser] = useState<User | null>(null);
    const [bookingFound, setBookingFound] = useState<TodaysBooking[]>([]);
    const [clientFound, setClientFound] = useState<ClientHistory[]>([]);
    const [nearYouFound, setNearYouFound] = useState<NearbyPost[]>([]);
    const [loading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchHomeData = async () => {
        setIsLoading(true);
        try {
            const res = await api.get("/sitter/home");
            setNearYouFound(res.data.nearbyPosts ?? []);
            setClientFound(res.data.recentClients ?? []);
            setBookingFound(res.data.todaysBookings ?? []);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchHomeData();
        setRefreshing(false);
    }, []);

    useFocusEffect(useCallback(
        () => {
            setBookingFound([]);
            setClientFound([]);
            setNearYouFound([]);
            const getUser = async () => {
                try {
                    const res = await api.get("users/me")
                    setUser(res.data);
                } catch (e) {
                    console.log(e);
                }
            }
            getUser();
            fetchHomeData();

        }, []
    ));

    return (
        <SafeAreaView className="flex-1">
            <ScrollView horizontal={false} showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
                <View className="flex flex-col flex-1 w-full items-center ">
                    <View
                        className={
                            "flex-row flex w-full h-[75px] justify-around items-center "
                        }
                    >
                        <Image
                            source={{uri: user?.profileImageUrl}}
                            alt="Home Image"
                            className={"w-14 h-14 rounded-full"}
                            resizeMode={"cover"}
                        />
                        <View className={"flex flex-col mr-3"}>
                            <Text className={"text-base text-gray-500 text-center"}>
                                Hello, {user?.firstname ?? "Guest"}
                            </Text>
                            <Text className={"text-lg font-bold text-[#0A0A0A] text-center"}>
                                How do you feel today?
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => router.push("/notifications")}
                        >
                            <Image
                                source={require("../../../assets/icons/bell-red.png")}
                                alt="Home Image"
                                className={"w-8 h-8 rounded-full"}
                                resizeMode={"cover"}
                            />
                        </TouchableOpacity>
                    </View>
                    <View className={"w-full"}>
                        <View
                            className={
                                "flex w-full flex-row justify-between items-center my-5 mt-3"
                            }
                        >
                            <Text className={"text-2xl ml-8 text-[#0A0A0A]"}>
                                {"Today's Bookings"}
                            </Text>
                            <Link href={"/todaysBookings"} className={"mr-8"} disabled={bookingFound.length <= 0}>
                                <Text
                                    className={"text-lg font-bold  text-[#3944D5]"}
                                    style={bookingFound.length > 0 ? {} : {color: "#AAAAAA"}}
                                >
                                    See all
                                </Text>
                            </Link>
                        </View>

                        {loading ? (
                            <View className="flex flex-row">
                                <View className={"w-[310px] ml-8"}>
                                    <TodaysBookingCardLoading/>
                                </View>
                                <View className={"w-[310px] ml-8"}>
                                    <TodaysBookingCardLoading/>
                                </View>
                            </View>
                        ) : Object.keys(bookingFound).length > 0 ? (
                            <FlatList
                                horizontal={true}
                                data={bookingFound}
                                className={"mr-10"}
                                keyExtractor={(item) => item.id}
                                renderItem={({item}) => <TodaysBookingCard {...item} styling={"w-[310px] h-48"}/>}
                                showsHorizontalScrollIndicator={false}
                            />
                        ) : (
                            <View
                                className={
                                    "flex flex-col px-6 py-2 w-full h-42 justify-start items-center"
                                }
                            >
                                <Text className="text-xl text-[#0a0a0a] font-bold mb-1">
                                    No Bookings Found.
                                </Text>
                                <Text className="text-lg text-[#0a0a0a]">
                                    Apply to nearby requests to get started.
                                </Text>
                                <TouchableOpacity
                                    className="w-[60%] bg-[#3944D5] h-14 rounded-full flex flex-row items-center justify-center my-5">
                                    <Text className="text-white text-xl">Browse Requests</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <View className={"w-full"}>
                        <View
                            className={
                                "flex w-full flex-row justify-between items-center my-5"
                            }
                        >
                            <Text className={"text-2xl ml-8 text-[#0A0A0A]"}>
                                Client History
                            </Text>
                            <Link href={"/recentClients"} className={"mr-8"} disabled={clientFound.length <= 0}>
                                <Text
                                    className={"text-lg font-bold  text-[#3944D5]"}
                                    style={clientFound.length > 0 ? {} : {color: "#AAAAAA"}}
                                >
                                    See all
                                </Text>
                            </Link>
                        </View>
                        {loading ? (
                            <View className="flex flex-row pl-5">
                                <ClientHistoryCardLoading/>
                                <ClientHistoryCardLoading/>
                                <ClientHistoryCardLoading/>
                                <ClientHistoryCardLoading/>
                                <ClientHistoryCardLoading/>
                            </View>
                        ) : Object.keys(clientFound).length > 0 ? (
                            <FlatList
                                className={"pl-5"}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                data={clientFound}
                                renderItem={({item}) => <ClientHistoryCard {...item} />}
                            />
                        ) : (
                            <View
                                className={
                                    "flex flex-col px-6 py-2 w-full h-42 justify-start items-center"
                                }
                            >
                                <Text className="text-xl text-[#0a0a0a] font-bold mb-1">
                                    No Clients Found.
                                </Text>
                                <Text className="text-lg text-[#0a0a0a]">
                                    Apply to nearby requests to get started.
                                </Text>
                                <TouchableOpacity
                                    className="w-[60%] bg-[#3944D5] h-14 rounded-full flex flex-row items-center justify-center my-5">
                                    <Text className="text-white text-xl">Browse Requests</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <View className={"w-full"}>
                        <View
                            className={
                                "flex w-full flex-row justify-between items-center my-5"
                            }
                        >
                            <Text className={"text-2xl ml-8 text-[#0A0A0A]"}>Near You</Text>
                            <Link
                                href={"/sitterNearYou"}
                                className={"mr-8"}
                                disabled={nearYouFound.length <= 0}
                            >
                                <Text
                                    className={"text-lg font-bold  text-[#3944D5]"}
                                    style={nearYouFound.length > 0 ? {} : {color: "#AAAAAA"}}
                                >
                                    See all
                                </Text>
                            </Link>
                        </View>
                        {loading ? (
                            <View className="flex flex-row mb-28">
                                <View className="w-[300px] h-52 pl-8">
                                    <SitterNearYouCardLoading/>
                                </View>
                                <View className="w-[300px] h-52 pl-8">
                                    <SitterNearYouCardLoading/>
                                </View>
                            </View>
                        ) : nearYouFound.length > 0 ? (
                            <FlatList
                                data={nearYouFound}
                                horizontal={true}
                                className={"w-full mb-28"}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                renderItem={({item}) => (
                                    <View className="w-[300px] h-60 pl-8">
                                        <SitterNearYouCard {...item} />
                                    </View>
                                )}
                            />
                        ) : (
                            <View
                                className={
                                    "flex flex-col px-6 py-4 w-full h-42 justify-start items-center"
                                }
                            >
                                <Text className="text-xl text-[#0a0a0a] font-bold mb-1">
                                    {user?.location == null ? "Location not set."  : "No current jobs available. 🙁"}
                                </Text>
                                <Text className="text-lg px-8 text-center text-[#0a0a0a]">
                                    {user?.location == null ? "Set your location in Profile → Edit Profile to see nearby jobs."  : "We'll notify you when something opens up."}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
