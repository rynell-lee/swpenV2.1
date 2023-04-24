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
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import MdModal1 from "../components/metadata/MdModal1";
import { AntDesign } from "@expo/vector-icons";

const HomeScreen = ({ navigation }: NavigatorProps) => {
  //modal toggling
  const [isModalVisible, setModalVisible] = useState<any>(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      console.log("tap");
    });

  const data = {
    csvData: [1, 2, 3],
  };
  return (
    <View style={styles.view}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* <Text style={styles.headers}>Home Screen</Text> */}
        {/* <TouchableOpacity
          onPress={() => {
            toggleModal();
            generateDataObj();
          }}
        >
          <FontAwesome5
            name="swimmer"
            size={200}
            style={styles.icons}
            color="black"
          />
          <MdModal1
            visible={isModalVisible}
            toggle={toggleModal}
            picker={{ condition: true, option: 1 }}
            obj={dataObj}
            navigation={navigation.navigate}
          />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
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
        {/* <TouchableOpacity onPress={() => navigation.navigate("Scrub")}>
          <FontAwesome
            name="newspaper-o"
            size={200}
            style={styles.icons}
            color="black"
          />
        </TouchableOpacity> */}
        {/* <Button title="Camera" onPress={() => navigation.navigate("Camera")} />
        <Button
          title="Loading"
          onPress={() => navigation.navigate("Loading")}
        />
        <Button title="Test" onPress={() => navigation.navigate("Test")} /> */}
        {/* <GestureHandlerRootView>
          <GestureDetector gesture={Gesture.Exclusive(singleTap)}>
            <View style={styles.ball} />
          </GestureDetector>
        </GestureHandlerRootView> */}
      </ScrollView>
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
});

export default HomeScreen;
