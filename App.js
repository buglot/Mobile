import { StyleSheet, Text, View,Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './Screen/Navigation.js/AuthStack';
const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }} // ซ่อนหัวเรื่องของ Stack Navigator
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
