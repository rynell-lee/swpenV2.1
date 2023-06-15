import React from "react";
import { View, StyleSheet, Button, Alert } from "react-native";

//alerts users
const showAlert = () =>
  Alert.alert(
    "Invalid entries!",
    "Please fill in all details before proceeding.",
    [
      {
        text: "Ok",
        // onPress: () => Alert.alert("Cancel Pressed"),
        style: "cancel",
      },
    ],
    {
      cancelable: true,
    }
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default showAlert;
