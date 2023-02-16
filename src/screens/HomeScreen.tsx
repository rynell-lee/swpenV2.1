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
  return (
    <View style={styles.view}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <Text style={styles.headers}>Home Screen</Text>
        <TouchableOpacity
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
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          <Entypo name="video-camera" size={200} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Annotation")}>
          <Ionicons
            name="cloud-sharp"
            size={200}
            style={styles.icons}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Scrub")}>
          <FontAwesome
            name="newspaper-o"
            size={200}
            style={styles.icons}
            color="black"
          />
        </TouchableOpacity>
        <Button title="Camera" onPress={() => navigation.navigate("Camera")} />
        <Button
          title="Loading"
          onPress={() => navigation.navigate("Loading")}
        />
        <Button title="Test" onPress={() => navigation.navigate("Test")} />
        <GestureHandlerRootView>
          <GestureDetector gesture={Gesture.Exclusive(singleTap)}>
            <View style={styles.ball} />
          </GestureDetector>
        </GestureHandlerRootView>
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
  },
  icons: {
    paddingBottom: 100,
  },
  scroll: {
    justifyContent: "center",

    alignItems: "center",
  },
  headers: {
    fontSize: 30,
    paddingBottom: 100,
  },
});

export default HomeScreen;
