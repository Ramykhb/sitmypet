import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';


export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const userLoggedIn = await fakeCheckAuth(); // Replace with your real auth check

            if (userLoggedIn) {
                router.replace('/(tabs)');
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
        const token = await SecureStore.getItemAsync('accessToken');

        return token !== null && token !== '';
    } catch (error) {
        console.error('Error checking auth:', error);
        return false;
    }
}