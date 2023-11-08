import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { url_myAPI } from '../../configs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ItemAddKey = (props) => {
    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState("");
    const [keyConnect, setKeyConnect] = useState("");

    const ClickConnect = async () => {

        const user = await AsyncStorage.getItem("username");

        if (!user) {
            setErrorMessage("User not found");
            return;
        }

        const formData = new FormData();
        formData.append('key', keyConnect);
        formData.append('user', user);

        fetch(url_myAPI + 'connectKey', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    props.reload();
                } else {
                    setErrorMessage(data.error);
                }
            })
            .catch(error => {
                setErrorMessage("Server is Error Sorry."+error);
            });
    };

    return (

        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                label="Keycode"
                value={keyConnect}
                mode='outlined'
                onChangeText={text => {
                    setKeyConnect(text);
                    setErrorMessage("");
                }}
            />
            <Button style={styles.conButton} onPress={ClickConnect}
                mode='contained-tonal'
                icon='login-variant'
            >Connect
            </Button>
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>


    );
};

export default ItemAddKey;

const styles = StyleSheet.create({
    container: {
        paddingTop: 70,
        gap: 10,
        width: '90%',
        alignSelf: 'center'
    },
    conButton: {
        backgroundColor: 'aqua',
        width: '90%',
        alignSelf: 'center'
    },
    error: {
        color: 'red'
    },
    textInput: {

    },
})