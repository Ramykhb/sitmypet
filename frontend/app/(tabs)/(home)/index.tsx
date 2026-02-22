import {router, useRouter} from "expo-router";
import * as SecureStore from "expo-secure-store";
import {useEffect, useState} from "react";
import api from "@/config/api";
import {ActivityIndicator, Text, View} from "react-native";

export default function Index() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkRole = async () => {
            const role = await SecureStore.getItemAsync("role");
            if (role === "OWNER") {
                router.replace("/(tabs)/(home)/owner");
            } else if (role === "SITTER") {
                // router.replace("/(tabs)/(home)/sitter");
                router.replace("/users/1")
            } else {
                router.replace("/(auth)/homeAuth");
            }
        };

        checkRole();
    }, []);

    return null;
}

