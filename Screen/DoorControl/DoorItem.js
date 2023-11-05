import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url_myAPI } from '../../configs';

const DoorItem = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    let b = props.keyState.mykeystatus
    
    let a = props.codekey 
    const toggleDoor = () => {
        if (!isLoading) {
            setIsLoading(true)
            openclose()
            // Simulate API call to toggle the door status
        }
    };

    const openclose = async () => {
        let state = 0;
        if (b === 0) {
            state = 1;
        }
        try {
            const email = await AsyncStorage.getItem('email');
            console.log(email)
            const response = await fetch(
                `${url_myAPI}openclose?codeKey=${a}&state=${state}&who=${email}`
            );
            const data = await response.json();
            setIsLoading(false);
            console.log(email)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.doorControlContainer}>
            <Text style={styles.doorControlTitle}>
                {props.nickname === "" ? (props.isHost ? props.codekey:props.emailH) : props.nickname}
            </Text>
            {props.nickname !== "" && (
                <Text style={styles.doorControlTitle2}>{props.isHost ? props.codekey:props.emailH}</Text>
            )}
            <Text style={styles.kon}>
                {props.keyState.nowCloserDoor === 0
                    ? "ไม่มีคนหน้าประตู"
                    : "มีคนหน้าประตู"}
            </Text>
            <TouchableOpacity
                style={[
                    styles.doorControlButton,
                    { backgroundColor: b === 0 ? '#ad2831' : '#2667ff' },
                ]}
                onPress={toggleDoor}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>
                    {isLoading ? 'กำลังประมวลผล...' : b === 1 ? 'เปิด' : 'ปิด'}
                </Text>
            </TouchableOpacity>

            <Text style={styles.doorStatus}>
                สถานะ: {b === 0 ? 'เปิด' : 'ปิด'}
            </Text>
        </View>
    )
}

export default DoorItem

const styles = StyleSheet.create({
    doorControlContainer: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        padding: 30,
        margin: 20,
        borderRadius: 20,
        borderWidth: 2,
        backgroundColor:'#001f54',
    },
    doorControlTitle: {
        fontSize: 36,
        color:'#fefcfb'
    },
    doorControlTitle2: {
        fontSize: 15,
        color:'#1282a2'
    },
    kon: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'#6b7fd7'
    },
    doorControlButton: {
        paddingVertical: 30,
        paddingHorizontal: 60,
        borderRadius: 15,
        marginTop: 40,
    },
    buttonText: {
        fontSize: 32,
        color:'#fefcfb',
        textAlign: 'center',
    },
    doorStatus: {
        marginTop: 40,
        fontSize: 32,
        color:'#6b7fd7',
    },
})