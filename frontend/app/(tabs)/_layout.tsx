import {Platform, View} from "react-native";
import {NativeTabs, Icon, Label} from "expo-router/unstable-native-tabs";
import {BlurView} from "expo-blur";
import {Tabs} from "expo-router";
import * as SecureStore from "expo-secure-store";
import {useEffect, useRef, useState} from "react";
import {Animated, Image, StyleSheet, Text} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import "../global.css";

const TabIcon = ({focused, icon, title}: any) => {
    return (
        <View style={{
            flex: 1,
            minWidth: 85,
            minHeight: 58,
            marginTop: 31,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Image source={icon} style={{width: 36, height: 36}} tintColor={focused ? "#3944D5" : "#666666"}/>
            <Text style={{fontSize: 12, fontWeight: "700", color: focused ? "#3944D5" : "#666666"}}>
                {title}
            </Text>
        </View>
    );
};

function CustomTabs() {
    const indicatorX = useRef(new Animated.Value(0)).current;
    const [role, setRole] = useState("");
    const [barWidth, setBarWidth] = useState(0);

    const TAB_COUNT = 4;
    const BAR_PADDING = 5;
    const PILL_WIDTH = 85;
    const contentWidth = barWidth - BAR_PADDING * 2;
    const step = contentWidth / TAB_COUNT;

    useEffect(() => {
        SecureStore.getItemAsync("role").then((r) => setRole(r || ""));
    }, []);

    return (
        <SafeAreaProvider>
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
                            tint="light"
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
                                style={{...StyleSheet.absoluteFillObject, backgroundColor: "rgba(120,120,120,0.08)"}}/>
                        </BlurView>
                    ),
                }}
            >
                <Tabs.Screen
                    name="(home)"
                    options={{
                        tabBarIcon: ({focused}) => (
                            <TabIcon
                                focused={focused}
                                icon={
                                    focused
                                        ? require("../../assets/icons/house-filled.png")
                                        : require("../../assets/icons/house.png")
                                }
                                title="Home"
                            />
                        ),
                    }}
                    listeners={{
                        focus: () => Animated.spring(indicatorX, {toValue: step * 0, useNativeDriver: true}).start(),
                    }}
                />

                <Tabs.Screen
                    name="explore"
                    options={{
                        tabBarIcon: ({focused}) => (
                            <TabIcon
                                focused={focused}
                                icon={
                                    role === "owner"
                                        ? require("../../assets/icons/post.png")
                                        : require("../../assets/icons/search.png")
                                }
                                title={role === "owner" ? "Post" : "Explore"}
                            />
                        ),
                    }}
                    listeners={{
                        focus: () => Animated.spring(indicatorX, {toValue: step * 1, useNativeDriver: true}).start(),
                    }}
                />

                <Tabs.Screen
                    name="saved"
                    options={{
                        tabBarIcon: ({focused}) => (
                            <TabIcon
                                focused={focused}
                                icon={
                                    focused
                                        ? require("../../assets/icons/bookmark-filled.png")
                                        : require("../../assets/icons/bookmark.png")
                                }
                                title={role === "owner" ? "Requests" : "Saved"}
                            />
                        ),
                    }}
                    listeners={{
                        focus: () => Animated.spring(indicatorX, {
                            toValue: step * 2 - 1,
                            useNativeDriver: true
                        }).start(),
                    }}
                />

                <Tabs.Screen
                    name="(profile)"
                    options={{
                        tabBarIcon: ({focused}) => (
                            <TabIcon
                                focused={focused}
                                icon={
                                    focused
                                        ? require("../../assets/icons/person-filled.png")
                                        : require("../../assets/icons/profile.png")
                                }
                                title="Profile"
                            />
                        ),
                    }}
                    listeners={{
                        focus: () => Animated.spring(indicatorX, {
                            toValue: step * 3 - 3,
                            useNativeDriver: true
                        }).start(),
                    }}
                />
            </Tabs>
        </SafeAreaProvider>
    );
}

function NativeGlassTabs() {
    const [role, setRole] = useState("");

    useEffect(() => {
        SecureStore.getItemAsync("role").then((r) => setRole(r || ""));
    }, []);

    return (
        <NativeTabs tintColor="#3944D5">
            <NativeTabs.Trigger name="(home)">
                <Label>Home</Label>
                <Icon sf={{default: "house", selected: "house.fill"}}/>
            </NativeTabs.Trigger>

            {role.toLowerCase() === "owner" ?
                <NativeTabs.Trigger name="createPost">
                    <Label>Post</Label>
                    <Icon sf="plus"/>
                </NativeTabs.Trigger> :
                <NativeTabs.Trigger name="explore">
                    <Label>Explore</Label>
                    <Icon sf="magnifyingglass"/>
                </NativeTabs.Trigger>}

            {role.toLowerCase() === "owner" ?
                <NativeTabs.Trigger name="requests">
                    <Label>Requests</Label>
                    <Icon sf={{default: "tray", selected: "tray.fill"}}/>
                </NativeTabs.Trigger> :
                <NativeTabs.Trigger name="saved">
                    <Label>Saved</Label>
                    <Icon sf={{default: "bookmark", selected: "bookmark.fill"}}/>
                </NativeTabs.Trigger>}


            <NativeTabs.Trigger name="(profile)">
                <Label>Profile</Label>
                <Icon sf={{default: "person", selected: "person.fill"}}/>
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}

export default function TabsLayout() {
    const isIOS = Platform.OS === "ios";
    const isOldIOS = isIOS && Number(Platform.Version) < 26;

    return !isIOS || isOldIOS ? <CustomTabs/> : <NativeGlassTabs/>;
}
