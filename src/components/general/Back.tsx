import React from "react";
import { TouchableOpacity, Button, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface props {
  destination: String;
}
const BackMarker = (props: props) => {
  const navigation = useNavigation<any>();
  //   const destination = props.destination;

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
      <Ionicons name="arrow-back" size={60} color="white" />
    </TouchableOpacity>
  );
};

export default BackMarker;
