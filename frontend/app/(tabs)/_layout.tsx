import {Stack, Tabs} from "expo-router";
import {BlurView} from "expo-blur";
import "./global.css"
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";

const TabIcon = (props:any) => {
    if (props.focused)
    {
        return (
            <View className="justify-center items-center rounded-full mt-4 size-full bg-red-400">
                <Image source={props.icon} className="size-5" tintColor="#3944D5"/>
            </View>
        );
    }
    return (
        <View className="justify-center items-center rounded-full mt-4 size-full">
            <Image source={props.icon} className="size-5" tintColor="#A8B5DB"/>
        </View>
    )
}

export default function RootLayout() {
    return <SafeAreaProvider>
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,

                tabBarStyle: {
                    position: "absolute",
                    backgroundColor: "transparent", // IMPORTANT
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 58,
                    borderTopWidth: 0,
                    elevation: 0,
                },

                tabBarBackground: () => (
                    <BlurView
                        intensity={30}
                        tint="light"
                        style={{
                            flex: 1,
                            borderRadius: 50,
                            overflow: "hidden",
                            borderWidth: 1,
                            borderColor: "rgba(255,255,255,0.25)",
                        }}
                    >
                        <View
                            style={{
                                ...StyleSheet.absoluteFillObject,
                                backgroundColor: "rgba(120,120,120,0.08)",
                            }}
                        />
                    </BlurView>
                )
            }}
        >
            <Tabs.Screen name="index" options={{title:"Home", headerShown: false,  tabBarIcon: ( { focused } ) => (
                    <TabIcon focused={focused} icon={require("../assets/icons/house.png")} title="Home" />
                )}} />
            <Tabs.Screen name="index2" options={{title:"Home", headerShown: false,  tabBarIcon: ( { focused } ) => (
                    <TabIcon focused={focused} icon={require("../assets/icons/house.png")} title="Home" />
                )}} />
            <Tabs.Screen name="index3" options={{title:"Home", headerShown: false,  tabBarIcon: ( { focused } ) => (
                    <TabIcon focused={focused} icon={require("../assets/icons/house.png")} title="Home" />
                )}} />
            <Tabs.Screen name="index4" options={{title:"Home", headerShown: false,  tabBarIcon: ( { focused } ) => (
                    <TabIcon focused={focused} icon={require("../assets/icons/house.png")} title="Home" />
                )}} />

        </Tabs>
    </SafeAreaProvider>
}
