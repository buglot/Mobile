import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { url_myAPI } from '../../configs';

export default function KeyGenerate(prop) {
    const [keyCode, setKeyCode] = useState('');

    const addKey = () => {
        const formData = new URLSearchParams();
        formData.append("codeKeypp", prop.codeKeysend);

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
                <TextInput style={styles.input} value={keyCode} readOnly />
            </View>
            <View style={styles.buttonContainer}>
                <Button color={'#000'} title="Generate Key!" onPress={addKey} />
                <Button color={'#000'} title="Delete Key!" onPress={deleteKey} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 16,
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
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
