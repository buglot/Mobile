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
                    setKey(data.HostKey);
                    console.log(data);
                    setAccounts(data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserData();
    }, [setKey, setAccounts])

    useEffect(() => {
        fetch(url_myAPI + "whoJoinKey?codeKey=123")
            .then((response) => response.json())
            .then((data) => {
                setWho(data.data);
                console.log(data.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [setWho]);

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

    return (
        <View style={styles.container}>
            <ScrollView style={styles.onlyhostBody}>
                <View style={styles.onlyhostHeader}>
                    <Text style={styles.headerText}>Host Manager</Text>
                </View>
                <View style={styles.onlyhostHeader}>
                    <Text style={styles.headerText}>Key Manager</Text>
                </View>
                {Object.values(key).map((item, index) => (
                    <ShareKeyItems data={item} who={who} key={index} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4b4b4b',
    },
    onlyhostBody: {
        flex: 1,
        backgroundColor: '#023047',
        padding: 16,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
