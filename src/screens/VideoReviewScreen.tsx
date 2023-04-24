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
import * as ImagePicker from "expo-image-picker";

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
  const [video, setVideo] = useState<string>(props.route.params.uri);
  const key = props.route.params.key;

  const storeData = async (data: {}, key: any) => {
    try {
      const jsonValue = JSON.stringify(data);
      // console.log("storing", jsonValue);
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
  }, []);

  const discard = () => {
    setVideo("undefined");
    setData({});
    navigation.navigate("Camera");
  };

  const saveVideo = () => {
    MediaLibrary.saveToLibraryAsync(video);
    MediaLibrary.createAssetAsync(video)
      .then((asset) => {
        console.log(asset.id);
        const id = asset.id;
        storeData(data, id);
        setId(id);
      })
      .catch((err) => console.log(err));

    //alter storage data
    console.log(video);
    // storeData(data, video); //key is video uri
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
            navigation.navigate("Camera");
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
