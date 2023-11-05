import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const CustomerDrawer = (props) => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: 'darkblue' }}>
                <View style={styles.bgmenu}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <TouchableOpacity onPress={() => {
                AsyncStorage.clear();
                navigation.navigate('Login')
            }}>
                <View style={styles.log}>
                    <Text style={styles.texts}>
                        Logout
                    </Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default CustomerDrawer

const styles = StyleSheet.create({
    bgmenu: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10
    },
    log: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: 'darkblue'
    },
    texts: {
        fontSize: 15
    }
})