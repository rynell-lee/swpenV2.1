import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import {
  NavigationContainer,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import BarCharts from "../components/charts/BarChart";
import MyTable from "../components/charts/Table";
import LineCharts from "../components/charts/LineChart";
import ViewShot, { CaptureOptions } from "react-native-view-shot";
import {
  viewShotRef,
  showShareOptions,
  saveToMediaLibrary,
  saveObjectAsCSV,
} from "../components/charts/sharingFunctions";
import RNFS from "react-native-fs";
import Metadata from "../components/charts/Metadata";
import Modal from "react-native-modal";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";

//@ts-ignore
import Papa from "papaparse";

interface CsvData {
  table: string[];
  x: number[];
  y: number[];
}

interface CsvObject {
  [key: string]: CsvData;
}

const readCSVFromLocal = async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
      //   copyTo: "cachesDirectory",
    });
    // console.log(res);

    const fileContent = await RNFS.readFile(res[0].uri, "utf8");
    const lines = fileContent.split("\n");
    const result: any = {};
    let currentObj: any;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        if (
          line === "DT" ||
          line === "VD" ||
          line === "SR" ||
          line === "SC" ||
          line === "DPS"
        ) {
          currentObj = {
            table: [],
            x: [],
            y: [],
          };
          result[line] = currentObj;
        } else {
          const values = line.split(",");
          currentObj.table.push([values[0], values[1]]);
          currentObj.x.push(parseFloat(values[2]));
          currentObj.y.push(parseFloat(values[3]));
        }
      }
    }

    // Remove the first element of each array
    for (const key in result) {
      if (result.hasOwnProperty(key)) {
        result[key].table = result[key].table.slice(1);
        result[key].x = result[key].x.slice(1);
        result[key].y = result[key].y.slice(1);
      }
    }
    // console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
// const handleLoadCSV = async () => {
//   const myCSVData = await readCSVFromLocal();
//   return myCSVData
// };

//convert string to seconds
const timeToSeconds = (timeString: string): number => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  return totalSeconds;
};
//offset time function
const getStartTime = (data: any) => {
  const startTime = data[0]["time"];
  const startTimeSec = timeToSeconds(startTime);
  // console.log(startTime);
  console.log(startTimeSec);
  return startTimeSec;
};

//re-arrange lap data

const lapData = (data: any) => {
  const startTime = getStartTime(data);
  const newData = data.slice(2);
  console.log(newData);
  const newArrayObj: any = [];
  const newArray: any = [];
  const xValues: any = [];
  const yValues: any = [];
  newData.map((x: any) => {
    const seconds = timeToSeconds(x["time"]) - startTime;
    newArrayObj.push({ distance: x["marker"], time: seconds });
    newArray.push([x["marker"], seconds]);
    xValues.push(x["marker"]);
    yValues.push(seconds);
  });
  console.log(newArrayObj);
  console.log(newArray);
  return [newArrayObj, newArray, xValues, yValues];
};

const createPairs = (arr1: any, arr2: any) => {
  let pairs1 = [];
  arr1.unshift(0);
  for (let i = 0; i < arr1.length - 1; i++) {
    pairs1.push(arr1[i] + "-" + arr1[i + 1]);
  }

  let pairs2 = [];
  arr2.unshift(0);
  for (let i = 0; i < arr2.length - 1; i++) {
    pairs2.push([arr2[i], arr2[i + 1]]);
  }

  let differences = pairs2.map((pair) => pair[1] - pair[0]);

  let grouped = [];

  for (let i = 0; i < Math.min(pairs1.length, differences.length); i++) {
    grouped.push([pairs1[i], differences[i]]);
  }

  return grouped;
};

const velDistArr = (arr: any) => {
  for (let i = 0; i < arr.length; i++) {
    let [rangeStr, divisor] = arr[i];
    let [start, end] = rangeStr
      .split("-")
      .map((str: string) => parseInt(str.replace("M", ""), 10));
    let difference = end - start;
    let quotient = difference / divisor;
    arr[i][1] = quotient.toFixed(2);
  }
  return arr;
};

