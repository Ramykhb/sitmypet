import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const userLoggedIn = await fakeCheckAuth();
      if (userLoggedIn) {
        // router.replace("/(tabs)/(home)");
          router.replace("/(auth)/uploadDocument")
      } else {
        router.replace("/(auth)/signin");
      }
    };

    checkAuth();
  }, []);
  return null;
}

async function fakeCheckAuth(): Promise<boolean> {
  try {
    const token = await SecureStore.getItemAsync("accessToken");

    return token !== null && token !== "";
  } catch (error) {
    console.error("Error checking auth:", error);
    return false;
  }
}
