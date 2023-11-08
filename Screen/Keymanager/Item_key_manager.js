import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import ChangeName from './ChangeName';
import { url_myAPI } from '../../configs';
import { useNavigation } from '@react-navigation/native';

const Item_key_manager = (props) => {
    var codeKey = props.keyData["codeKey"];
    let shotKey = "(NO NICKNAME)\n" + codeKey.slice(0, 35) + ".....";
    let nickname = props.keyData["nickname"];
    let hostKey = props.keyData["isHost"];
    let emailhost = props.keyData["emailHOST"];
    let idAccountKey = props.keyData["id"];
    const [buttonChoose, setButtonChoose] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const navigation = useNavigation();

    if (!hostKey) {
        codeKey = "(host) " + codeKey;
    }

    const handleDisconnect = () => {
        setErrorMessage("");
        setButtonChoose(3);
        if (!hostKey) {
            Alert.alert(
                "Disconnect Key",
                "Are you sure you want to disconnect this key?",
                [
                    {
                        text: "Cancel",
                        onPress: () => { },
                        style: "cancel"
                    },
                    {
                        text: "Disconnect",
                        onPress: () => {disconnectKey(idAccountKey);props.reload()}
                    }
                ]
            );
        } else {
            Alert.alert(
                "Host Key",
                "You are the host key and cannot disconnect it. You must change the host.",
                [{ text: "OK", onPress: () => { } }]
            );
            setErrorMessage("You are the host key and cannot disconnect it. You must change the host.");
        }
    };

    const disconnectKey = (idAccountKey) => {
        const formData = new FormData();
        formData.append('idaccountkey', idAccountKey);
        

        fetch(`${url_myAPI}disconnectkey`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                Alert.alert("Disconnect Key", data.data, [
                    {
                        text: 'OK',
                        
                    }
                ]);
            })

    };

    const handleManage = () =>{
        navigation.navigate('OnlyHost')
    }

    return (
        <View style={styles.container}>
            <View style={styles.nicknameButton}>
                {nickname === "" ? <Text style={styles.texttilte}>{shotKey}</Text> : <Text style={styles.texttilte}>{nickname}</Text>}
            </View>

            <View style={styles.emailhost}>
                <Text style={styles.text}>{hostKey == true ? codeKey : emailhost}</Text>
            </View>

            <View style={styles.sizeBut}>
                <Button style={styles.buttonChoose} textColor='white' icon={"rename-box"} onPress={() => setButtonChoose(1)} >
                    ChangeName
                </Button>
                {hostKey === true && (
                    <Button
                        style={styles.manegerbtn}
                        onPress={() => {
                            setButtonChoose(2);
                            setErrorMessage("");
                            handleManage();
                        }}
                        icon={'hammer-screwdriver'}
                    >Manage</Button>
                )}

                <Button style={styles.disconectbtn} onPress={handleDisconnect} icon={"lan-disconnect"}>Disconnect</Button>
            </View>

            {errorMessage && <Text>{errorMessage}</Text>}
            {buttonChoose === 1 && <ChangeName set={setButtonChoose} idaccountkey={idAccountKey} reload={props.reload}/>}
        </View>
    );
};

export default Item_key_manager

const styles = StyleSheet.create({
    nicknameButton: {
        backgroundColor: '#001f54',
        padding: 20,
        borderRadius: "20%"

    },
    text: {
        color: '#fff',
        alignSelf: 'center',
        margin: 9
    },
    texttilte: {
        fontWeight: "bold",
        fontSize: 20,
        color: '#fff',
        alignSelf: 'center',
    },
    buttonChoose: {
        backgroundColor: '#1282a2',
        height: 50,
        justifyContent: "center"
    },
    container: {
        borderWidth: 3,
        borderColor: 'black',
        gap: 10,


    },
    sizeBut: {
        width: '40%',
        alignSelf: 'center',
        gap: 5,
        justifyContent: 'center'
    },
    emailhost: {
    },
    disBut: {

    },
    manegerbtn: {
        backgroundColor: '#ffb20f',
        height: 50,
        justifyContent: "center"
    },
    disconectbtn: {
        backgroundColor: '#ff4b3e',
        height: 50,
        justifyContent: "center"
    }
})