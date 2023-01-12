//NOT IN USE
import React from "react";
import { TouchableOpacity, Button, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
interface props {
  isRecording: Boolean;
}
const EndMarker = (props: props) => {
  const isRecording = props.isRecording;

  const showMarker = () => {
    return (
      <TouchableOpacity
        onPress={() => console.log("Race end")}
        style={styles.centre}
      >
        <MaterialCommunityIcons name="rectangle" size={80} color="white" />
        <Text style={styles.text}>End</Text>
      </TouchableOpacity>
    );
  };
  return isRecording ? showMarker() : null;
};
const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 30,
    position: "absolute",
    paddingTop: 20,
    // backgroundColor: "black",
  },
  centre: {
    alignItems: "center",
  },
});

export default EndMarker;
//NOT IN USE
