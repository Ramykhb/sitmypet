import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {router, Slot, Stack} from "expo-router";

const ProfileLayout = () => {
    return (
        <Stack screenOptions={{
            headerStyle: {backgroundColor: "#F2F2F2",},
            headerTintColor: "#0A0A0A",
            headerShadowVisible: false,
        }}>
            <Stack.Screen
                name="index"
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="changePassword"
                options={{
                    header: () => (
                        <View style={{ height: 120, justifyContent: 'flex-end', paddingLeft: 15}}>
                            <TouchableOpacity onPress={() => {router.back();}}>
                                <View className="flex flex-row items-center">
                                    <Image
                                        source={require('../../../assets/icons/back-arrow.png')}
                                        className="w-7 h-7 mr-3"
                                    />
                                    <Text className="text-[#0A0A0A] text-2xl font-bold">Change Password</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="myDocuments"
                options={{
                    header: () => (
                        <View style={{ height: 120, justifyContent: 'flex-end', paddingLeft: 15}}>
                            <TouchableOpacity onPress={() => {router.back();}}>
                                <View className="flex flex-row items-center">
                                    <Image
                                        source={require('../../../assets/icons/back-arrow.png')}
                                        className="w-7 h-7 mr-3"
                                    />
                                    <Text className="text-[#0A0A0A] text-2xl font-bold">My Documents</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="editProfile"
                options={{
                    header: () => (
                        <View style={{ height: 120, justifyContent: 'flex-end', paddingLeft: 15}}>
                            <TouchableOpacity onPress={() => {router.back();}}>
                                <View className="flex flex-row items-center">
                                    <Image
                                        source={require('../../../assets/icons/back-arrow.png')}
                                        className="w-7 h-7 mr-3"
                                    />
                                    <Text className="text-[#0A0A0A] text-2xl font-bold">Edit Profile</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
        </Stack>
    )
}
export default ProfileLayout
