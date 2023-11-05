import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RegisterForm from './RegisterForm';

export default function Register() {
    const emailInput = useRef("");
    const passInput = useRef("");
    const newPassInput = useRef("");


    return (
        <View style={styles.container}>
            <RegisterForm
                emailInput={emailInput}
                passInput={passInput}
                newPassInput={newPassInput}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
