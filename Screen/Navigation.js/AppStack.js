import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DoorControl from '../DoorControl/DoorControl';
import PageMangerKey from '../Keymanager/Page_manager_key';
import Login from '../Login/Login';
import ForgotPasswordPage from '../ForgetPass/ForgotPasswordPage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomerDrawer from './CustomerDrawer';
import OnlyHost from '../HostManager/OnlyHost';
import History from '../History/History';
import PageSetTime from '../SettimeNotification/PageSetTime';


const Drawer = createDrawerNavigator(); // สร้าง Drawer Navigator

const AppStack = () => {
    useEffect(() => {
        const intervalId = setInterval(() => {


            
            console.log('eiei')
        },1000);
        return () => clearInterval(intervalId);
    },[])
    return (
        <Drawer.Navigator  unmountOnBlur={true} drawerContent={props => <CustomerDrawer{...props} />}
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
                options={{ unmountOnBlur: true }}
                component={DoorControl}

            />
            <Drawer.Screen
                name="PageMangerKey"
                options={{ unmountOnBlur: true }}
                component={PageMangerKey}

            />
            <Drawer.Screen
                name="OnlyHost"
                options={{ unmountOnBlur: true }}
                component={OnlyHost} />

            <Drawer.Screen
                name="History"
                options={{ unmountOnBlur: true }}
                component={History} />

            <Drawer.Screen
            name = "PageSetTime"
            component={PageSetTime}
            />
        </Drawer.Navigator>
    )
}

export default AppStack

const styles = StyleSheet.create({})