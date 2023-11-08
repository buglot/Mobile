import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { Button } from "react-native-paper"
export default function TabTimeNotifi(props) {
    const deleteItemAtIndex = () => {
        props.deleteItem(props.index);
    };
    return (
        <View style={props.delMode ? styles.container:styles.container2}>
            <View style={styles.boxInside}>
                <Text style={styles.textShow}>{props.First}</Text>
                <Text style={styles.textShow}>TO</Text>
                <Text style={styles.textShow}>{props.Last}</Text>
            </View>
            {props.delMode && 
            <Button onPress={deleteItemAtIndex} icon="delete-clock" textColor='black' mode="elevated" compact={true} style={{ width: '30%', backgroundColor: '#ff006e', borderRadius: 0, justifyContent: "center" }}>
                Delete
            </Button>
            }

        </View>
    );
}
const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: "#17255a",
            justifyContent: "space-between",
            flexDirection: "row",
            minHeight: 70,
            borderBottomWidth: 3
        },
        container2: {
            backgroundColor: "#17255a",
            minHeight: 70,
            borderBottomWidth: 3,
            justifyContent:"center"
        },
        boxInside: {
            padding: 15,
            display: "flex",
            gap: 20,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#17255a",
            justifyContent: "space-evenly",
        },
        textShow: {
            fontSize: 16,
            fontWeight: "600",
            color: "#d8e2dc"
        }
    }
);