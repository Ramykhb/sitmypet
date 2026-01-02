import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const checkRole = async () => {
            const role = await SecureStore.getItemAsync("role");
            if (role === "owner") {
                router.replace("/(tabs)/(home)/owner");
            } else {
                router.replace("/(tabs)/(home)/sitter");
            }
        };

        checkRole();
    }, []);

    return null;
}

