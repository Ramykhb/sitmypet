import {NativeTabs, Icon, Label} from "expo-router/unstable-native-tabs";
import {SafeAreaProvider} from "react-native-safe-area-context";
import "../global.css";

export default function TabsLayout() {
    return (
        <SafeAreaProvider>
            <NativeTabs
                labelStyle={{ color: '#555555' }}
                tintColor="#3944D5">
                <NativeTabs.Trigger name={"(home)"}>
                    <Label>Home</Label>
                    <Icon sf={{ default: 'house', selected: 'house.fill' }}/>
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
        </SafeAreaProvider>
    );
}