const vdXY = (arr: any) => {
  let firstElements = [];
  let secondElements = [];

  for (let i = 0; i < arr.length; i++) {
    firstElements.push(arr[i][0]);
    secondElements.push(parseFloat(arr[i][1]));
  }

  return [firstElements, secondElements];
};

//takes in yValues(time) and strokes
const getSRY = (times: any, strokes: any) => {
  const segmentedTimings = [];

  for (let i = 1; i < times.length; i++) {
    const diff = times[i] - times[i - 1];
    segmentedTimings.push(diff);
  }

  const strokesOnly: any = Object.values(strokes).slice(1);
  // console.log(strokesOnly);
  //calculate stroke rate
  const resultMin = [];
  const resultSec = [];
  for (let i = 0; i < strokesOnly.length && i < segmentedTimings.length; i++) {
    const quotient = (strokesOnly[i] / segmentedTimings[i]) * 60;
    const qSec = strokesOnly[i] / segmentedTimings[i]; // to get per minute
    resultMin.push(quotient);
    resultSec.push(qSec);
  }

  //calculate stroke count is just strokes..?

  return [resultMin, resultSec];
};

const combineArr = (arr: any, newArr: any) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const nestedArr = [...arr[i]]; // create a copy of the nested array
    const newValue = newArr[i]; // get the new value for this nested array
    nestedArr[1] = newValue; // replace the second element with the new value
    result.push(nestedArr);
  }
  return result;
};

const getDPS = (vel: any, srSec: any) => {
  const result = [];
  for (let i = 0; i < vel.length && i < srSec.length; i++) {
    const quotient = vel[i] / srSec[i];
    result.push(parseFloat(quotient.toFixed(2)));
  }
  return result;
};

//tables require nested arrays
//line chart require 2 sets of arrays

//this screen is for uploading csv files and doing chart comparison

