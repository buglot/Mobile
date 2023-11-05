import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DoorControl from '../DoorControl/DoorControl';
import PageMangerKey from '../Keymanager/Page_manager_key';
import Login from '../Login/Login';
import ForgotPasswordPage from '../ForgetPass/ForgotPasswordPage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomerDrawer from './CustomerDrawer';
import OnlyHost from '../HostManager/OnlyHost';


const Drawer = createDrawerNavigator(); // สร้าง Drawer Navigator

const AppStack = () => {

    return (
        <Drawer.Navigator drawerContent={props => <CustomerDrawer{...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: 'darkblue',
                drawerActiveTintColor: '#fff',
                drawerLabelStyle: {
                    fontSize: 15
                }
            }}>
            <Drawer.Screen
                name="DoorControl"
                component={DoorControl}

            />
            <Drawer.Screen
                name="PageMangerKey"
                component={PageMangerKey}

            />
            <Drawer.Screen
                name="OnlyHost"
                component={OnlyHost} />
        </Drawer.Navigator>
    )
}

export default AppStack

const styles = StyleSheet.create({})