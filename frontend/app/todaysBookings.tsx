import SitterNearYouCard from "@/components/SitterNearYouCard";
import React, {useEffect, useState} from "react";
import {FlatList, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import api from "@/config/api";
import SitterNearYouCardLoading from "@/components/SitterNearYouCardLoading";
import TodaysBookingCard from "@/components/TodaysBookingCard";
import TodaysBookingCardLoading from "@/components/TodaysBookingCardLoading";

type AppointmentStatus = "CONFIRMED" | "COMPLETED" | "CANCELLED";

interface Service {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

interface UserProfile {
    id: string;
    firstname: string;
    lastname: string;
    profileImageUrl: string;
    emailVerified: boolean;
}

interface Pet {
    id: string;
    name: string;
    breed: string;
    imageUrl: string | null;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
}

interface Appointment {
    id: string;
    sitterId: string;
    ownerId: string;
    petId: string;
    serviceId: string;
    location: string;
    scheduledTime: string;
    status: AppointmentStatus;
    createdAt: string;
    updatedAt: string;
    service: Service;
    owner: UserProfile;
    sitter: UserProfile;
    pet: Pet;
    isOwner: boolean;
    isSitter: boolean;
}

type AppointmentList = Appointment[];

const TodaysBookings = () => {
    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState<AppointmentList>([]);
    const [unCompleted, setUnCompleted] = useState<AppointmentList>([]);

    useEffect(() => {
        const getBookings = async () => {
            setLoading(true);
            try {
                const res = await api.get("/bookings");
                const allBookings: AppointmentList = res.data;

                const completedBookings = allBookings.filter(
                    b => b.status === "COMPLETED" || b.status === "CANCELLED"
                );

                const unCompletedBookings = allBookings.filter(
                    b => b.status === "CONFIRMED"
                );

                setCompleted(completedBookings);
                setUnCompleted(unCompletedBookings);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getBookings();
    }, []);

    return (
        <SafeAreaView className={"flex-1"} edges={["right", "left"]}>
            {loading ? (
                <View className="flex mt-10">
                    <View className={"w-[90%] ml-[5%] px-6 mb-10"}>
                        <TodaysBookingCardLoading/>
                    </View>
                    <View className={"w-[90%] ml-[5%] px-6 mb-10"}>
                        <TodaysBookingCardLoading/>
                    </View>
                    <View className={"w-[90%] ml-[5%] px-6 mb-10"}>
                        <TodaysBookingCardLoading/>
                    </View>
                </View>
            ) : (
                <FlatList
                    data={unCompleted}
                    className={"w-full mb-20 mt-10"}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <View className={"w-full mb-6"}>
                            <TodaysBookingCard {...item} styling={"w-[86%] ml-[7%] h-52"}/>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
};
export default TodaysBookings;
