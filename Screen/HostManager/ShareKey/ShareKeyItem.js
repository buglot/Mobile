import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import KeyGenerate from '../KeyGenerate';
import SharedMemberItem from '../ShareMemberItem/ShareMemberItem';
import { url_myAPI } from '../../../configs';

export default function ShareKeyItems(prop) {
    const nickname = prop.data.nickname.String;
    const codeKey = prop.data.codeKey;
    const shareKey = prop.data.shareKey;
    const [who, setWho] = useState({});
    const loadData = ()=>{
        fetch(url_myAPI + "whoJoinKey?codeKey=" + codeKey)
            .then((response) => response.json())
            .then((data) => {
                setWho(data.data);
                console.log(data.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {
        loadData()
    }, []);
    const reloadpage=()=>{
        loadData();
    }
    return (
        <View>
            <View style={styles.sharekeyContainer}>
                <Text >codeKey {codeKey}</Text>
                <Text>nickname {nickname === "" ? "ไม่มี" : nickname}</Text>
                <KeyGenerate codeKeysend={codeKey} shareKeySend={shareKey} />
            </View>
            {Object.values(who).map((item, index) => (
                <SharedMemberItem data1={item} sendCodeKey={codeKey} key={index} reloadpage={reloadpage}/>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    sharekeyContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        marginVertical: 16,
        backgroundColor: '#219ebc',
        width:'95%',
        alignSelf:'center',
        borderRadius:20
    },
});
