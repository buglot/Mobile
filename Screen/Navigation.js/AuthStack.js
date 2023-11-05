import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DoorControl from '../DoorControl/DoorControl';
import PageMangerKey from '../Keymanager/Page_manager_key';
import Login from '../Login/Login';
import ForgotPasswordPage from '../ForgetPass/ForgotPasswordPage';
import AppStack from './AppStack';
import Register from '../Register/Register';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPasswordPage" component={ForgotPasswordPage} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen
                name="AppStack"
                component={AppStack}
                options={{ gestureEnabled: false }} // ปิดการใช้งานการเลื่อนนิ้วในเมนูแถบข้าง
            />
        </Stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({})