// home screen code, 3 main icons

import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { NavigatorProps } from "../../App";
import { Gesture } from "react-native-gesture-handler";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";

import {
  distancePicker,
  PoolLengthPicker,
} from "../components/metadata/Pickers";
import { useNavigation } from "@react-navigation/native";
const HomeScreen = () => {
  //modal toggling
  const navigation = useNavigation<any>();
  const [isModalVisible, setModalVisible] = useState<any>(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //default parameters for modal
  const [length, setLength] = useState<any>("50M");
  const [distance, setDistance] = useState<any>("50M");

  const eventData = {
    length: length,
    distance: distance,
  };

  //generate data object
  const [dataObj, setDataObj] = useState<any>();
  const generateDataObj = () => {
    setDataObj({
      id: Math.floor(Math.random() * 99999),
      Category: false,
      "Pool Length": false,
      "Type of race": false,
      // // Round: "Training",
      // Name: "",
    });
  };

  return (
    <View style={styles.view}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("Camera")
            toggleModal();
          }}
        >
          <Entypo name="video-camera" size={200} color="black" />
          <Text style={styles.label}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Annotation")}>
          <FontAwesome5 name="swimmer" size={200} color="black" />
          <Text style={styles.label}>Annotation</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ChartsReview")}>
          <AntDesign name="linechart" size={200} color="black" />
          <Text style={styles.label}>Statistics</Text>
        </TouchableOpacity>
        <Button title="test" onPress={() => navigation.navigate("Test")} />
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        backdropColor={"#00000080"}
        onBackdropPress={toggleModal}
      >
        <View style={styles.box}>
          <View style={styles.modalBox}>
            <Text style={styles.question}>Select pool length</Text>
            {PoolLengthPicker(length, setLength)}
            <Text style={styles.question}>Select event</Text>
            {distancePicker(distance, setDistance)}

            <TouchableOpacity
              onPress={() => {
                toggleModal();
                // console.log(length, distance);
                navigation.navigate("Camera", eventData);
              }}
            >
              <Text style={styles.done}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "red",
    alignSelf: "center",
  },
  view: {
    flex: 1,
    // flexDirection: "row",
    // alignItems: "stretch",
  },
  icons: {
    paddingBottom: 100,
  },
  scroll: {
    justifyContent: "space-around",
    flexDirection: "row",
    // alignItems: "center",
    paddingTop: 200,
  },
  headers: {
    fontSize: 30,
    paddingBottom: 100,
  },
  label: {
    color: "#333",
    fontSize: 36,
    textAlign: "center",
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: 50,
    // position: "absolute",
  },
  modalBox: {
    // position: "absolute",
    padding: 10,
    // paddingLeft: 100,
    // flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    opacity: 1,
    width: 250,
    height: 250,
  },
  done: {
    fontSize: 20,
    alignSelf: "center",
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    // paddingLeft: 200,/
  },
});

export default HomeScreen;
