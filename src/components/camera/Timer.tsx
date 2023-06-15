//function to display timer and laps table
import React, { useState, useEffect, useRef, ReactNode } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";

interface props {
  now: number;
  start: number;
  isRecording: Boolean;
  lapArray: any[];
}
interface lap {
  distance: number;
  interval: any;
}

const Timer = (props: props) => {
  const lapArray = props.lapArray;
  const isRecording = props.isRecording;
  const now = props.now;
  const start = props.start;
  const timer = now - start;
  const duration = moment.duration(timer);
  const miliseconds = Math.floor(duration.milliseconds() / 10);
  const pad = (n: any) => (n < 10 ? "0" + n : n);

  //distance marking table
  const Lap = ({ distance, interval }: lap) => {
    return (
      <View style={styles.lap}>
        <Text style={styles.text}>{distance}</Text>
        <Text style={styles.text}>{interval}</Text>
      </View>
    );
  };

  const LapsTable = () => {
    return (
      <ScrollView style={styles.lapContainer} onScroll={() => {}}>
        {lapArray.map((item: any[], index) => {
          return <Lap distance={item[0]} interval={item[1]} key={index} />;
        })}
      </ScrollView>
    );
  };

  //timer
  const showTimer = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.text}>
            {pad(duration.hours())}:{pad(duration.minutes())}:
            {pad(duration.seconds())}
          </Text>
        </View>
        <LapsTable />
      </View>
    );
  };
  return isRecording ? showTimer() : null;
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 30,
  },
  container: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.5)",
    width: 150,
    height: 40,
    position: "absolute",
  },
  lapContainer: {
    backgroundColor: "rgba(0,0,0, 0.8)",
    width: 300,
    height: 250,
    marginLeft: 300,
    position: "absolute",
    // flex: 1,
  },
  lap: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "black",
    borderBottomWidth: 1,
    width: 300,
    height: 40,
  },
});

export default Timer;
// const LapsTable = () => {
//   return (
//     <FlatList
//       data={lapArray}
//       keyExtractor={(item) => item.index}
//       renderItem={({ item, index }) => {
//         return <Lap distance={item[0]} interval={item[1]} key={index} />;
//       }}
//       style={styles.lapContainer}
//       scrollEnabled={true}
//     />
//   );
// };
