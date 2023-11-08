import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ListState(props) {
    return (
        <View style={styles.container}>
            <View style={styles.column1}>
                <Text>{props.date}</Text>
            </View>
            <View style={styles.column2}>
                <Text>{props.time}</Text>
            </View>
            <View style={styles.column3}>
                <Text>{props.report}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        margin: 2,
        
    },
    column1: {
        flex: 0.15,
        padding: 10,
        borderWidth: 2,
        borderColor:'#184e77',
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        alignItems: 'center',
        
    },
    column2: {
        flex: 0.15,
        padding: 10,
        borderWidth: 2,
        borderColor:'#184e77',
        alignItems: 'center',
    },
    column3: {
        flex: 0.7,
        padding: 10,
        borderWidth: 2,
        borderColor:'#184e77',
        alignItems:'center',
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        alignItems: 'center',
    },
});

export default ListState;
