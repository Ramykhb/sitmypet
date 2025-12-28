import {Stack, Tabs} from "expo-router";
import {BlurView} from "expo-blur";
import "../global.css"
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Image, StyleSheet, Text, View, Animated, Dimensions, Role} from "react-native";
import {use, useEffect, useRef, useState} from "react";
import * as SecureStore from "expo-secure-store";

const TabIcon = ({focused, icon, title}: any) => {
    return (
        <View className="flex-1 min-w-[85px] w-full min-h-[58px] mt-[31px] justify-center items-center flex-col">
            <Image
                source={icon}
                className="size-9"
                tintColor={focused ? "#3944D5" : "#666666"}
            />
            <Text
                className={`font-bold text-xs ${focused ? "text-[#3944D5]" : "text-[#666666]"}`}
            >
                {title}
            </Text>
        </View>
    );
};

export default function TabsLayout() {
    const indicatorX = useRef(new Animated.Value(0)).current;
    const [role, setRole] = useState("");
    const [barWidth, setBarWidth] = useState(0);
    const TAB_COUNT = 4;
    const BAR_PADDING = 5;
    const PILL_WIDTH = 85;
    const contentWidth = barWidth - BAR_PADDING * 2;
    const step = contentWidth / TAB_COUNT;

    useEffect(() => {
        const getRole = async () => {
            const roletemp = await SecureStore.getItemAsync("role");
            setRole(roletemp as string);
        }
        getRole();
    }, []);

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

                tabBarItemStyle: {
                    justifyContent: "center",
                    alignItems: "center",
                },

                tabBarBackground: () => (
                    <BlurView
                        intensity={30}
                        tint={"light"}
                        onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
                        style={{
                            flex: 1,
                            borderRadius: 50,
                            overflow: "hidden",
                            borderWidth: 1,
                            borderColor: "rgba(255,255,255,0.25)",
                        }}
                    >
                        <Animated.View
                            style={{
                                position: "absolute",
                                top: 5,
                                left: BAR_PADDING + step / 2 - PILL_WIDTH / 2,
                                height: 58,
                                width: PILL_WIDTH,
                                borderRadius: 29,
                                backgroundColor: "rgba(160,160,160,0.2)",
                                transform: [{translateX: indicatorX}],
                            }}
                        />
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
            <Tabs.Screen name="index" options={{
                title: "Home", headerShown: false, tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused}
                             icon={focused ? require("../../assets/icons/house-filled.png") : require("../../assets/icons/house.png")}
                             title="Home"/>
                )
            }} listeners={{
                focus: () => {
                    Animated.spring(indicatorX, {
                        toValue: step * 0,
                        useNativeDriver: true,
                    }).start();
                },
            }}/>
            <Tabs.Screen name="index2" options={{
                title: "Home", headerShown: false, tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused} icon={require("../../assets/icons/post.png")} title="Post"/>
                )
            }} listeners={{
                focus: () => {
                    Animated.spring(indicatorX, {
                        toValue: step * 1,
                        useNativeDriver: true,
                    }).start();
                },
            }}/>
            {role === 'owner' ? <Tabs.Screen name="index3" options={{
                title: "Home", headerShown: false, tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused}
                             icon={focused ? require("../../assets/icons/tray-filled.png") : require("../../assets/icons/tray.png")}
                             title="Requests"/>
                )
            }} listeners={{
                focus: () => {
                    Animated.spring(indicatorX, {
                        toValue: step * 2 - 1,
                        useNativeDriver: true,
                    }).start();
                },
            }}/> : <Tabs.Screen name="index3" options={{
                title: "Home", headerShown: false, tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused}
                             icon={focused ? require("../../assets/icons/bookmark-filled.png") : require("../../assets/icons/bookmark.png")}
                             title="Saved"/>
                )
            }} listeners={{
                focus: () => {
                    Animated.spring(indicatorX, {
                        toValue: step * 2 - 1,
                        useNativeDriver: true,
                    }).start();
                },
            }}/>}
            <Tabs.Screen name="index4" options={{
                title: "Home", headerShown: false, tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused}
                             icon={focused ? require("../../assets/icons/person-filled.png") : require("../../assets/icons/profile.png")}
                             title="Profile"/>
                )
            }} listeners={{
                focus: () => {
                    Animated.spring(indicatorX, {
                        toValue: step * 3 - 3,
                        useNativeDriver: true,
                    }).start();
                },
            }}/>

        </Tabs>
    </SafeAreaProvider>
}
