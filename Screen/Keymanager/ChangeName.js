import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { url_myAPI } from '../../configs'
import { TextInput, Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

const ChangeName = (props) => {
    const [nameChange, setNameChange] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
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
                            { text: 'OK', onPress: () => window.location.reload() }
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
            <Button style={styles.changebtn} textColor="white" onPress={Connects} >Change</Button>
        </View>

    );
};

export default ChangeName;

const styles = StyleSheet.create({
    changebtn: {
        backgroundColor: "#754f44",
        width: "100%",
        height: 50
    },
    xbtn: {
        backgroundColor: "#d62246",
        width: "20%",
        justifyContent: "center",
        borderRadius: "-20%",
    }
})