import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  forwardRef,
} from "react";
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

interface props {
  laps: any;
  setSliderValue: Function;
  setPaused: Function;
  setDistance: Function;
  setCurrentTime: Function;
  setJustJumped: Function;
  lapData: any;
}
interface lap {
  distance: number;
  interval: any;
}

const LapTable = forwardRef((props: props, ref) => {
  const laps = props.laps;
  const setSliderValue = props.setSliderValue;
  const setPaused = props.setPaused;
  const setDistance = props.setDistance;
  const setCurrentTime = props.setCurrentTime;
  const setJustJumped = props.setJustJumped;
  const data = props.lapData;
  const videoRef = ref;

  const timerConversion = (time: string) => {
    const numbers = time.split(":");
    const minutes = parseInt(numbers[1]);
    const seconds = parseInt(numbers[2]);

    const minutesToSeconds = minutes * 60;
    const returnedTime = minutesToSeconds + seconds;
    return returnedTime;
  };

  const Lap = ({ distance, interval }: lap) => {
    const convertedSeconds = timerConversion(interval);
    return (
      <View style={styles.lap}>
        <TouchableOpacity
          onPress={() => {
            setSliderValue(convertedSeconds);
            setPaused(true);
            setDistance(distance);
            setCurrentTime(convertedSeconds);
            setJustJumped(true);
            videoRef?.current.seek(convertedSeconds);
          }}
        >
          <Text style={styles.text}>{`${distance}: ${interval}`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.marker}
        renderItem={({ item }) => (
          <Lap distance={item.marker} interval={item.time} />
        )}
        style={styles.lapContainer}
        scrollEnabled={true}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  lapContainer: {
    backgroundColor: "rgba(0,0,0, 0.5)",
    // backgroundColor: "black",
    width: 310,
    height: 220,
    // marginLeft: 300,
    // top: 1,
    position: "absolute",
    marginTop: 20,
    // flex: 1,
  },
  lap: {
    flexDirection: "row",
    // justifyContent: "space-between",
    borderColor: "black",
    borderBottomWidth: 1,
    width: 300,
    height: 35,
  },
  text: {
    color: "yellow",
    fontSize: 20,
    // position: "absolute",
    // paddingTop: 10,
    // backgroundColor: "black",
  },
});
export default LapTable;

//process the lap object
// const formatObj = (obj: any) => {
//   let arr = [];
//   for (const marker in obj) {
//     let newObj: any = {};
//     newObj["marker"] = marker;
//     newObj["time"] = obj[marker];
//     arr.push(newObj);
//   }
//   const length = arr.length;
//   // return [arr[length - 1], arr[length - 2], ...arr].splice(0, length);
//   return arr;
// };

// // const data = formatObj(laps);
