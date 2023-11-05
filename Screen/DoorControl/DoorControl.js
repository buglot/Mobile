import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button } from 'react-native-paper'
import { url_myAPI } from '../../configs'
import DoorItem from './DoorItem'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DoorControl = () => {
    const [key, setKey] = useState({});
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
                }, 5000);
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
                            Object.keys(key).map((keyId, index) => (
                                <DoorItem codekey={key[keyId].codeKey} nickname={key[keyId].nickname} keyState={key[keyId].statekey} emailH=
                                    {key[keyId].emailHOST} isHost={key[keyId].isHost} />
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
    },
    doorBody: {

    },
    digitalClock: {
        fontWeight: 'bold',
        fontSize: 50,
        alignSelf: 'center',
        color:'#fefcfb'
    },
    objdoor: {
        display: "flex",
        alignItems: "center"
    },
})