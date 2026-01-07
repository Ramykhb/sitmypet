import {View, Text} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";

const ChangePassword = () => {
    return (
        <SafeAreaView className={"flex flex-row justify-center items-center flex-1"}>
            <Text className={'text-3xl text-center font-bold'}>ChangePassword Page</Text>
        </SafeAreaView>
    )
}
export default ChangePassword
