import ClientHistoryCard from "@/components/ClientHistoryCard";
import SitterNearYouCard from "@/components/SitterNearYouCard";
import TodaysBookingCard from "@/components/TodaysBookingCard";
import { Link } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

export default function Sitter() {
  const [name, setName] = useState("");
  const [bookingFound, setBookingFound] = useState(true);
  const [clientFound, setClientFound] = useState(true);
  const [nearYouFound, setNearYouFound] = useState(true);

  useEffect(() => {
    const getName = async () => {
      const fname: string | null = await SecureStore.getItemAsync("firstname");
      fname ? setName(fname as string) : setName("Guest");
    };
    getName();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <View className="flex flex-col flex-1 w-full items-center ">
          <View
            className={
              "flex-row flex w-full h-[75px] justify-around items-center "
            }
          >
            <Image
              source={require("../../../assets/images/pfp.jpg")}
              alt="Home Image"
              className={"w-14 h-14 rounded-full"}
              resizeMode={"cover"}
            />
            <View className={"flex flex-col mr-3"}>
              <Text className={"text-base text-gray-500 text-center"}>
                Hello, {name}
              </Text>
              <Text className={"text-lg font-bold text-[#0A0A0A] text-center"}>
                How do you feel today?
              </Text>
            </View>
            <Image
              source={require("../../../assets/icons/bell-red.png")}
              alt="Home Image"
              className={"w-8 h-8 rounded-full"}
              resizeMode={"cover"}
            />
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
              <Link href={"/"} className={"mr-8"} disabled={!bookingFound}>
                <Text className={"text-lg font-bold  text-[#3944D5]"} style={bookingFound ? {} : {color: "#AAAAAA"}}>
                  See all
                </Text>
              </Link>
            </View>

            {bookingFound ? (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <TodaysBookingCard />
                <TodaysBookingCard />
              </ScrollView>
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
                <TouchableOpacity className="w-[60%] bg-[#3944D5] h-14 rounded-full flex flex-row items-center justify-center my-5">
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
              <Link href={"/"} className={"mr-8"} disabled={!clientFound}>
                <Text className={"text-lg font-bold  text-[#3944D5]"} style={clientFound ? {} : {color: "#AAAAAA"}}>
                  See all
                </Text>
              </Link>
            </View>
            {clientFound ? (
              <ScrollView
                horizontal={true}
                className={"pl-5"}
                showsHorizontalScrollIndicator={false}
              >
                <ClientHistoryCard />
                <ClientHistoryCard />
                <ClientHistoryCard />
                <ClientHistoryCard />
                <ClientHistoryCard />
                <ClientHistoryCard />
              </ScrollView>
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
                <TouchableOpacity className="w-[60%] bg-[#3944D5] h-14 rounded-full flex flex-row items-center justify-center my-5">
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
              <Link href={"/(tabs)/(home)/sitterNearYou"} className={"mr-8"} disabled={!nearYouFound}>
                <Text className={"text-lg font-bold  text-[#3944D5]"} style={nearYouFound ? {} : {color: "#AAAAAA"}}>
                  See all
                </Text>
              </Link>
            </View>
            {nearYouFound ? (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                className={"w-full"}
              >
                <View className={"w-[300px] h-52 pl-8"}>
                  <SitterNearYouCard />
                </View>
                <View className={"w-[300px] h-52 pl-8"}>
                  <SitterNearYouCard />
                </View>
              </ScrollView>
            ) : (
              <View
                className={
                  "flex flex-col px-6 py-4 w-full h-42 justify-start items-center"
                }
              >
                <Text className="text-xl text-[#0a0a0a] font-bold mb-1">
                  No current jobs available. 🙁
                </Text>
                <Text className="text-lg text-[#0a0a0a]">
                    {"We'll notify you when something opens up."}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