const ChartsReviewScreen = ({ route }: any) => {
  const navigation = useNavigation<any>();
  //   const { strokes, laps } = route.params;
  const testStrokes = {
    //take note
    "15M": 10,
    "20M": 9,
    "25M": 6,
    "40M": 7,
    "45M": 7,
    "50M": 6,
  };
  const [csv, setCsv] = useState<any>();
  const handleLoadCSV = async () => {
    const myCSVData = await readCSVFromLocal();
    setCsv(myCSVData);
  };

  let xValues;
  let yValues;
  let newArray;
  let VDarr;
  let vdX;
  let vdY;
  let srY;
  let srArr;
  let srX;
  let scY;
  let scArr;
  let dpsY;
  let dpsArr;
  if (csv !== undefined) {
    xValues = csv.DT.x;
    // console.log(xValues);
    yValues = csv.DT.y;
    newArray = csv.DT.table;
    console.log(newArray);

    //x values: distances, y values: time in seconds
    //vdx: distance range, vdy: velocity
    VDarr = csv.VD.table;
    vdX = csv.VD.x;
    vdY = csv.VD.y;
    //stroke rate table: VDarr but no 0M - first distance, chart: vdx without 0-first, yvalue new calculation
    srY = csv.SR.y;
    //  srArr = VDarr.slice(1)// arr
    srArr = csv.SR.table;
    srX = csv.SR.x;
    //  console.log(srArr);
    // console.log(srY);

    //stroke count: x-distance, y-count. table: VDAarr.slice + SC (usec combineArr), chart: srX, SCY (to build)
    scY = csv.SC.y;
    scArr = csv.SC.table;

    //dps: vel/srs = dist/str. table: VDArr.slice + dps, chart: srx, dpsY (to build)
    // use vdy (velocity arr) and srSec
    dpsY = csv.DPS.y;
    dpsArr = csv.DPS.table;
  }

  // const obj = {
  //   DT: {
  //     table: [1, 2, 3],
  //     x: [4, 5, 6],
  //     y: [7, 8, 9],
  //   },
  //   VD: {
  //     table: [3, 2, 1],
  //     x: [6, 5, 4],
  //     y: [9, 8, 7],
  //   },
  // };
  return (
    // <View>
    //   <Text>new charts</Text>
    //   <Button title="check data" onPress={handleLoadCSV} />
    // </View>

    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <Button title="check data" onPress={handleLoadCSV} /> */}
      {csv === undefined ? null : (
        <ScrollView style={{ backgroundColor: "white" }}>
          <ViewShot
            ref={viewShotRef}
            style={{ flex: 1, backgroundColor: "white" }}
          >
            <View style={styles.container}>
              <Text style={styles.title}>Statistics generation</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
                style={styles.exitButton}
              >
                <Text style={styles.exitButtonText}>Exit</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.containerSection}>
              <Text style={styles.titleSection}>Distance - Time</Text>
            </View>
            <View style={styles.DTchart}>
              <MyTable
                data={newArray}
                headers={["Distance (M)", "Time (seconds)"]}
              />
              <LineCharts
                x={xValues}
                y={yValues}
                xLabel={"Distance(m)"}
                yLabel={"Time(s)"}
              />
            </View>
            <View style={styles.containerSection}>
              <Text style={styles.titleSection}>Velocity - Distance</Text>
            </View>
            <View style={styles.DTchart}>
              <MyTable
                data={VDarr}
                headers={["Distance (M)", "Velocity (m/s)"]}
              />
              <LineCharts
                x={vdX}
                y={vdY}
                xLabel={"Distance(m)"}
                yLabel={"Velocity (m/s)"}
              />
            </View>
            <View style={styles.containerSection}>
              <Text style={styles.titleSection}>Stroke rate</Text>
            </View>
            <View style={styles.DTchart}>
              <MyTable
                data={srArr}
                headers={["Distance (M)", "Stroke rate (st/min)"]}
              />
              <LineCharts
                x={srX}
                y={srY}
                xLabel={"Distance(m)"}
                yLabel={"Stroke Rate (st/min)"}
              />
            </View>
            <View style={styles.containerSection}>
              <Text style={styles.titleSection}>Stroke count</Text>
            </View>
            <View style={styles.DTchart}>
              <MyTable
                data={scArr}
                headers={["Distance (M)", "Stroke count"]}
              />
              <LineCharts
                x={srX}
                y={scY}
                xLabel={"Distance(m)"}
                yLabel={"Stroke count"}
              />
            </View>

            <View style={styles.containerSection}>
              <Text style={styles.titleSection}>Distance Per Stroke</Text>
            </View>
            <View style={styles.DTchart}>
              <MyTable
                data={dpsArr}
                headers={["Distance (M)", "DPS (m/str)"]}
              />
              <LineCharts
                x={srX}
                y={dpsY}
                xLabel={"Distance(m)"}
                yLabel={"DPS(m/str)"}
              />
            </View>

            {/* <BarCharts data={newDataObj} /> */}
          </ViewShot>
        </ScrollView>
      )}

      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.button} onPress={saveToMediaLibrary}>
          <Text style={styles.buttonText}>Save to Media Library</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={showShareOptions} style={styles.button}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLoadCSV} style={styles.button}>
          <Text style={styles.buttonText}>Load CSV data</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => saveObjectAsCSV(csvData)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Export as CSV</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={handleShowQuestionnaire}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Metadata</Text> */}
        {/* <Metadata
            visible={showQuestionnaire}
            onClose={handleCloseQuestionnaire}
          /> */}
        {/* </TouchableOpacity> */}
      </View>
      {/* <Modal
        isVisible={showQuestionnaire}
        onBackdropPress={handleCloseQuestionnaire}
        backdropColor="#f5f5f5"
        backdropOpacity={0.1}
      >
        <Metadata
          isVisible={showQuestionnaire}
          onClose={handleCloseQuestionnaire}
        />
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  DTchart: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#4b7bec",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  container: {
    backgroundColor: "#2196F3",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  containerSection: {
    backgroundColor: "#F2F2F2",
    height: 40,
    justifyContent: "center",
    paddingLeft: 10,
  },
  titleSection: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  exitButton: {
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    position: "absolute",
    right: 20,
  },
  exitButtonText: {
    color: "#2196F3",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default ChartsReviewScreen;
