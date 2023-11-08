import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button } from 'react-native-paper'
import { url_myAPI } from '../../configs'
import DoorItem from './DoorItem'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native';
const DoorControl = () => {
    const [keylist, setKey] = useState({});
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        AsyncStorage.getItem("username")
            .then(user => {
                fetch(`${url_myAPI}info?user=${user}`)
                .then((response) => response.json())
                .then((data) => {
                    setKey(data.key);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
                const intervalId = setInterval(() => {
                    setCurrentTime(new Date());
                    fetch(`${url_myAPI}info?user=${user}`)
                        .then((response) => response.json())
                        .then((data) => {
                            setKey(data.key);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                },300);
                return () => clearInterval(intervalId);
            })
            .catch(error => {
                console.error('Error getting username from AsyncStorage:', error);
            });
    }, [setKey]);

    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={styles.doorBody}>
                    <Text style={styles.digitalClock}>
                        {currentTime.toLocaleTimeString('en-US', {
                            hour12: false,
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                        })}
                    </Text>
                    <View style={styles.objdoor}>
                        {
                            Object.keys(keylist).map((keyId, index) => (
                                <DoorItem key={keyId} codekey={keylist[keyId].codeKey} nickname={keylist[keyId].nickname} keyState={keylist[keyId].statekey} emailH=
                                    {keylist[keyId].emailHOST} isHost={keylist[keyId].isHost} />
                            ))
                        }
                    </View>
                    <Text>asdd</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default DoorControl

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0a1128",
        height:'100%',
        paddingTop:80
    },
    doorBody: {
    },
    digitalClock: {
        fontWeight: 'bold',
        fontSize: 65,
        alignSelf: 'center',
        color:'#fefcfb'
    },
    objdoor: {
        display: "flex",
        alignItems: "center"
    },
})