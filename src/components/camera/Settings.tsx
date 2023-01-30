import React, { useState } from "react";
import { TouchableOpacity, Button, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RecordButton from "./Record";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Modal from "react-native-modal";

interface props {
  flash: Boolean;
  setFlash: Function;
  res: String;
  setRes: Function;
  isRecording: Boolean;
  audio: boolean;
  setAudio: Function;
  course: String;
  setCourse: Function;
  distance: String;
  setDistance: Function;
  toggleModal: Function;
}
const Settings = (props: props) => {
  const [flashSettings, setFlashSettings] = useState<Boolean>(false);
  // const [flash, setFlash] = useState<Boolean>(false);
  const [resSettings, setResSettings] = useState<Boolean>(false);
  const [showAudio, setShowAudio] = useState<Boolean>(true);
  const [showEvent, setShowEvent] = useState<Boolean>(true);
  // const [res, setRes] = useState<String>("FHD");
  const flash = props.flash;
  const setFlash = props.setFlash;
  const res = props.res;
  const setRes = props.setRes;
  const isRecording = props.isRecording;
  const audio = props.audio;
  const setAudio = props.setAudio;
  const course = props.course;
  const setCourse = props.setCourse;
  const distance = props.distance;
  const setDistance = props.setDistance;
  const toggleModal = props.toggleModal;

  //flash stuff
  const showFlashSettings = () => {
    setFlashSettings(!flashSettings);
  };

  const flashOption = () => {
    return (
      <View style={styles.options}>
        <TouchableOpacity
          onPress={() => {
            showFlashSettings();
            setFlash(false);
          }}
        >
          <Ionicons name="md-flash-off" size={50} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            showFlashSettings();
            setFlash(true);
          }}
        >
          <Ionicons name="md-flash" size={50} color="yellow" />
        </TouchableOpacity>
      </View>
    );
  };

  const singleFlash = () => {
    return (
      <View>
        <TouchableOpacity onPress={showFlashSettings}>
          {flash ? (
            <Ionicons
              name="md-flash"
              size={50}
              color="yellow"
              style={resSettings ? styles.hide : null}
            />
          ) : (
            <Ionicons
              name="md-flash-off"
              size={50}
              color="white"
              style={resSettings ? styles.hide : null}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  //resoluition stuff
  const showResSettings = () => {
    setResSettings(!resSettings);
    showAud();
    showEvt();
  };

  const resOptions = () => {
    return (
      <View style={styles.options}>
        <TouchableOpacity
          onPress={() => {
            showResSettings();
            setRes("HD");
          }}
        >
          <Text style={res == "HD" ? styles.currentRes : styles.resolution1}>
            HD
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            showResSettings();
            setRes("FHD");
          }}
        >
          <Text style={res == "FHD" ? styles.currentRes : styles.resolution1}>
            FHD
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            showResSettings();
            setRes("UHD");
          }}
        >
          <Text style={res == "UHD" ? styles.currentRes : styles.resolution1}>
            UHD
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const singleRes = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          showResSettings();
        }}
      >
        <Text style={flashSettings ? styles.hide : styles.resolution1}>
          {res}
        </Text>
      </TouchableOpacity>
    );
  };
  //audio
  const audioButton = () => {
    return audio ? (
      <TouchableOpacity onPress={() => setAudio(false)}>
        <Ionicons name="volume-high" size={50} color="white" />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={() => setAudio(true)}>
        <Ionicons name="volume-mute" size={50} color="white" />
      </TouchableOpacity>
    );
  };

  const showAud = () => {
    setShowAudio(!showAudio);
  };

  //pool length and distance

  const showEvt = () => {
    setShowEvent(!showEvent);
  };
  const event = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          toggleModal();
          // eventOptions();
        }}
      >
        <View style={styles.centre}>
          <Feather name="square" size={50} color="white" />
          <Text style={styles.distance}>{distance}</Text>
          <Text style={styles.event}>{course}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // const eventOptions = () => {
  //   return (
  //     <Modal
  //       isVisible={isModalVisible}
  //       backdropColor={"#00000080"}
  //       onBackdropPress={toggleModal}
  //     >
  //       <View style={styles.box}>
  //         <View style={styles.modalBox}>
  //           <Text>Test</Text>
  //         </View>
  //       </View>
  //     </Modal>
  //   );
  // };

  //display settings
  const showSettings = () => {
    return (
      <View style={styles.container}>
        {/* {flashSettings ? flashOption() : singleFlash()} */}
        {resSettings ? resOptions() : singleRes()}
        {showAudio ? audioButton() : null}
        {showEvent ? event() : null}
      </View>
    );
  };

  return isRecording ? null : showSettings();
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0, 0.5)",
    width: 60,
    height: 200,
    borderRadius: 60,
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 15,
    paddingTop: 15,
  },
  options: {
    backgroundColor: "black",
    width: 50,
    height: 200,
    borderRadius: 60,
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 15,
    paddingTop: 15,
  },
  resolution1: {
    fontSize: 24,
    color: "white",
  },
  currentRes: {
    fontSize: 24,
    color: "yellow",
  },
  hide: {
    opacity: 0,
  },
  distance: {
    fontSize: 10,
    color: "white",
    position: "absolute",
    marginTop: 12,
  },
  event: {
    fontSize: 8,
    color: "white",
    position: "absolute",
    marginTop: 26,
  },
  centre: {
    alignItems: "center",
  },
});

export default Settings;
