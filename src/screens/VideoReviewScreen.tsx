//code to review video captured by camera
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

type props = {
  video: String;
  name: String;
  route: {};
  params: {};
};
const VideoReviewScreen = (props: props) => {
  const navigation = useNavigation<any>();
  const [data, setData] = useState<object>({});
  const [id, setId] = useState<string>();
  //reading data passed from camera screen
  const [video, setVideo] = useState<string>(props.route.params.uri);
  const key = props.route.params.key;

  //function to store data to asyncstorage

  const storeData = async (data: {}, key: any) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
      // alert("data saved");
    } catch (e) {
      // saving error
    }
  };

  const getData = async (key: any) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`${key}`);
      // console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  //function to delete data from async storage
  const removeData = async (key: any) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  };

  useEffect(() => {
    getData(key).then((data) => {
      setData({ time: data, path: video });
      removeData(key); //asuming this is working, used to delete keys to prevent duplicates
    });
    //permissions
    const checkAndRequestPermissions = async () => {
      const { status } = await MediaLibrary.getPermissionsAsync();

      if (status !== "granted") {
        const { status: newStatus } =
          await MediaLibrary.requestPermissionsAsync();

        if (newStatus !== "granted") {
          console.log("Permissions denied. Unable to create asset.");
        }
      }
    };

    // Call the function to check and request permissions
    checkAndRequestPermissions();

    //creates a unique id for saving purposes

    MediaLibrary.createAssetAsync(video)
      .then((asset) => {
        const id = asset.id;
        setId(id);
        console.log("id generated: ", id);
      })
      .catch((err) => console.log("err creating asset: ", err));
  }, []);

  //function to discard video and go back to home screen
  const discard = () => {
    setVideo("undefined");
    setData({});
    navigation.navigate("Home");
  };

  //function to save video data
  const saveVideo = () => {
    MediaLibrary.saveToLibraryAsync(video);
    storeData(data, id);

    console.log(video);
  };
  return (
    <View style={styles.container}>
      <View style={styles.texts}>
        <Button title="Discard" onPress={() => discard()} />
        <Button
          title="Save"
          onPress={() => {
            saveVideo();
            console.log("data", data);
            // const haveUri = "false"
            navigation.navigate("Home");
          }}
        />
      </View>
      <Video
        style={styles.video}
        source={{ uri: video }}
        useNativeControls
        resizeMode="contain"
        isLooping
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
  texts: {
    // backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  discard: {
    // left: 20,
    // fontSize: 18,
    // alignSelf: "flex-start",
  },
  annotate: {
    // position: "relative",
    // right: 20,
    // bottom: 10,
    // fontSize: 18,
    // alignSelf: "flex-end",
  },
});

export default VideoReviewScreen;
