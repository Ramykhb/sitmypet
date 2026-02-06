import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    Dimensions, Image,
} from 'react-native';
import { BlurView } from 'expo-blur';

type DropdownItem = {
    id: string;
    createdAt: string;
    name: string;
    updatedAt: string;
};

type CustomDropdownProps = {
    data: DropdownItem[];
    value: string | null;
    onChange: (value: string) => void;
    placeholder?: string;
    wrapperWidth?: string;
};

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function CustomDropdown({
                                                data,
                                                value,
                                                onChange,
                                                placeholder = 'Select an option',
    wrapperWidth
                                            }: CustomDropdownProps) {
    const [visible, setVisible] = useState(false);

    const selectedLabel = data.find((item) => item.name === value)?.name || '';

    return (
        <View style={styles.wrapper} className={`bg-transparent w-[${wrapperWidth ? wrapperWidth : "50%" }]`}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setVisible(true)}
                className={"bg-transparent"}
            >
                <BlurView intensity={25} tint="light" style={styles.button}>
                    <Text style={[styles.buttonText, !value && { color: '#0a0a0a' }]} className={"flex flex-row item-center justify-center"}>
                        {value ? selectedLabel : placeholder}{"  "}
                        <Image source={require("../assets/icons/arrow-down.png")} className={"w-4 h-4 mt-2"}/>
                    </Text>
                </BlurView>
            </TouchableOpacity>

            <Modal visible={visible} transparent animationType="fade">
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <BlurView intensity={80} tint="dark" style={styles.dropdownContainer}>
                            <FlatList
                                data={data}
                                keyExtractor={(item) => item.name}
                                ItemSeparatorComponent={() => <View style={styles.separator} />}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.item}
                                        onPress={() => {
                                            onChange(item.name);
                                            setVisible(false);
                                        }}
                                    >
                                        <Text style={[
                                            styles.itemText,
                                            item.name === value && styles.selectedItemText
                                        ]}>
                                            {item.name}
                                        </Text>
                                        {item.name === value && <Text style={styles.checkmark}>✓</Text>}
                                    </TouchableOpacity>
                                )}
                            />
                        </BlurView>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: "0%",
    },
    button: {
        height: 35,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        paddingHorizontal: 20,
        overflow: 'hidden',
        backgroundColor: "#e5e7eb",
    },
    buttonText: {
        fontSize: 13,
        fontWeight: '600',
        textAlign: "center",
        color: '#0a0a0a',
        letterSpacing: -0.4,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    dropdownContainer: {
        width: '85%',
        maxHeight: SCREEN_HEIGHT / 2.5,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        overflow: 'hidden',
        paddingVertical: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    itemText: {
        fontSize: 17,
        color: 'rgba(255,255,255,0.9)',
    },
    selectedItemText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
    checkmark: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginHorizontal: 20,
    },
});