import {router} from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, {useEffect, useState, useRef} from "react";
import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import "../global.css";
import {BlurView} from "expo-blur";
import api from "@/config/api";
import SitterNearYouCardLoading from "@/components/SitterNearYouCardLoading";
import SitterNearYouCard from "@/components/SitterNearYouCard";
import {Animated} from "react-native";

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
    const [filter_toggled, setFilterToggled] = useState(false);
    const [sort_toggled, setSortToggled] = useState(false);
    const [sortOption, setSortOption] = useState("");
    const [sortTempOption, setSortTempOption] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const filterHeight = useRef(new Animated.Value(0)).current;
    const sortHeight = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        const getNearYou = async () => {
            setLoading(true);
            try {
                const res = await api.get("/sitter/explore", {
                    params: {
                        sortBy: sortOption,
                    },
                });
                setNearYouFound(res.data.requests);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getNearYou();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const getNearYou = async () => {
                setLoading(true);
                try {
                    const res = await api.get("/sitter/explore", {
                        params: {
                            sortBy: sortOption,
                        },
                    });
                    setNearYouFound(res.data.requests);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            getNearYou();
        }, 300);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchTerm, sortOption]);

    useEffect(() => {
        Animated.timing(filterHeight, {
            toValue: filter_toggled ? 300 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [filter_toggled]);

    useEffect(() => {
        Animated.timing(sortHeight, {
            toValue: sort_toggled ? 330 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [sort_toggled]);

    return (
        <SafeAreaView className="flex-1">
            <View className="flex flex-col w-full p-10 items-center pb-5">
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
                                    value={searchTerm}
                                    onChangeText={(text) => setSearchTerm(text)}
                                />
                            </BlurView>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {
                        setFilterToggled(!filter_toggled)
                        setSortToggled(false);
                    }}>
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
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setSortToggled(!sort_toggled);
                        setFilterToggled(false)
                    }}>
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
                    </TouchableOpacity>
                </View>
            </View>

            <Animated.View
                style={{
                    height: filterHeight,
                    shadowOpacity: 0.25,
                    shadowRadius: 20,
                    elevation: 20,
                }}
                className="w-full overflow-hidden px-5"
            >
                <View
                    style={{
                        flex: 1,
                        paddingTop: 0,
                        padding: 20,
                    }}
                >
                    <Text className="text-xl font-semibold mb-4">Filters</Text>

                    <Text className="text-sm text-gray-500 mb-2">Service Type</Text>
                    <View className="flex-row mb-4">
                        <View className="px-4 py-2 mr-2 rounded-full bg-gray-200">
                            <Text>Walking</Text>
                        </View>
                        <View className="px-4 py-2 mr-2 rounded-full bg-gray-200">
                            <Text>Sitting</Text>
                        </View>
                        <View className="px-4 py-2 rounded-full bg-gray-200">
                            <Text>Boarding</Text>
                        </View>
                    </View>

                    <Text className="text-sm text-gray-500 mb-2">Minimum Rating</Text>
                    <View className="flex-row mb-6">
                        <View className="px-4 py-2 mr-2 rounded-full bg-gray-200">
                            <Text>★ 3+</Text>
                        </View>
                        <View className="px-4 py-2 mr-2 rounded-full bg-gray-200">
                            <Text>★ 4+</Text>
                        </View>
                        <View className="px-4 py-2 rounded-full bg-gray-200">
                            <Text>★ 5</Text>
                        </View>
                    </View>

                    <View className="flex-row justify-between mt-auto">
                        <TouchableOpacity onPress={() => setFilterToggled(false)}>
                            <Text className="text-gray-500">Reset</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setFilterToggled(false)}
                            className="px-6 py-3 rounded-full bg-black"
                        >
                            <Text className="text-white font-semibold">Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
            <Animated.View
                style={{
                    height: sortHeight,
                    shadowOpacity: 0.25,
                    shadowRadius: 20,
                    elevation: 20,
                }}
                className="w-full overflow-hidden px-5"
            >
                <View
                    style={{
                        flex: 1,
                        padding: 20,
                        paddingTop: 0,

                    }}
                >
                    <Text className="text-xl font-semibold mb-4">Sort By</Text>

                    <TouchableOpacity className="py-3 border-b border-gray-200" onPress={() => setSortOption("nearest_first")}>
                        <Text className="text-base">Nearest First</Text>
                    </TouchableOpacity>


                    <TouchableOpacity className="py-3 border-b border-gray-200" onPress={() => setSortOption("highest_rated")}>
                        <Text className="text-base">Highest Rated</Text>
                    </TouchableOpacity>


                    <TouchableOpacity className="py-3 border-b border-gray-200" onPress={() => setSortOption("most_reviews")}>
                        <Text className="text-base">Most Reviews</Text>
                    </TouchableOpacity>


                    <TouchableOpacity className="py-3 border-b border-gray-200" onPress={() => setSortOption("lowest_price")}>
                        <Text className="text-base">Lowest Price</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="py-3" onPress={() => setSortOption("highest_price")}>
                        <Text className="text-base">Highest Price</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-between mt-auto">
                    <TouchableOpacity onPress={() => setFilterToggled(false)}>
                        <Text className="text-gray-500">Reset</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setFilterToggled(false)}
                        className="px-6 py-3 rounded-full bg-black"
                    >
                        <Text className="text-white font-semibold">Apply</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
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
                        <View className={"w-full h-72 px-8 mb-6"}>
                            <SitterNearYouCard {...item} />
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
}
