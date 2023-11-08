import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { url_myAPI } from '../../configs';
import Item_History from './Item_History';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function History() {
    const [user, setUser] = useState(''); // Store user in state
    const [infoAccount, setInfoAccount] = useState(null);

    useEffect(() => {
        // Load the user from AsyncStorage
        AsyncStorage.getItem('username')
            .then((value) => {
                setUser(value);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        fetch(`${url_myAPI}info?user=${user}`)
            .then((response) => response.json())
            .then((data) => {
                setInfoAccount(data);
            })
            .catch((error) => console.error(error));
    }, [user]);

    if (infoAccount === null) {
        return <Text>Loading...</Text>;
    }

    const key = infoAccount.key;

    return (
        <View style={styles.container}>
            <ScrollView  horizontal = {true}>
                <View style={styles.mainPage}>
                    {Object.keys(key).map((keyId, index) => (
                        <Item_History key={index} keyData={key[keyId]} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00072d',
    },
    mainPage: {
        padding: 20,
        zIndex: 0,
        justifyContent: 'center',
        overflow: 'scroll',
        flexDirection:'row',
        gap:30
    },
});
