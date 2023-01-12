import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import moment from "moment";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface lap {
  distance: number;
  interval: any;
}
const TestScreen = () => {
  const [start, setStart] = useState<any>(0);
  const [now, setNow] = useState<any>(0);
  const [lapArray, setLapArray] = useState<Array<any>>([]);
  const [timeInterval, setTimeInterval] = useState<any>();
  const timer = now - start;
  const duration = moment.duration(timer);
  const seconds = Math.floor(duration.seconds() / 10);
  const pad = (n: any) => (n < 10 ? "0" + n : n);

  const startTimer = () => {
    const now = new Date().getTime();
    setStart(now);
    setNow(now);
    setTimeInterval(
      setInterval(() => {
        setNow(new Date().getTime());
      }, 100)
    );
    // return stopwatch;
  };

  const stopTimer = () => {
    clearInterval(timeInterval);
    setStart(0);
    setNow(0);
  };

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
      <ScrollView
        style={styles.lapContainer}
        onScroll={() => {
          console.log("scrolling");
        }}
      >
        {lapArray.map((item: any[], index) => {
          return <Lap distance={item[0]} interval={item[1]} key={index} />;
        })}
      </ScrollView>
    );
  };

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
  return (
    <View>
      <GestureHandlerRootView>
        <View style={styles.container}>
          <Text style={styles.text}>
            {pad(duration.hours())}:{pad(duration.minutes())}:
            {pad(duration.seconds())}
          </Text>
          <TouchableOpacity style={styles.button} onPress={startTimer}>
            <Text style={styles.text}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={stopTimer}>
            <Text style={styles.text}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setLapArray([...lapArray, [40, 4]]);
              // console.log(lapArray);
            }}
          >
            <Text style={styles.text}>Lap</Text>
          </TouchableOpacity>
        </View>
      </GestureHandlerRootView>
      <LapsTable />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 30,
    // position: "absolute",
    // paddingTop: 10,
    // backgroundColor: "black",
  },
  container: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.5)",
    width: 150,
    height: 50,
    // flex: 1,
    position: "absolute",
  },
  button: {
    // right: 300,
  },
  lapContainer: {
    // alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.5)",
    width: 500,
    height: 600,
    flex: 1,
    position: "absolute",
    alignSelf: "flex-end",
  },
  lap: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "black",
    borderBottomWidth: 1,
    width: 500,
    height: 40,
  },
});

export default TestScreen;
