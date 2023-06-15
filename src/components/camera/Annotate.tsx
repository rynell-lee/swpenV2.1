import React from "react";
import { TouchableOpacity, Button, StyleSheet, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View } from "native-base";

interface props {
  isRecording: Boolean;
}

//function to return to home screen
const ExitMarker = (props: props) => {
  const isRecording = props.isRecording;
  const navigation = useNavigation<any>();

  const showMarker = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Entypo name="cross" size={80} color="white" />
      </TouchableOpacity>
    );
  };
  return isRecording ? null : showMarker();
};

export default ExitMarker;
