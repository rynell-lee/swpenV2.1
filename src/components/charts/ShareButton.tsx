//code for sharing data
import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import ViewShot, { CaptureOptions } from "react-native-view-shot";
import RNFS from "react-native-fs";
import Share from "react-native-share";
import * as MediaLibrary from "expo-media-library";
//@ts-ignore
import RNHTMLtoPDF from "react-native-html-to-pdf";

const imageUrl = "https://picsum.photos/200";

const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};
const viewShotRef: React.RefObject<ViewShot> = React.createRef();
const ShareButton = () => {
  //function for screenshot
  const captureScreen = async () => {
    try {
      const uri = await viewShotRef?.current.capture();
      const timestamp = new Date().toISOString();
      const path = `${RNFS.DocumentDirectoryPath}/${timestamp}.png`;
      await RNFS.moveFile(uri, path);

      return path;
    } catch (error) {
      console.error("Error capturing screen:", error);
    }
  };

  //function to save screenshot
  const saveToMediaLibrary = async () => {
    try {
      const path = await captureScreen();
      if (!path) return;

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("User cancelled media library permissions");
        alert("Media Library permission is required to save the image.");
        return;
      }

      const asset = await MediaLibrary.createAssetAsync(`file://${path}`);

      const albumName = "MyAppScreenshots"; // You can choose a custom name for your album
      const album = await MediaLibrary.getAlbumAsync(albumName);

      if (!album) {
        await MediaLibrary.createAlbumAsync(albumName, asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      console.log("Image saved to media library");
    } catch (err) {
      if (
        isError(err) &&
        err.message === "User didn't grant write permission to requested files."
      ) {
        console.log("User denied write permission to requested files");
      } else {
        console.error("Error saving image:", err);
      }
    }
  };

  const shareImage = async () => {
    const path = await captureScreen();
    if (!path) return;

    const shareOptions = {
      title: "Share Screenshot",
      message: "Check out this screenshot!",
      url: `file://${path}`,
      type: "image/png",
    };

    Share.open(shareOptions)
      .then((res) => console.log("Share success:", res))
      .catch((err) => {
        if (err.message === "User did not share") {
          console.log("User cancelled sharing");
        } else {
          console.error("Error sharing image:", err);
        }
      });
  };

  //function to share image as pdf
  const shareImageAsPdf = async () => {
    if (!viewShotRef.current) {
      console.error("ViewShot ref not available");
      return;
    }

    try {
      const path = await viewShotRef?.current.capture();
      const imagePath = `file://${path}`;

      const html = `
        <!DOCTYPE html>
        <html>
          <body>
            <img src="${imagePath}" style="width: 100%; height: auto;" />
          </body>
        </html>
      `;

      const pdfOptions = {
        html,
        fileName: "screenshot",
        base64: true,
      };

      const pdf = await RNHTMLtoPDF.convert(pdfOptions);

      const shareOptions = {
        url: `data:application/pdf;base64,${pdf.base64}`,
        type: "application/pdf",
        message: "Here is a screenshot from MyApp as a PDF",
      };

      Share.open(shareOptions)
        .then((res) => console.log("Share success:", res))
        .catch((err) => {
          if (err.message === "User did not share") {
            console.log("User cancelled sharing");
          } else {
            console.error("Error sharing image:", err);
          }
        });
    } catch (err) {
      console.error("Error sharing image as PDF:", err);
    }
  };

  //alerts to ask user how they want to save the data

  const showShareOptions = () => {
    Alert.alert(
      "Share Screenshot",
      "Choose the format you want to share the screenshot in:",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Image",
          onPress: () => shareImage(),
        },
        {
          text: "PDF",
          onPress: () => shareImageAsPdf(),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ViewShot
        ref={viewShotRef}
        options={{
          format: "jpg",
          quality: 0.8,
        }}
        style={{ flex: 1 }}
      >
        {/* source */}
        <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
      </ViewShot>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={saveToMediaLibrary}>
          <Text style={styles.buttonText}>Save to Media Library</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={showShareOptions} style={styles.button}>
          <Text style={styles.buttonText}>Share Screenshot</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#4b7bec",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ShareButton;
