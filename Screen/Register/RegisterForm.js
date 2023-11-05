import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { url_myAPI } from '../../configs';
import { TextInput } from 'react-native-paper';

export default function RegisterForm(props) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const register = () => {
        const formData = new URLSearchParams();
        formData.append("email", email);

        if (password === confirmPassword) {
            formData.append("password", password);
            fetch(`${url_myAPI}register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData.toString()
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        alert(data.error);
                    } else {
                        alert("register successfully");
                        props.history.push('/login');
                    }
                });
        } else {
            alert("Password does not match");
        }
    };

    return (
        <View style={styles.body}>
            <Text style={styles.regisHeader}>Register</Text>
            <View style={styles.registerContainer}>
                <TextInput
                    style={styles.registerInput}
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    mode='outlined'
                />

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.registerInput}
                        label="Password"
                        secureTextEntry={!passwordVisible}
                        value={password}
                        onChangeText={setPassword}
                        mode='outlined'
                    />
                    <View style={styles.hidebutton}>
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <Text style={styles.passwordToggle}>
                                {passwordVisible ? 'Hide' : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TextInput
                    style={styles.registerInput}
                    label="Confirm Password"
                    secureTextEntry={!passwordVisible}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    mode='outlined'
                />
            </View>
            <View style={styles.regisShape}>
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={register}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        borderWidth: 4,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#003566'
    },
    regisHeader: {
        fontSize: 30,
        marginBottom: 20,
        color: '#fff'
    },
    registerContainer: {
        width: '80%',
    },
    registerInput: {
        height: 50,
        borderColor: 'gray',

        paddingLeft: 10,
        width: '100%'
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    passwordToggle: {
        color: '#000',
        fontSize: 15,
    },
    registerButton: {
        backgroundColor: '#0073e6',
        height: 50,
        alignItems: 'center',
        borderRadius: 5,
        paddingTop: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    regisShape: {
        width: '80%',
        paddingTop: 10
    },
    hidebutton: {
        borderWidth: 1,
        height: 55,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginTop: 8,
        backgroundColor: '#ffc300',
        borderRadius: 5
    }
});
