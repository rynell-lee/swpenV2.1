import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

interface props {
  laps: object;
  strokes: number;
  setStrokes: Function;
  strokeObj: any;
  setStrokeObject: Function;
}

const StrokeCounter = (props: props) => {
  const data = props.laps;
  const strokes = props.strokes;
  const setStrokes = props.setStrokes;
  const strokeObj = props.strokeObj;
  const setStrokeObj = props.setStrokeObject;

  const distances = data ? Object.keys(data).slice(2) : null;
  const [distance, setDistance] = useState<string>("");

  const options = (values: []) => {
    values.map((x) => {
      return <Picker.Item label={x} value={x} />;
    });
  };

  return (
    <View style={styles.counter}>
      <Picker
        style={styles.picker}
        selectedValue={distance}
        onValueChange={(itemValue, itemIndex) => setDistance(itemValue)}
      >
        {distances?.map((x) => {
          return <Picker.Item label={x} value={x} key={x} />;
        })}
      </Picker>
      <Text style={styles.text}>{strokes}</Text>

      <Button title="+" onPress={() => setStrokes(strokes + 1)} />

      <Button
        title="-"
        onPress={() => {
          if (strokes > 0) {
            setStrokes(strokes - 1);
          }
        }}
      />
      <Button
        title="Done"
        onPress={() => {
          setStrokes(0);
          setStrokeObj({ ...strokeObj, [distance]: strokes });
        }}
      />
      {/* <Button
        title="check"
        onPress={() => {
          console.log(strokeObj);
        }}
      /> */}
    </View>
  );
};

export default StrokeCounter;

const styles = StyleSheet.create({
  counter: {
    top: 1,
    marginTop: 20,
  },
  text: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    textAlign: "center",
  },
  picker: {
    backgroundColor: "yellow",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    // height: 10,
  },
});
