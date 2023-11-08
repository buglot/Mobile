import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import React, { useState, useEffect } from 'react';
import DateTimePicker from "@react-native-community/datetimepicker"
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabTimeNotifi from "./tabTimeNotification";
import { Button as Bb } from "react-native-paper";

export default function PageSetTime() {
    const [date, setDate] = useState(new Date());
    const [ModeFL, setMode] = useState(0);
    const [openTimeSetTime, setOpenTime] = useState(false);
    const [Firsttimeset, setFirstTime] = useState("00:00")
    const [Lasttimeset, setLastTime] = useState("23:59")
    const [DataListTimeSet, setDataListTimeSet] = useState(null)
    const [ONedit, setONedit] = useState(false)
    
    const ShowSettime = () => {
        return (<DateTimePicker
            value={date}
            mode="time"
            is24Hour={true}
            display="clock" onChange={AddTime} />)
    }
    const formatDateToTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    const AddTime = (event, selectedDate) => {
        setOpenTime(false)
        if (selectedDate) {
            if (!ModeFL) {
                setFirstTime(formatDateToTime(selectedDate))
            } else {
                setLastTime(formatDateToTime(selectedDate))
            }
        }
    }
    const AddTabSaveData = async () => {
        let updatedDataList = [];
        if (DataListTimeSet) {
            updatedDataList = [...DataListTimeSet, { F: Firsttimeset, L: Lasttimeset }];
        } else {
            updatedDataList = [{ F: Firsttimeset, L: Lasttimeset }];
        }
        await AsyncStorage.setItem('Notification', JSON.stringify(updatedDataList))
            .then(() => {

                setDataListTimeSet(updatedDataList);
            });
    }
    const deleteItemAtIndex = async (indexToDelete) => {
        const updatedDataList = DataListTimeSet.filter((item, index) => index !== indexToDelete);
        setDataListTimeSet(updatedDataList);
        if (updatedDataList.length === 0) {
            await AsyncStorage.removeItem('Notification')
            setDataListTimeSet(null);
        } else {
            await AsyncStorage.setItem('Notification', JSON.stringify(updatedDataList))
        }

    };
    useEffect(() => {
        AsyncStorage.getItem("Notification")
            .then(data => {
                if (data === null) {
                    setDataListTimeSet(null)
                } else {
                    const dataObject = JSON.parse(data);
                    setDataListTimeSet(dataObject)
                }

            })
    }, [setDataListTimeSet]);
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" animated={true} backgroundColor="#000814" />
            <View style={styles.boxtitle}>
                <Text style={styles.Texttilte}>Time Notifications</Text>
                <View style={styles.pageAdd}>
                    <TouchableOpacity style={styles.boxBtnAdd} onPress={() => { setMode(0); setOpenTime(true) }}>
                        <Text style={styles.textboxadd}>{Firsttimeset}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: "#c77dff", fontWeight: "bold" }}>TO</Text>
                    <TouchableOpacity style={styles.boxBtnAdd} onPress={() => { setMode(1); setOpenTime(true) }}>
                        <Text style={styles.textboxadd}>{Lasttimeset}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btnTime} onPress={() => { AddTabSaveData() }}>
                    <Text style={{ fontWeight: "bold" }}>
                        ADD TIME
                    </Text>
                </TouchableOpacity>
                {openTimeSetTime && <DateTimePicker
                    value={date}
                    mode="time"
                    is24Hour={true}
                    display="clock" onChange={AddTime} />}
                {DataListTimeSet &&
                    <View style={{ alignItems: "flex-end" }}>
                        <Bb onPress={() => setONedit(!ONedit)} icon={ONedit ? "close" : "clock-edit"} buttonColor={ONedit ? "#ff006e" : "#001d3d"} 
                        textColor={ONedit ? "black" : '#0077b6'} mode="elevated" style={{ borderRadius: 10, width: "30%", minHeight: 45 }}>{ONedit ? "Close Edit" : "Edit"}</Bb>
                    </View>
                }
            </View>
            <ScrollView style={styles.boxScoll}>

                {DataListTimeSet && DataListTimeSet.map((timeData, index) => (
                    <TabTimeNotifi key={index} index={index} First={timeData.F} Last={timeData.L} deleteItem={deleteItemAtIndex} delMode={ONedit} />
                ))}



            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            paddingTop: 50,
            backgroundColor: "#000814",
            flex: 1
        },
        boxtitle: {
            padding: 10,
            gap: 30,
            paddingBottom: 30
        },
        Texttilte: {
            color: "#c77dff",
            fontWeight: "900",
            fontSize: 23
        },
        btnTime: {
            height: 60,
            backgroundColor: "#0077b6",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10
        },
        boxScoll: {
            backgroundColor: "#001d3d",

        },
        boxBtnAdd: {
            width: "40%",
            height: 50,
            backgroundColor: "#001d3d",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10
        },
        pageAdd: {
            gap: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        textboxadd: {
            color: "#0077b6",
            fontWeight: "bold"
        }
    }
);