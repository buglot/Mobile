import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ForgotPasswordForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isValidEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const handleSubmit = () => {
        if (!isValidEmail(email)) {
            alert('Please enter a valid email');
            return;
        }

        if (newPassword === confirmPassword) {
            onSubmit({ email, newPassword });
        } else {
            alert('New password and confirmation do not match');
        }
    };

    return (
        <View style={styles.form}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
            />

            <Text style={styles.label}>New password:</Text>
            <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                secureTextEntry
            />

            <Text style={styles.label}>Confirm new password:</Text>
            <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={{ color: '#fff', fontSize: 25 }}>Confirm</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        borderColor: '#000',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 30,
        gap: 20
    },
    label: {
        fontSize: 20,
        color: 'chocolate',
        textAlign: 'left',
    },
    input: {

        padding: 10,
        color: '#442b1d',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
    },
    button: {

        backgroundColor: '#d35400',
        color: '#fff',
        padding: 30,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },

});


export default ForgotPasswordForm;