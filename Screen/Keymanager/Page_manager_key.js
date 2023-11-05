import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { url_myAPI } from '../../configs';
import Item_key_manager from './Item_key_manager';
import ItemAddKey from './Item_add_key';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PageMangerKey = () => {
    const [user, setUser] = useState("");
    const [infoAccount, setInfoAccount] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('username').then(storedUser => {
            if (storedUser) {
                setUser(storedUser);
                fetch(url_myAPI + "info?user=" + storedUser)
                    .then(response => response.json())
                    .then(data => {
                        setInfoAccount(data);
                    })
                    .catch(error => console.error(error));
            }
        });
    }, [setInfoAccount]);
    if (infoAccount === null) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    } else if (infoAccount.keyconnect === null) {
        return (
            <View>
                <Text>Logging</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <ItemAddKey />
            <ScrollView>
                <View style={styles.conin}>
                    {infoAccount.keyconnect !== false && Object.keys(infoAccount.HostKey).map((keyId, index) => (
                        <Item_key_manager key={index} keyData={infoAccount.key[keyId]} />
                    ))}
                </View>
            </ScrollView>

        </View>
    );
};

export default PageMangerKey;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0a1128',
        flex: 1,
        gap: 30
    },
    conin: {
        padding: 10,
        gap: 20
    }
})