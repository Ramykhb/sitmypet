import "../global.css"
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Link, router} from "expo-router";
import React, {useEffect, useState} from "react";
import * as SecureStore from 'expo-secure-store';
import {BlurView} from "expo-blur";


export default function Index() {
    const [name, setName] = useState("");

    useEffect(() => {
        const getName = async () =>{
            const fname:string|null = await SecureStore.getItemAsync('firstname');
            setName((fname as string));
        }
        getName();
    }, []);

    return (
        <SafeAreaView className="flex-1">
            <View className="flex flex-col flex-1 w-full items-center ">
                <View className={"flex-row flex w-full h-[75px] justify-around items-center "}>
                    <Image source={require("../../assets/images/pfp.jpg")} alt="Home Image" className={"w-14 h-14 rounded-full"} resizeMode={"cover"}/>
                    <View className={"flex flex-col mr-3"}>
                        <Text className={"text-base text-gray-500 text-center"}>Hello, {name}</Text>
                        <Text className={"text-lg font-bold text-[#0A0A0A] text-center"}>How do you feel today?</Text>
                    </View>
                    <Image source={require("../../assets/icons/bell-red.png")} alt="Home Image" className={"w-8 h-8 rounded-full"} resizeMode={"cover"}/>
                </View>
                <View className={"w-full"}>
                    <View className={"flex w-full flex-row justify-between items-center my-5 mt-3"}>
                        <Text className={"text-2xl ml-8 text-[#0A0A0A]"}>{"Today's Bookings"}</Text>
                        <Link href={"/"} className={"mr-8"}>
                            <Text className={"text-lg font-bold  text-[#3944D5]"}>See all</Text>
                        </Link>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View className={"flex flex-col px-6 py-6 w-[310px] h-48 rounded-3xl border-gray-300 border ml-8 justify-between"}>
                            <View className={"flex-row flex w-full justify-between items-center "}>
                                <Image source={require("../../assets/images/pfp.jpg")} alt="Home Image" className={"w-12 h-12 rounded-full"} resizeMode={"cover"}/>
                                <View className={"flex flex-col mr-16"}>
                                    <Text className={"text-base text-[#0A0A0A] text-left"}>RK da Goat</Text>
                                    <Text className={"text-sm text-gray-500 text-left"}>Falha ahh dog</Text>
                                </View>
                                <Image source={require("../../assets/icons/bell-red.png")} alt="Home Image" className={"w-8 h-8 rounded-full"} resizeMode={"cover"}/>
                            </View>
                            <View className={"w-full flex-row flex h-20 p-4 bg-[#E8ECED] rounded-2xl justify-between"}>
                                <View className={"flex justify-around"}>
                                    <Text className={"text-xs text-gray-500"}>Service type</Text>
                                    <Text className={"text-base"}>Dog Walking</Text>
                                </View>
                                <View className={"h-full w-[1px] bg-gray-300"}/>

                                <View className={"flex justify-around"}>
                                    <Text className={"text-xs text-gray-500"}>Hamra, Beirut</Text>
                                    <Text className={"text-base"}>10:00 AM</Text>
                                </View>
                            </View>
                        </View>
                        <View className={"flex flex-col px-6 py-6 w-[310px] h-48 rounded-3xl border-gray-300 border ml-8 justify-between"}>
                            <View className={"flex-row flex w-full justify-between items-center "}>
                                <Image source={require("../../assets/images/pfp.jpg")} alt="Home Image" className={"w-12 h-12 rounded-full"} resizeMode={"cover"}/>
                                <View className={"flex flex-col mr-16"}>
                                    <Text className={"text-base text-[#0A0A0A] text-left"}>RK da Goat</Text>
                                    <Text className={"text-sm text-gray-500 text-left"}>Falha ahh dog</Text>
                                </View>
                                <Image source={require("../../assets/icons/bell-red.png")} alt="Home Image" className={"w-8 h-8 rounded-full"} resizeMode={"cover"}/>
                            </View>
                            <View className={"w-full flex-row flex h-20 p-4 bg-[#E8ECED] rounded-2xl justify-between"}>
                                <View className={"flex justify-around"}>
                                    <Text className={"text-xs text-gray-500"}>Service type</Text>
                                    <Text className={"text-base"}>Dog Walking</Text>
                                </View>
                                <View className={"h-full w-[1px] bg-gray-300"}/>

                                <View className={"flex justify-around"}>
                                    <Text className={"text-xs text-gray-500"}>Hamra, Beirut</Text>
                                    <Text className={"text-base"}>10:00 AM</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View className={"w-full"}>
                    <View className={"flex w-full flex-row justify-between items-center my-5"}>
                        <Text className={"text-2xl ml-8 text-[#0A0A0A]"}>Client History</Text>
                        <Link href={"/"} className={"mr-8"}>
                            <Text className={"text-lg font-bold  text-[#3944D5]"}>See all</Text>
                        </Link>
                    </View>
                    <ScrollView horizontal={true} className={"pl-5"} showsHorizontalScrollIndicator={false}>
                        <View className={"flex flex-col  w-20 items-center ml-3"}>
                            <Image source={require("../../assets/images/dog.jpg")} alt="Home Image" className={"w-16 h-16 rounded-full"} resizeMode={"cover"}/>
                            <Text className={"text-base text-[#0A0A0A] text-left mt-2"}>Falha</Text>
                        </View>
                        <View className={"flex flex-col  w-20 items-center ml-3"}>
                            <Image source={require("../../assets/images/dog.jpg")} alt="Home Image" className={"w-16 h-16 rounded-full"} resizeMode={"cover"}/>
                            <Text className={"text-base text-[#0A0A0A] text-left mt-2"}>Falha</Text>
                        </View>
                        <View className={"flex flex-col  w-20 items-center ml-3"}>
                            <Image source={require("../../assets/images/dog.jpg")} alt="Home Image" className={"w-16 h-16 rounded-full"} resizeMode={"cover"}/>
                            <Text className={"text-base text-[#0A0A0A] text-left mt-2"}>Falha</Text>
                        </View>
                        <View className={"flex flex-col  w-20 items-center ml-3"}>
                            <Image source={require("../../assets/images/dog.jpg")} alt="Home Image" className={"w-16 h-16 rounded-full"} resizeMode={"cover"}/>
                            <Text className={"text-base text-[#0A0A0A] text-left mt-2"}>Falha</Text>
                        </View>
                        <View className={"flex flex-col  w-20 items-center ml-3"}>
                            <Image source={require("../../assets/images/dog.jpg")} alt="Home Image" className={"w-16 h-16 rounded-full"} resizeMode={"cover"}/>
                            <Text className={"text-base text-[#0A0A0A] text-left mt-2"}>Falha</Text>
                        </View>
                    </ScrollView>
                </View>
                <View className={"w-full"}>
                    <View className={"flex w-full flex-row justify-between items-center my-5"}>
                        <Text className={"text-2xl ml-8 text-[#0A0A0A]"}>Near You</Text>
                        <Link href={"/"} className={"mr-8"}>
                            <Text className={"text-lg font-bold  text-[#3944D5]"}>See all</Text>
                        </Link>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View className={"flex flex-col px-4 py-4 w-[280px] h-52 rounded-3xl border-gray-300 border ml-8"}>
                            <View className={"w-full h-[70%] bg-blue-300 rounded-2xl overflow-hidden relative"}>
                                <BlurView
                                    intensity={60}
                                    tint="dark"
                                    className="absolute top-3 left-3 z-10 flex-row items-center px-2 py-1 rounded-lg"
                                >
                                    <Image source={require("../../assets/icons/star.png")} className={"w-4 h-4 ml-1"} />
                                    <Text className={"text-[#FFCA00] text-sm ml-1"}>4.8</Text>
                                    <Text className={"text-sm text-white ml-1"}>(320)</Text>
                                </BlurView>
                                <Image source={require("../../assets/images/dog.jpg")} className={"w-full h-full"} resizeMode={"cover"} />
                            </View>
                            <View className={"w-full overflow-hidden mt-2 flex-col justify-between flex-1"}>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    className="w-full font-bold"
                                >
                                    Golden retriever needs a walk to the park
                                </Text>
                                <View className={"w-full flex flex-row items-center h-8"}>
                                    <Image source={require("../../assets/icons/pin.png")} className={"w-4 h-4"} />
                                    <Text className={"text-gray-500 ml-2 font-semibold text-sm"}>Beirut</Text>
                                    <View className={"w-1 h-1 rounded-full ml-2 bg-gray-500"} />
                                    <Text className={"text-gray-500 ml-2 font-semibold text-sm"}>Hike</Text>
                                    <View className={"w-[1px] h-[12px] rounded-full ml-2 bg-gray-500"} />
                                    <Text className={"text-gray-500 ml-2 font-semibold text-sm"}>2-3 Days</Text>

                                </View>
                            </View>
                        </View>
                        <View className={"flex flex-col px-4 py-4 w-[280px] h-52 rounded-3xl border-gray-300 border ml-8"}>
                            <View className={"w-full h-[70%] bg-blue-300 rounded-2xl overflow-hidden relative"}>
                                <BlurView
                                    intensity={60}
                                    tint="dark"
                                    className="absolute top-3 left-3 z-10 flex-row items-center px-2 py-1 rounded-lg"
                                >
                                    <Image source={require("../../assets/icons/star.png")} className={"w-4 h-4 ml-1"} />
                                    <Text className={"text-[#FFCA00] text-sm ml-1"}>4.8</Text>
                                    <Text className={"text-sm text-white ml-1"}>(320)</Text>
                                </BlurView>
                                <Image source={require("../../assets/images/dog.jpg")} className={"w-full h-full"} resizeMode={"cover"} />
                            </View>
                            <View className={"w-full overflow-hidden mt-2 flex-col justify-between flex-1"}>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    className="w-full font-bold"
                                >
                                    Golden retriever needs a walk to the park
                                </Text>
                                <View className={"w-full flex flex-row items-center h-8"}>
                                    <Image source={require("../../assets/icons/pin.png")} className={"w-4 h-4"} />
                                    <Text className={"text-gray-500 ml-2 font-semibold text-sm"}>Beirut</Text>
                                    <View className={"w-1 h-1 rounded-full ml-2 bg-gray-500"} />
                                    <Text className={"text-gray-500 ml-2 font-semibold text-sm"}>Hike</Text>
                                    <View className={"w-[1px] h-[12px] rounded-full ml-2 bg-gray-500"} />
                                    <Text className={"text-gray-500 ml-2 font-semibold text-sm"}>2-3 Days</Text>

                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}