import {NativeTabs, Icon, Label} from "expo-router/unstable-native-tabs";
import {SafeAreaProvider} from "react-native-safe-area-context";
import "../global.css";
import {useTheme} from "@react-navigation/native";
import {Platform, View} from "react-native";
import {usePathname} from "expo-router";

export default function TabsLayout() {
    const isIOS = Platform.OS === "ios";
    const isOldIOS = isIOS && Number(Platform.Version) < 26;
    const {colors} = useTheme();
    const pathname = usePathname();
    const activeColor = "#3944D5";

    const isActive = (route: string) => pathname.includes(route);

    return (
        <View style={{flex: 1, backgroundColor: colors.background}}>
            <NativeTabs
                tintColor={activeColor}>
                <NativeTabs.Trigger name={"(home)"}>
                    <Label>Home</Label>
                    <Icon sf={{default: 'house', selected: 'house.fill'}}/>
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name={"explore"}>
                    <Label>Explore</Label>
                    <Icon sf={"magnifyingglass"}/>
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name={"saved"}>
                    <Label>Saved</Label>
                    <Icon sf={{default: "bookmark", selected: 'bookmark.fill'}}/>
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name={"(profile)"}>
                    <Label>Profile</Label>
                    <Icon sf={{default: "person", selected: 'person.fill'}}/>

                </NativeTabs.Trigger>
            </NativeTabs>
        </View>
    );
}
