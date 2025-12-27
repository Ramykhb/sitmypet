import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const userLoggedIn = await fakeCheckAuth(); // Replace with your real auth check

            if (userLoggedIn) {
                router.replace('/(tabs)');
            } else {
                router.replace("/(auth)");
            }
        };

        checkAuth();
    }, []);

    return null;
}

async function fakeCheckAuth() {
    // hay fake login check for now
    // hota true to simulate he is logged in, false otherwise
    return true;
}