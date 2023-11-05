import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default class ItemState extends Component {
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
                console.log(data.data);
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
                <View style={styles.title}>
                    <View style={styles.mixs}>
                        <View style={styles.namebar}>
                            <Text>{nickname}</Text>
                        </View>
                        <View style={styles.off}>
                            <Text>on</Text>
                        </View>
                    </View>
                    <View style={styles.state}>
                        <Text>จำนวนเปิดปิด: {this.props.keyData.statekey.countuse}</Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            value={qu.toString()}
                            onChangeText={(text) => this.setState({ qu: parseInt(text) })}
                            keyboardType="numeric"
                            selectTextOnFocus={true}
                            maxLength={2}
                        />
                        <TouchableOpacity style={styles.submitButton} onPress={this.getState}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.colordss}>
                    {Object.values(histo).map((item, index) => (
                        <ListState key={index} time={item.time} date={item.date} report={item.report} />
                    ))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        padding: 20,
        flexDirection: 'column',
        borderRadius: 35,
        marginTop: 15,
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    mixs: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    namebar: {
        backgroundColor: 'rgb(114, 92, 175)',
        borderRadius: 20,
        padding: 10,
    },
    off: {
        backgroundColor: 'rgb(119, 100, 107)',
        borderRadius: 20,
        padding: 10,
    },
    state: {
        backgroundColor: 'rgb(52, 49, 59)',
        borderRadius: 10,
        padding: 10,
    },
    input: {
        borderRadius: 20,
        borderWidth: 1,
        width: 70,
        height: 40,
        textAlign: 'center',
    },
    submitButton: {
        borderColor: 'chocolate',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: 'rgb(242, 158, 98)',
        padding: 5,
    },
    colordss: {
        backgroundColor: 'rgb(59, 51, 54)',
        color: 'rgb(242, 158, 98)',
    },
});
