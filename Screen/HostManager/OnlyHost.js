import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { url_myAPI } from '../../configs';
import ShareKeyItems from './ShareKey/ShareKeyItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnlyHost() {
    const [key, setKey] = useState({});
    const [who, setWho] = useState({});
    const [account, setAccounts] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await AsyncStorage.getItem("username");

                if (user !== null) {
                    const response = await fetch(url_myAPI + "info?user=" + user);
                    const data = await response.json();
                    setAccounts(data);
                    if (data.HostKey) {
                        setKey(data.HostKey);
                    }
                    console.log(data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserData();
    }, [setKey, setAccounts]);

    if (account.isHost === false) {
        return (
            <View style={styles.container}>
                <View style={styles.onlyhostBody}>
                    <View style={styles.centered}>
                        <Text style={styles.errorMessage}>You are not the host of this key</Text>
                    </View>
                </View>
            </View>
        );
    }
    else {
        return (
            <ScrollView style={styles.onlyhostBody}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.headerText}>Host Manager</Text>
                    </View>
                    <View>
                        <Text style={styles.headerText}>Key Manager</Text>
                    </View>
                    {Object.values(key).map((item, index) => (
                        <ShareKeyItems data={item} who={who} key={index} />
                    ))}
                </View>
            </ScrollView >
        );
    }

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        height: '100%',
    },
    onlyhostBody: {
        flex: 1,
        width: "100%",
        backgroundColor: '#023047',
    },
    centered: {
        alignItems: 'center',
        top:'37%'
    },
    errorMessage: {
        fontSize: 30,
        color: 'red',
    },
    onlyhostHeader: {
        marginBottom: 16,
    },
    headerText: {
        textAlign: 'center',
        color: '#00ccff',
        fontSize: 30,
        textShadowColor: '#0466c8',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
});
