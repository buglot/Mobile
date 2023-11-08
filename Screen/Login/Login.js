import { StyleSheet, Text, View, ImageBackground, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput, Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { url_myAPI } from '../../configs'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [Errormsg, setErrormsg] = useState("")

    let email1
    let user
    let id

    const handleLogin = async () => {
        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('password', password);
        const response = await fetch(url_myAPI + "login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        })
        const data = await response.json()
        if (data.user) {
            navigation.navigate('AppStack')
            await AsyncStorage.setItem('username', data.user);
            await AsyncStorage.setItem('id', `${data.id}`);
            await AsyncStorage.setItem('email', data.email);
        }
        else {
            setErrormsg(data.error)
        }
        console.log(data)
    }

    const handleForgotPassword = () => {
        // นำทางไปยังหน้า "Forgot Password"
        navigation.navigate('ForgotPasswordPage');
    }

    const handleRegister = () => {
        // นำทางไปยังหน้า "Forgot Password"
        navigation.navigate('Register');
    }
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={{ backgroundColor: '#b4cded' }}
                    label="Username"
                    value={email}
                    mode='outlined'
                    placeholder="email@email.com"
                    onFocusColor="red"
                    activeOutlineColor='#034078'
                    outlineColor='#fff'
                    onChangeText={text => setEmail(text)}
                    labelStyle={{ color: 'blue' }}
                />
                <TextInput
                    style={{ backgroundColor: '#b4cded' }}
                    label="Password"
                    value={password}
                    mode='outlined'
                    activeOutlineColor='#034078'
                    outlineColor='#fff'
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
            </View>

            <View style={styles.loginButton}>
                <Button icon="login-variant" mode="contained" style={{ width: '100%', backgroundColor: '#1282a2' }} onPress={handleLogin}>
                    Login
                </Button>
            </View>

            <View style={styles.groupButton}>
                <View style={styles.regisButton}>
                    <Button icon="account-supervisor" mode="contained" style={{ width: '100%', backgroundColor: '#1282a2' }} onPress={handleRegister}>
                        Register
                    </Button>
                </View>
                <View style={styles.forgetButton}>
                    <Button icon="key-variant" mode="contained" style={{ width: '100%', backgroundColor: '#1282a2' }} onPress={(handleForgotPassword)} >
                        Forgot Password
                    </Button>
                </View>
            </View>
            <Text style={styles.redtext}>
                {Errormsg}
            </Text>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: '#0a1128'
    },
    imageContainer: {
        alignSelf: "center",
        paddingBottom: 14,
    },
    inputContainer: {
        paddingBottom: 14,
    },
    redtext: {
        color: "red",
        fontWeight: "900"
    },
    groupButton: {
        flexDirection: 'row',
        paddingTop: 14,
        gap: 5
    },
    loginButton: {
        alignItems: "center",
        width: "100%",
    },
    regisButton: {
        alignItems: "center",
        width: "48%",
        justifyContent: 'center'
    },
    forgetButton: {
        alignItems: "center",
        width: "50.8%",
        justifyContent: 'center'
    }
})