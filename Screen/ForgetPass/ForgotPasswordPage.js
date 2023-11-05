import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { url_myAPI } from '../../configs';
const ForgotPasswordPage = () => {
    const handleForgotPassword = async ({ email, newPassword }) => {

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', newPassword);
        console.log(newPassword)
        const response = await fetch(url_myAPI + "forgetpass", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "email=" + email + "&password=" + newPassword,
        });
        const data = await response.json();

        if (data.data) {
            Alert.alert('Success', data.data, [{ text: 'OK', onPress: () => navigateToLogin() }]);
        } else {
            Alert.alert('Error', data.error);
        }

    };

    const navigateToLogin = () => {
        // Implement navigation to login screen for React Native
    };

    return (

        <View style={styles.container}>
            <Text style={styles.h1}>Forget Password</Text>
            <ForgotPasswordForm onSubmit={handleForgotPassword} />
        </View>

    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    container: {
        justifyContent: "center",
        backgroundColor: "#0a1128",
        height: "100%"
    },
    h1: {
        color: 'chocolate',
        fontSize: 32,
        marginBottom: 20,
    },
});

export default ForgotPasswordPage;