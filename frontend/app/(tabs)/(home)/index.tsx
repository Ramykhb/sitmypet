import ClientHistoryCard from "@/components/ClientHistoryCard";
import NearYouCard from "@/components/NearYouCard";
import TodaysBookingCard from "@/components/TodaysBookingCard";
import { Link } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

export default function Index() {
  const [name, setName] = useState("");

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
              <Link href={"/"} className={"mr-8"}>
                <Text className={"text-lg font-bold  text-[#3944D5]"}>
                  See all
                </Text>
              </Link>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TodaysBookingCard />
              <TodaysBookingCard />
            </ScrollView>
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
              <Link href={"/"} className={"mr-8"}>
                <Text className={"text-lg font-bold  text-[#3944D5]"}>
                  See all
                </Text>
              </Link>
            </View>
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
          </View>
          <View className={"w-full"}>
            <View
              className={
                "flex w-full flex-row justify-between items-center my-5"
              }
            >
              <Text className={"text-2xl ml-8 text-[#0A0A0A]"}>Near You</Text>
              <Link href={"/(tabs)/(home)/nearYou"} className={"mr-8"}>
                <Text className={"text-lg font-bold  text-[#3944D5]"}>
                  See all
                </Text>
              </Link>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className={"w-full"}
            >
                <View className={"w-[300px] h-52 pl-8"}>
                    <NearYouCard />
                </View>
                <View className={"w-[300px] h-52 pl-8"}>
                    <NearYouCard />
                </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
