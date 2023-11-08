import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { url_myAPI } from '../../configs';
import ListState from './Liststate/Liststate';
import { FlatList } from 'react-native';

export default class Item_History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeKey: props.keyData.codeKey,
            nickname: props.keyData.nickname,
            qu: 10,
            histo: {},
        };
    }

    componentDidMount() {
        this.getState();
        this.interval = setInterval(() => {
            this.getState();
        }, 30000);
    }

    getState = () => {
        const { codeKey, qu } = this.state;
        fetch(`${url_myAPI}history?codeKey=${codeKey}&row=${qu}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ histo: data.data });
            })
            .catch();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { codeKey, nickname, qu, histo } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>

                    <View style={styles.namebar}>
                        <Text style={styles.nameText}>{nickname}</Text>
                    </View>

                    <View style={styles.stateContainer}>
                        <Text style={styles.stateText}>จำนวนเปิดปิด: {this.props.keyData.statekey.countuse}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={{ borderWidth: 1, width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor:'#34a0a4' }}>
                            <TextInput
                                style={styles.input}
                                value={qu.toString()}
                                onChangeText={(text) => this.setState({ qu: parseInt(text) })}
                                keyboardType="numeric"
                                selectTextOnFocus={true}
                                maxLength={2}
                            />
                        </View>

                        <View style={{ borderWidth: 1, width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.submitButton} onPress={this.getState}>
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.colordss}>
                    {Object.values(histo).map((item, index) => (
                        <ListState key={index} time={item.time} date={item.date} report={item.report} />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#001c55',
        gap: 20,
        marginTop: 15,
        padding: 20,
        flexDirection: 'column',
        borderRadius: 10
    },
    title: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
        display: 'flex',
    },
    mixs: {
        flexDirection: 'row',
        gap: 10
    },
    namebar: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 90,
        backgroundColor:'#0e6ba8'
    },
    off: {

    },
    state: {

    },
    input: {

    },
    submitButton: {
        borderWidth: 1,
        width: 50, height: 50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#34a0a4'
    },
    submitButtonText: {

    },
    colordss: {
        backgroundColor: '#a6e1fa',
        borderRadius: 10,
        
    },
    itemContainer: {

    },
    mixContainer: {
        borderWidth: 10
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    stateContainer: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffc300',
        width:'40%'
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10
    }
});
