import ClientHistoryCard from "@/components/ClientHistoryCard";
import ClientHistoryCardLoading from "@/components/ClientHistoryCardLoading";
import SitterNearYouCard from "@/components/SitterNearYouCard";
import SitterNearYouCardLoading from "@/components/SitterNearYouCardLoading";
import TodaysBookingCard from "@/components/TodaysBookingCard";
import TodaysBookingCardLoading from "@/components/TodaysBookingCardLoading";
import api from "@/config/api";
import {Link, useFocusEffect} from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

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
  serviceType: string;
  time: string;
};

export default function Sitter() {
  const [name, setName] = useState("");
  const [bookingFound, setBookingFound] = useState<TodaysBooking[]>([]);
  const [clientFound, setClientFound] = useState<ClientHistory[]>([]);
  const [nearYouFound, setNearYouFound] = useState<NearbyRequest[]>([]);
  const [loading, setIsLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const getName = async () => {
        const fname: string | null = await SecureStore.getItemAsync("firstname");
        fname ? setName(fname as string) : setName("Guest");
        setIsLoading(true);
        try {
          const res = await api.get("/sitter/home");
          setNearYouFound(res.data.nearbyRequests);
          setClientFound(res.data.recentClients);
          setBookingFound(res.data.todaysBookings);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      getName();
    }, [])
  );

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
                <Text
                  className={"text-lg font-bold  text-[#3944D5]"}
                  style={bookingFound ? {} : { color: "#AAAAAA" }}
                >
                  See all
                </Text>
              </Link>
            </View>

            {loading ? (
              <View className="flex flex-row">
                <TodaysBookingCardLoading />
                <TodaysBookingCardLoading />
              </View>
            ) : Object.keys(bookingFound).length > 0 ? (
              <FlatList
                horizontal={true}
                data={bookingFound}
                className={"mr-10"}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TodaysBookingCard {...item} />}
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
                <Text
                  className={"text-lg font-bold  text-[#3944D5]"}
                  style={clientFound ? {} : { color: "#AAAAAA" }}
                >
                  See all
                </Text>
              </Link>
            </View>
            {loading ? (
              <View className="flex flex-row pl-5">
                <ClientHistoryCardLoading />
                <ClientHistoryCardLoading />
                <ClientHistoryCardLoading />
                <ClientHistoryCardLoading />
                <ClientHistoryCardLoading />
              </View>
            ) : Object.keys(clientFound).length > 0 ? (
              <FlatList
                className={"pl-5"}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                data={clientFound}
                renderItem={({ item }) => <ClientHistoryCard {...item} />}
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
              <Link
                href={"/(tabs)/(home)/sitterNearYou"}
                className={"mr-8"}
                disabled={!nearYouFound}
              >
                <Text
                  className={"text-lg font-bold  text-[#3944D5]"}
                  style={nearYouFound ? {} : { color: "#AAAAAA" }}
                >
                  See all
                </Text>
              </Link>
            </View>
            {loading ? (
              <View className="flex flex-row mb-28">
                <View className="w-[300px] h-52 pl-8">
                  <SitterNearYouCardLoading />
                </View>
                <View className="w-[300px] h-52 pl-8">
                  <SitterNearYouCardLoading />
                </View>
              </View>
            ) : Object.keys(nearYouFound).length > 0 ? (
              <FlatList
                data={nearYouFound}
                horizontal={true}
                className={"w-full mb-28"}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
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
