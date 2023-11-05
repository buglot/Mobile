import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { url_myAPI } from '../../../configs';
import { useNavigation } from '@react-navigation/native';

export default function SharedMemberItem(prop) {
    const navigation = useNavigation();
    const giveHost = () => {
        const formData = new URLSearchParams();
        formData.append("email", prop.data1.email);
        formData.append("codeKey", prop.sendCodeKey);

        fetch(url_myAPI + "tranferHost", {
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
                navigation.navigate("OnlyHost")
                alert("We transfer host to new one!");
                // Instead of window.location.reload(), you can use a React Native navigation library to navigate to a different screen.
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const deleteMember = () => {
        const formData = new URLSearchParams();
        formData.append("idaccountskey", prop.data1.idaccountskey);

        fetch(url_myAPI + "Kick", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const deleteMember = () => {
        const formData = new URLSearchParams();
        formData.append("idaccountskey", prop.data1.idaccountskey);

        fetch(url_myAPI + "Kick", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                navigation.navigate()
                alert("Delete this member!");
                
                // Instead of window.location.reload(), you can use a React Native navigation library to navigate to a different screen.
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
                alert("Delete this member!");
                
                // Instead of window.location.reload(), you can use a React Native navigation library to navigate to a different screen.
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <View style={styles.memberItem}>
            <Text style={styles.memberNickname}>{prop.data1.idaccountskey.slice(0, 9)}...</Text>
            <Text style={styles.memberNickname}>{prop.data1.email}</Text>
            <TouchableOpacity onPress={giveHost} style={styles.memberButton}>
                <Text style={styles.buttonText}>Give Host!</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteMember} style={styles.memberButton}>
                <Text style={styles.buttonText}>Delete Member!</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    memberItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        marginVertical: 16,
        backgroundColor: '#2541b2',
    },
    memberNickname: {
        backgroundColor: '#8ecae6',
        borderWidth: 2,
        borderColor: '#1A1A1A',
        color: '#000',
        fontFamily: 'Roobert',
        fontSize: 16,
        fontWeight: '600',
        padding: 8,
        textAlign: 'center',
        width: '20%',
    },
    memberButton: {
        backgroundColor: '#000000',
        borderWidth: 2,
        borderColor: '#1A1A1A',
        borderRadius: 15,
        fontFamily: 'Roobert',
        fontSize: 16,
        fontWeight: '600',
        padding: 8,
        textAlign: 'center',
        width: '25%',
    },
    buttonText: {
        color: '#06bee1',
        textAlign: 'center',
    },
});
