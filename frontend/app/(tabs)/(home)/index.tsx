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
                router.replace("/users/38042e2e-5d4f-4bf6-8338-8506fe5f449d")
            } else {
                router.replace("/(auth)/homeAuth");
            }
        };

        checkRole();
    }, []);

    return null;
}

