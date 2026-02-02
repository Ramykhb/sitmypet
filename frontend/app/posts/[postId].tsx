import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useLocalSearchParams} from 'expo-router'
import api from "@/config/api";
import {SafeAreaView} from "react-native-safe-area-context";
import {backendPath} from "@/config/backConfig";

type Owner = {
    id: string;
    firstname: string;
    lastname: string;
    profileImageUrl: string;
    emailVerified: boolean;
    clientRating: number;
    reviewsCount: number;
};

type Pet = {
    id: string;
    name: string;
    breed: string;
    imageUrl: string | null;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
};

export type Post = {
    id: string;
    title: string;
    description: string;
    location: string;
    duration: string;
    imageUrl: string;
    serviceType: string;
    price: string;
    status: "OPEN" | "CLOSED" | "PENDING";
    ownerId: string;
    petId: string;
    owner: Owner;
    pet: Pet;
    createdAt: string;
    updatedAt: string;
    isSaved: boolean;
};

const PostDetails = () => {
    const {postId} = useLocalSearchParams<{ postId: string }>();
    const [post, setPost] = useState<Post>();

    const handleSave = async () => {
        if (!post) return;

        setPost(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                isSaved: !prev.isSaved,
            };
        });

        try {
            await api.post(`/sitter/posts/${post.id}/toggle-save`);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchHomeData = async () => {
        try {
            const res = await api.get(`/posts/${postId}`);
            setPost(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchHomeData();
    }, []);

    return (
        <SafeAreaView edges={["bottom", "right", "left"]} className={"relative flex-1"}>
            <ScrollView horizontal={false} className={"mb-40"}>
                <View className={"flex p-10 py-7"}>
                    <Image
                        source={{uri: post?.imageUrl}}
                        className="w-full h-56 rounded-3xl"
                        resizeMode="cover"
                    />
                    <View className={"w-full flex flex-row items-center py-5"}>
                        <Text className="text-2xl flex-1 text-[#0a0a0a] pr-3" numberOfLines={2}>{post?.title}</Text>
                        <TouchableOpacity onPress={handleSave}>
                            {post?.isSaved ?
                                <Image source={require("../../assets/icons/bookmark-filled.png")} tintColor={'#3944D5'}
                                       className={"w-8 h-8"}/> :
                                <Image source={require("../../assets/icons/bookmark.png")} className={"w-8 h-8"}/>}
                        </TouchableOpacity>
                    </View>
                    <View className={"w-full flex flex-row items-center"}>
                        <Image
                            source={require("../../assets/icons/pin.png")}
                            className={"w-4 h-4"}
                        />
                        <Text className={"text-gray-500 ml-2 font-semibold text-sm"}>
                            {post?.location}
                        </Text>
                        <View className={"w-1 h-1 rounded-full ml-2 bg-gray-500"}/>
                        <Text className={"text-gray-500 ml-2 font-semibold text-sm"}>
                            {post?.serviceType}
                        </Text>
                        <View className={"w-[1px] h-[12px] rounded-full ml-2 bg-gray-500"}/>
                        <Text className={"text-gray-500 ml-2 font-semibold text-sm"}>
                            {post?.duration}
                        </Text>
                    </View>
                    <View className={"w-full flex flex-row items-center rounded-2xl bg-gray-200 h-20 mt-7"}>
                        <View className={"w-[33%] flex items-center justify-center border-r border-r-gray-400"}>
                            <Image source={require("../../assets/icons/verified-shield.png")} alt="Verified shield"
                                   className={"w-6 h-6 mb-1"}/>
                            <Text className={"text-gray-500"}>Verified</Text>
                        </View>
                        <View className={"w-[33%] flex items-center justify-center border-r border-r-gray-400"}>
                            <Text className={"text-xl font-bold text-[#0a0a0a]"}>{post?.owner.reviewsCount ?? 0}</Text>
                            <Text className={" text-gray-500"}>Reviews</Text>
                        </View>
                        <View className={"w-[33%] flex items-center justify-center"}>
                            <View className={"w-full flex flex-row justify-center items-center"}>
                                <Image source={require("../../assets/icons/star.png")} alt="Star"
                                       className={"w-6 h-6 mr-2"}/>
                                <Text className={"text-xl font-bold text-[#0a0a0a]"}>{post?.owner.reviewsCount == 0 ? "-" : post?.owner.clientRating}</Text>
                            </View>
                            <Text className={" text-gray-600"}>Rating</Text>
                        </View>
                    </View>
                    <Text className={"text-xl text-[#0a0a0a] mt-5"}>Description</Text>
                    <Text className={"text-lg text-gray-500"}>{post?.description}</Text>
                </View>
            </ScrollView>
            <View
                className={"bg-white flex justify-around p-10 h-60 w-full absolute bottom-0 left-0 rounded-tl-[35px] rounded-tr-[35px] shadow-xl"}>
                <TouchableOpacity className={"w-full h-14 bg-gray-200 rounded-full flex items-center justify-center"}>
                    <Text className={"text-lg font-bold text[#0a0a0a]"}>Contact via email</Text>
                </TouchableOpacity>
                <TouchableOpacity className={"w-full h-14 bg-[#3944D5] rounded-full flex items-center justify-center"}>
                    <Text className={"text-lg font-bold text-white"}>Apply to job</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default PostDetails;
