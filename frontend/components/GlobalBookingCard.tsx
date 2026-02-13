import React, {useEffect, useState} from "react";
import { Image, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store"
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
    styling?: string;
}

const serviceIcons: Record<string, any> = {
    "dog walking": require("../assets/icons/dogWalking.png"),
    "pet sitting": require("../assets/icons/petSitting.png"),
    "grooming": require("../assets/icons/petGrooming.png"),
    "health care": require("../assets/icons/petHealth.png"),
};

const GlobalBookingCard = (props:Appointment) => {
    const [role, setRole] = useState("");
    useEffect(() => {
        const getRole = async () => {
            const role = await SecureStore.getItemAsync("role");
            setRole(role as string);
        }
        getRole();
    }, []);

  return (
    <View
      className={
        `flex flex-col px-6 py-6 rounded-3xl border-gray-300 border ml-8 justify-between ${props.styling}`
      }
    >
      <View className={"flex-row flex w-full justify-between items-center "}>
        <View className={"flex flex-row"}>
          <Image
            source={role === "SITTER" ? {uri: props.owner.profileImageUrl} : {uri: props.sitter.profileImageUrl}}
            alt="Home Image"
            className={"w-12 h-12 rounded-full"}
            resizeMode={"cover"}
          />
          <View className={"flex flex-col ml-3"}>
            <Text className={"text-base text-[#0A0A0A] text-left"}>
                {role === "SITTER" ? props.owner.firstname + " " + props.owner.lastname : props.sitter.firstname + " " + props.sitter.lastname}
            </Text>
            <Text className={"text-sm text-gray-500 text-left"}>
                {props.pet.name}
            </Text>
          </View>
        </View>
          <Image
              source={serviceIcons[props.service.name.toLowerCase()]}
              className="w-10 h-10 rounded-full"
              resizeMode="cover"
          />
      </View>
        <View
            className={"w-full flex-row h-20 p-4 bg-[#E8ECED] rounded-2xl justify-between"}
        >
        <View className={"flex justify-around"}>
          <Text className={"text-xs text-gray-500"}>Service type</Text>
          <Text className={"text-base"}>{props.service.name}</Text>
        </View>
        <View className={"h-full w-[1px] bg-gray-300"} />

        <View className={"flex justify-around"}>
          <Text className={"text-xs text-gray-500"}>{props.location}</Text>
          <Text className={"text-base"}>{props.scheduledTime}</Text>
        </View>
      </View>
    </View>
  );
};

export default GlobalBookingCard;
