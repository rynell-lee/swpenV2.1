import React, { useState, useEffect, useRef, ReactNode } from "react";
import { Text, View, TouchableOpacity, Button, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import eventJson from "../../jsons/events.json";

interface props {
  isRecording: Boolean;
  length: string;
  i: number;
  setI: Function;
  startRace: Boolean;
  setStartRace: Function;
  breakOut: Boolean;
  setBreakOut: Function;
  timeInterval: any;
  setTimeInterval: Function;
  setStart: Function;
  setNow: Function;
  now: number;
  start: number;
  setLapArray: Function;
  lapArray: any[];
  course: string;
  distance: string;
  distArray: string[];
}
const DistanceMarker = (props: props) => {
  const isRecording = props.isRecording;
  const length = props.length;
  const startRace = props.startRace;
  const setStartRace = props.setStartRace;
  const breakOut = props.breakOut;
  const setBreakOut = props.setBreakOut;
  const setLapArray = props.setLapArray;
  const lapArray = props.lapArray;
  const course = props.course;
  const distance = props.distance;
  const eJson: any = eventJson;
  // const distArray = props.distArray;

  // console.log(course);
  // console.log(distance);
  // console.log(distArray);
  // console.log(dataObj);
  const [data, SetData] = useState<string>(length);
  // const [start, setStart] = useState<Boolean>(false);
  // const [breakOut, setBreakOut] = useState<Boolean>(false);
  const [dist, setDist] = useState<Array<any>>();
  const [current, setCurrent] = useState<any>();
  // const [i, setI] = useState<number>(0);
  const i = props.i;
  const setI = props.setI;

  //setting distances for respective pool length
  useEffect(() => {
    setCurrent(dist ? dist[0] : null);
    // if (data === "Short Course") {
    //   setDist([1, 2, 3, 4]);
    // } else {
    //   setDist([1, 2, 3, 4, 5]);
    // }
    setDist(eJson[course][distance]);
  }, []);

  //states for timers
  const setStart = props.setStart;
  const start = props.start;
  const setNow = props.setNow;
  const now = props.now;
  const timeInterval = props.timeInterval;
  const setTimeInterval = props.setTimeInterval;

  //format time
  const timer = now - start;
  const duration = moment.duration(timer);
  const pad = (n: any) => (n < 10 ? "0" + n : n);
  const miliseconds = Math.floor(duration.milliseconds() / 10);
  // const timeRecorded = `${pad(duration.minutes())}:${pad(
  //   duration.seconds()
  // )}:${pad(miliseconds)}`;
  const timeRecorded = `${pad(duration.hours())}:${pad(
    duration.minutes()
  )}:${pad(duration.seconds())}`;

  const startTimer = () => {
    const now = new Date().getTime();
    setStart(now);
    setNow(now);
    setTimeInterval(
      setInterval(() => {
        setNow(new Date().getTime());
      }, 1000)
    );
    // return stopwatch;
    // setCurrent(dist ? dist[0] : null);
    // setDist(distArray);
    setDist(eJson[course][distance]);
  };
  const stopTimer = () => {
    clearInterval(timeInterval);
    setStart(0);
    setNow(0);
  };

  const changeDistance = () => {
    setI(i + 1);
    if (dist != undefined) {
      setCurrent(dist[i]);
    }
    // if (current == "END") {
    //   setCurrent("END");
    // }
  };

  const raceStart = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setStartRace(true);
          startTimer();
          console.log(`Race started`);
          setLapArray([...lapArray, ["Start", timeRecorded]]);
        }}
      >
        <AntDesign name="playcircleo" size={80} color="white" />
      </TouchableOpacity>
    );
  };

  const out = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setBreakOut(true);
          setI(0);
          changeDistance();
          setLapArray([...lapArray, ["Breakout", timeRecorded]]);
          if (dist != undefined) setCurrent(dist[i]);
          // reset();
        }}
      >
        <MaterialIcons name="pool" size={80} color="white" />
      </TouchableOpacity>
    );
  };

  const marker = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            console.log("distance: ", current);
            changeDistance();
            setLapArray([...lapArray, [`${current}M`, timeRecorded]]);
          }}
        >
          <View style={styles.centre}>
            <FontAwesome5 name="map-marker" size={80} color="white" />
            <Text style={styles.text}>{current}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            stopTimer();
            setLapArray([...lapArray, ["End", timeRecorded]]);
            console.log(`Race ended`);
            console.log(lapArray);
          }}
        >
          <View style={styles.centre}>
            <MaterialCommunityIcons name="rectangle" size={80} color="white" />
            <Text style={styles.end}>End</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const outOrMarker = () => {
    return breakOut ? marker() : out();
  };

  const options = () => {
    if (startRace) {
      return outOrMarker();
    } else {
      return raceStart();
    }
  };

  return isRecording ? options() : null;
};
const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 30,
    position: "absolute",
    paddingTop: 10,
    // backgroundColor: "black",
  },
  centre: {
    alignItems: "center",
  },
  end: {
    color: "black",
    fontSize: 30,
    position: "absolute",
    paddingTop: 20,
  },
});

export default DistanceMarker;
