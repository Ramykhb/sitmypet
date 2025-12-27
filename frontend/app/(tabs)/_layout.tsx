import {Stack, Tabs} from "expo-router";
import {BlurView} from "expo-blur";
import "../global.css"
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";

const TabIcon = (props:any) => {
    if (props.focused)
    {
        return (
            <View className="flex flex-row flex-1 min-w-[85px] w-full min-h-[58px] mt-[31px] justify-center items-center flex-col rounded-full overflow-hidden" style={{backgroundColor: "rgba(160,160,160,0.2)"}}>
                <Image source={props.icon} className="size-9" tintColor="#3944D5"></Image>
                <Text className={"font-bold text-xs text-[#3944D5]"}>{props.title}</Text>
            </View>
        );
    }
    return (
        <View className="flex flex-row flex-1 min-w-[85px] w-full min-h-[58px] mt-[31px] justify-center items-center rounded-full overflow-hidden flex-col">
            <Image source={props.icon} className="size-9" tintColor="#666666"></Image>
            <Text className={"font-bold text-xs text-[#666666]"}>{props.title}</Text>
        </View>
    )
}

export default function TabsLayout() {
    return <SafeAreaProvider>
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,

                tabBarStyle: {
                    position: "absolute",
                    backgroundColor: "transparent",
                    marginHorizontal: 20,
                    marginBottom: 36,
                    paddingHorizontal: 5,
                    height: 70,
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
                    <TabIcon focused={focused} icon={require("../../assets/icons/house.png")} title="Home" />
                )}} />
            <Tabs.Screen name="index2" options={{title:"Home", headerShown: false,  tabBarIcon: ( { focused } ) => (
                    <TabIcon focused={focused} icon={require("../../assets/icons/post.png")} title="Post" />
                )}} />
            <Tabs.Screen name="index3" options={{title:"Home", headerShown: false,  tabBarIcon: ( { focused } ) => (
                    <TabIcon focused={focused} icon={require("../../assets/icons/tray.png")} title="Requests" />
                )}} />
            <Tabs.Screen name="index4" options={{title:"Home", headerShown: false,  tabBarIcon: ( { focused } ) => (
                    <TabIcon focused={focused} icon={require("../../assets/icons/profile.png")} title="Profile" />
                )}} />

        </Tabs>
    </SafeAreaProvider>
}
