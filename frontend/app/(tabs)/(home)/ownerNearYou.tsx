import SitterNearYouCard from "@/components/SitterNearYouCard";
import React from "react";
import {ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import OwnerNearYouCard from "@/components/OwnerNearYouCard";

const OwnerNearYou = () => {
    return (
        <SafeAreaView className={"flex-1"} edges={["right", "bottom", "left"]}>
            <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
                className={"w-full mt-5 mb-24"}
            >
                <View className={"w-full h-48 px-8 mb-6"}>
                    <OwnerNearYouCard/>
                </View>
                <View className={"w-full h-48 px-8 mb-6"}>
                    <OwnerNearYouCard/>
                </View>
                <View className={"w-full h-48 px-8 mb-6"}>
                    <OwnerNearYouCard/>
                </View>
                <View className={"w-full h-48 px-8 mb-6"}>
                    <OwnerNearYouCard/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default OwnerNearYou;
