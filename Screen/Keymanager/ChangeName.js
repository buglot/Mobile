import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { url_myAPI } from '../../configs'
import { TextInput, Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';

const ChangeName = (props) => {
    const [nameChange, setNameChange] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigation = useNavigation()
    let set = props.set
    const Connects = () => {
        if (nameChange !== "") {
            const formData = new FormData();
            formData.append('idaccountkey', props.idaccountkey);
            formData.append('name', nameChange);

            fetch(url_myAPI + 'namechange', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        setErrorMessage(data.data);
                        Alert.alert(data.data, "", [
                            { text: 'OK', onPress: () => {handleChangeName();props.reload() }}
                        ]);
                        
                    } else {
                        setErrorMessage(data.error);
                    }
                })
                .catch(error => setErrorMessage("Error in server. Please try again."));
        } else {
            setErrorMessage("Please enter a name.");
        }
    };

    const handleChangeName = () =>{
        navigation.navigate('PageMangerKey')
    }
    return (
        <View style={{ padding: 30, backgroundColor: "#31263e", gap: 10 }}>
            <View style={{ gap: 5, flexDirection: "row" }}>
                <View style={{ width: "80%" }}>
                    <TextInput
                        placeholder="Name Change"
                        value={nameChange}
                        mode='outlined'
                        onChangeText={text => {
                            setNameChange(text);
                            setErrorMessage("");
                        }}
                    />
                </View>
                <Button style={styles.xbtn} textColor='white' onPress={() => set(0)} >x</Button>
                {errorMessage && <Text>{errorMessage}</Text>}
            </View>

            <View style = {{alignItems:'center', justifyContent:'center',width:'100%'}}>
                <Button style={styles.changebtn} textColor="white" onPress={Connects} icon={"rename-box"} >Change</Button>
            </View>
        </View>

    );
};

export default ChangeName;

const styles = StyleSheet.create({
    changebtn: {
        backgroundColor: "#754f44",
        height: 50,
        alignSelf:'center',
        justifyContent:'center',
        width:'100%'
    },
    xbtn: {
        backgroundColor: "#d62246",
        width: "20%",
        justifyContent: "center",
        borderRadius: "-20%",
        height: '100%'
    }
})