import React, { useState, useEffect, useRef, ReactNode } from "react";
import { Text, View, TouchableOpacity, Button, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  setLapArray: Function;
  lapArray: any[];
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
    // setCurrent(dist ? dist[0] : null);
    if (data === "Short Course") {
      setDist([
        15, 20, 25, 40, 45, 50, 65, 70, 75, 90, 95, 100, 115, 120, 125, 140,
        145, 150, 165, 170, 175, 190, 195, 200, 215, 220, 225, 240, 245, 250,
        265, 270, 275, 290, 295, 300, 315, 320, 325, 340, 345, 350, 365, 370,
        375, 390, 395, 400, 415, 420, 425, 440, 445, 450, 465, 470, 475, 490,
        495, 500, 515, 520, 525, 540, 545, 550, 565, 570, 575, 590, 595, 600,
        615, 620, 625, 640, 645, 650, 665, 670, 675, 690, 695, 700, 715, 720,
        725, 740, 745, 750, 765, 770, 775, 790, 795, 800, 815, 820, 825, 840,
        845, 850, 865, 870, 875, 890, 895, 900, 915, 920, 925, 940, 945, 950,
        965, 970, 975, 990, 995, 1000, 1015, 1020, 1025, 1040, 1045, 1050, 1065,
        1070, 1075, 1090, 1095, 1100, 1115, 1120, 1125, 1140, 1145, 1150, 1165,
        1170, 1175, 1190, 1195, 1200, 1215, 1220, 1225, 1240, 1245, 1250, 1265,
        1270, 1275, 1290, 1295, 1300, 1315, 1320, 1325, 1340, 1345, 1350, 1365,
        1370, 1375, 1390, 1395, 1400, 1415, 1420, 1425, 1440, 1445, 1450, 1465,
        1470, 1475, 1490, 1495, 1500,
      ]);
    } else {
      setDist([
        115, 125, 135, 145, 150, 165, 175, 185, 195, 200, 215, 225, 235, 245,
        250, 265, 275, 285, 295, 300, 315, 325, 335, 345, 350, 365, 375, 385,
        395, 400, 415, 425, 435, 445, 450, 465, 475, 485, 495, 500, 515, 525,
        535, 545, 550, 565, 575, 585, 595, 600, 615, 625, 635, 645, 650, 665,
        675, 685, 695, 700, 715, 725, 735, 745, 750, 765, 775, 785, 795, 800,
        815, 825, 835, 845, 850, 865, 875, 885, 895, 900, 915, 925, 935, 945,
        950, 965, 975, 985, 995, 1000, 1015, 1025, 1035, 1045, 1050, 1065, 1075,
        1085, 1095, 1100, 1115, 1125, 1135, 1145, 1150, 1165, 1175, 1185, 1195,
        1200, 1215, 1225, 1235, 1245, 1250, 1265, 1275, 1285, 1295, 1300, 1315,
        1325, 1335, 1345, 1350, 1365, 1375, 1385, 1395, 1400, 1415, 1425, 1435,
        1445, 1450, 1465, 1475, 1485, 1495, 1500,
      ]);
    }
  }, []);

  //states for timers
  const setStart = props.setStart;
  const setNow = props.setNow;
  const timeInterval = props.timeInterval;
  const setTimeInterval = props.setTimeInterval;
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

  const changeDistance = () => {
    setI(i + 1);
    if (dist != undefined) setCurrent(dist[i]);
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
            setLapArray([...lapArray, [2, 2]]);
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
            console.log(`Race ended`);
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
