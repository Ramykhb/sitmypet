import api from "@/config/api";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!loading) {
      try {
        setLoading(true);
        const res = await api.post(`/contact`, formData);
        Alert.alert(
          "Message Sent!",
          "Thanks for reaching out. We’ve received your message and will get back to you shortly."
        );
        router.push("/");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 py-10" edges={["left", "right", "bottom"]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
          extraScrollHeight={35}
          keyboardOpeningTime={100}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex flex-col flex-1 w-full px-10 items-center">
            <View className={"px-5 w-full text-[#0A0A0A] "}>
              <Text className={"text-xl"}>Full Name</Text>
              <TextInput
                className={
                  "w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"
                }
                value={formData.fullName}
                onChangeText={(text) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    fullName: text,
                  }));
                }}
                autoCapitalize={"none"}
              ></TextInput>
            </View>
            <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
              <Text className={"text-xl"}>Email</Text>
              <TextInput
                className={
                  "w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"
                }
                value={formData.email}
                onChangeText={(text) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    email: text,
                  }));
                }}
                autoCapitalize={"none"}
              ></TextInput>
            </View>
            <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
              <Text className={"text-xl"}>Subject</Text>
              <TextInput
                className={
                  "w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"
                }
                value={formData.subject}
                onChangeText={(text) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    subject: text,
                  }));
                }}
                autoCapitalize={"none"}
              ></TextInput>
            </View>
            <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
              <Text className={"text-xl"}>Message</Text>
              <TextInput
                className={
                  "w-full h-36 border border-gray-300 rounded-xl mt-3 px-5 py-3"
                }
                multiline={true}
                value={formData.message}
                onChangeText={(text) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    message: text,
                  }));
                }}
                textAlignVertical={"top"}
              ></TextInput>
            </View>
            <TouchableOpacity
              className="w-[85%] bg-[#3944D5] h-14 rounded-full flex flex-row items-center justify-center mt-7"
              onPress={handleSubmit}
            >
              {loading ? (
                <ActivityIndicator size={"small"} color={"#FFFFFF"} />
              ) : (
                <Text className="text-white text-lg font-bold">
                  Send Message
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[85%] bg-[#26BE5A] h-14 rounded-full flex flex-row items-center justify-center my-5"
              onPress={() => Linking.openURL("https://wa.me/96170820520")}
            >
              <Image
                source={require("../../assets/icons/whatsapp.png")}
                alt="logo"
                className="w-6 h-6 mr-3"
              />
              <Text className="text-white text-lg font-bold">
                Whatsapp Support
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
export default ContactPage;
