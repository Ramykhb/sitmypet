import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {router, Stack} from "expo-router";

const PostsLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="[postId]"
                options={{
                    headerShown: true,
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
                                        source={require("../../assets/icons/back-arrow.png")}
                                        className="w-7 h-7 mr-3"
                                    />
                                    <Text className="text-[#0A0A0A] text-2xl font-bold">
                                        Job Details
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
        </Stack>
    )
}
export default PostsLayout
