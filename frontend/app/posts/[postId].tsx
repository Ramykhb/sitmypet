import {View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useLocalSearchParams} from 'expo-router'
import api from "@/config/api";
import {SafeAreaView} from "react-native-safe-area-context";
import {backendPath} from "@/config/backConfig";
import * as SecureStore from "expo-secure-store";

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

type Service = {
    id: string;
    createdAt: string;
    name: string;
    updatedAt: string;
}

type Post = {
    id: string;
    title: string;
    description: string;
    location: string;
    duration: string;
    imageUrl: string;
    service: Service;
    price: string;
    status: "OPEN" | "CLOSED" | "PENDING";
    ownerId: string;
    petId: string;
    owner: Owner;
    pet: Pet;
    createdAt: string;
    updatedAt: string;
    isSaved: boolean;
    isApplied: boolean;
};

const PostDetails = () => {
    const {postId} = useLocalSearchParams<{ postId: string }>();
    const [post, setPost] = useState<Post>();
    const [loading, setLoading] = useState<boolean>(false);
    const [applying, setApplying] = useState<boolean>(false);
    const [isApplied, setIsApplied] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>("");

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

    const handeApplication = async () => {
        if (applying) return;
        setApplying(true);
        if (isApplied) {
            try {
                const res = await api.delete(`/applications/withdraw/${post?.id}`);
                setIsApplied(false);
            } catch (e) {
                console.log(e);
            } finally {
                setApplying(false);
            }
        } else {
            try {
                const res = await api.post(`/applications/apply/${post?.id}`);
                setIsApplied(true);
            } catch (e) {
                console.log(e);
            } finally {
                setApplying(false);
            }
        }
    }

    useEffect(() => {
        if (!post) return;
        setIsApplied(post.isApplied)
    }, [post]);

    const fetchHomeData = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/posts/${postId}`);
            setPost(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getUserId = async () => {
            const id = await SecureStore.getItemAsync("id");
            setUserId(id as string);
        }
        getUserId();
        fetchHomeData();
    }, []);

    return (
        <SafeAreaView edges={["bottom", "right", "left"]} className={"relative flex-1"}>
            {loading ? <View className={"flex flex-col flex-1 justify-center items-center h-full w-full"}>
                    <ActivityIndicator size="large"/>
                    <Text className={"text-2xl mt-6 text-[#0a0a0a] text-center"}>Fetching post...</Text>
                </View> :
                <ScrollView horizontal={false} className={"mb-48 flex-1"}>
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
                                    <Image source={require("../../assets/icons/bookmark-filled.png")}
                                           tintColor={'#3944D5'}
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
                                {post?.service.name}
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
                                <Text
                                    className={"text-xl font-bold text-[#0a0a0a]"}>{post?.owner.reviewsCount ?? 0}</Text>
                                <Text className={" text-gray-500"}>Reviews</Text>
                            </View>
                            <View className={"w-[33%] flex items-center justify-center"}>
                                <View className={"w-full flex flex-row justify-center items-center"}>
                                    <Image source={require("../../assets/icons/star.png")} alt="Star"
                                           className={"w-6 h-6 mr-2"}/>
                                    <Text
                                        className={"text-xl font-bold text-[#0a0a0a]"}>{post?.owner.reviewsCount == 0 ? "-" : post?.owner.clientRating}</Text>
                                </View>
                                <Text className={" text-gray-600"}>Rating</Text>
                            </View>
                        </View>
                        <Text className={"text-xl text-[#0a0a0a] mt-5"}>Description</Text>
                        <Text className={"text-lg text-gray-500 mb-6"}>{post?.description}</Text>
                    </View>
                </ScrollView>
            }
            {loading ? <></> : userId === post?.ownerId ? <View
                className={"bg-white flex justify-around p-10 h-60 w-full absolute bottom-0 left-0 rounded-tl-[35px] rounded-tr-[35px] shadow-xl"}>
                <TouchableOpacity
                    className={`w-full h-14 bg-[#E7E8FF] rounded-full flex items-center justify-center`}
                    onPress={handeApplication}>
                    <Text className={`text-lg font-bold text-[#3944D5]`}>View Applications</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={"w-full h-14 bg-[#fcb3b3] rounded-full flex flex-row justify-center items-center"}>
                    <Image source={require("../../assets/icons/trash.png")} className={"w-8 h-8 mr-3"}
                           tintColor={"#dc2626"}/>
                    <Text className={"text-red-600 font-bold text-lg"}>Delete Post</Text>
                </TouchableOpacity>
            </View> : <View
                className={"bg-white flex justify-around p-10 h-60 w-full absolute bottom-0 left-0 rounded-tl-[35px] rounded-tr-[35px] shadow-xl"}>
                <TouchableOpacity className={"w-full h-14 bg-gray-200 rounded-full flex items-center justify-center"}>
                    <Text className={"text-lg font-bold text[#0a0a0a]"}>Contact via email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`w-full h-14 ${isApplied ? "bg-[#E7E8FF]" : "bg-[#3944D5]"} rounded-full flex items-center justify-center`}
                    onPress={handeApplication}>
                    {applying ? <ActivityIndicator size="small" color={"#ffffff"}/> : !isApplied ?
                        <Text className={"text-lg font-bold text-white"}>Apply to job</Text> :
                        <Text className={`text-lg font-bold text-[#3944D5]`}>Withdraw application</Text>}
                </TouchableOpacity>
            </View>}
        </SafeAreaView>
    )
}
export default PostDetails;
