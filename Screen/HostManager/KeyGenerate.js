import React, { useState } from 'react';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
import { url_myAPI } from '../../configs';
import { TextInput, Button } from 'react-native-paper';

export default function KeyGenerate(prop) {
    const [keyCode, setKeyCode] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const addKey = () => {
        const formData = new URLSearchParams();
        formData.append("codeKeypp", prop.codeKeysend);
        console.log(prop.codeKeysend)

        fetch(url_myAPI + "GenShareKey", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setKeyCode(data.shareKey);

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const deleteKey = () => {
        const formData = new URLSearchParams();
        formData.append("codeKeypp", prop.codeKeysend);

        fetch(url_myAPI + "GenDeleteKey", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setKeyCode(" ");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.control}>
                <Text style={styles.label}>Generate Key</Text>
                <TextInput style={styles.input} value={keyCode} readOnly mode='flat' label='key' textColor='#003566' />
            </View>
            <View style={styles.buttonContainer}>
                <Button icon={"account-key-outline"} mode='contained-tonal' onPress={addKey} >Generate Key!</Button>
                <Button icon={"delete-outline"} mode='contained-tonal' onPress={deleteKey} >Delete Key!</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 16,
        width: '80%'
    },
    control: {
        marginBottom: 16,
    },
    label: {
        fontWeight: '800',
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        padding: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#023e7d',
        width: '100%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        alignSelf: 'center',
    },
});
