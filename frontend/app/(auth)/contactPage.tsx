import React from "react";
import {
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
                autoCapitalize={"none"}
              ></TextInput>
            </View>
            <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
              <Text className={"text-xl"}>Email</Text>
              <TextInput
                className={
                  "w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"
                }
                autoCapitalize={"none"}
              ></TextInput>
            </View>
            <View className={"px-5 w-full mt-5 text-[#0A0A0A]"}>
              <Text className={"text-xl"}>Subject</Text>
              <TextInput
                className={
                  "w-full h-14 border border-gray-300 rounded-xl mt-3 px-5"
                }
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
                textAlignVertical={"top"}
              ></TextInput>
            </View>
            <TouchableOpacity
              className="w-[85%] bg-[#3944D5] h-14 rounded-full flex flex-row items-center justify-center mt-7"
              onPress={() => {}}
            >
              <Text className="text-white text-lg font-bold">Send Message</Text>
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
