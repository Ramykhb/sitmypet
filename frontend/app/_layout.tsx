import {router, Stack} from "expo-router";
import {Image, Text, TouchableOpacity, View} from "react-native";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="notifications"
                options={{
                    header: () => (
                        <View
                            style={{
                                height: 120,
                                justifyContent: "flex-end",
                                paddingLeft: 15,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    router.back();
                                }}
                            >
                                <View className="flex flex-row items-center">
                                    <Image
                                        source={require("../assets/icons/back-arrow.png")}
                                        className="w-7 h-7 mr-3"
                                    />
                                    <Text className="text-[#0A0A0A] text-2xl font-bold">
                                        Notifications
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
        </Stack>
    );
}