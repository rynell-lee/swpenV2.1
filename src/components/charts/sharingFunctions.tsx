import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import ViewShot, { captureRef } from "react-native-view-shot";
import RNFS from "react-native-fs";
import Share from "react-native-share";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
//@ts-ignore
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { showMessage } from "react-native-flash-message";

export const viewShotRef: React.RefObject<ViewShot> = React.createRef();

const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

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

const showSuccess = () => {
  showMessage({
    message: "File saved successfully",
    type: "success",
  });
};

const showFail = () => {
  showMessage({
    message: "Error saving file",
    type: "danger",
  });
};

export const saveToMediaLibrary = async () => {
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
    showSuccess();
  } catch (err) {
    if (
      isError(err) &&
      err.message === "User didn't grant write permission to requested files."
    ) {
      console.log("User denied write permission to requested files");
    } else {
      console.error("Error saving image:", err);
      showFail();
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
    .then((res) => {
      console.log("Share success:", res);
      showSuccess();
    })
    .catch((err) => {
      if (err.message === "User did not share") {
        console.log("User cancelled sharing");
      } else {
        console.error("Error sharing image:", err);
        showFail();
      }
    });
};

// const scrollViewRef = useRef(null);
const captureScrollView = async () => {
  try {
    const snapshot = await captureRef(viewShotRef, {
      format: "png",
      quality: 1,
      result: "base64",
    });
    return snapshot;
  } catch (err) {
    console.error("Error capturing scrollView:", err);
  }
};

const convertToPDF = (x: any) => {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }
    .image-container {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 100%;
      max-height: 100%;
    }
  </style>
</head>
    <body>
      <img src="data:image/png;base64,${x}" style="width: 100%; height: auto;" />
    </body>
  </html>
`;
  return html;
};

const saveImageAsPdf = async () => {
  if (!viewShotRef.current) {
    console.error("ViewShot ref not available");
    return;
  }

  try {
    const base64Image = await captureScrollView();
    const html = convertToPDF(base64Image);

    const pdfOptions = {
      html,
      fileName: "screenshot",
      base64: true,
    };

    const pdf = await RNHTMLtoPDF.convert(pdfOptions);

    const pdfName = "swimmerPenCharts.pdf";
    const pdfPath = `${RNFS.ExternalStorageDirectoryPath}/Documents/${pdfName}`;
    await RNFS.writeFile(pdfPath, pdf.base64, "base64");

    console.log("PDF saved locally at:", pdfPath);
    showSuccess();
  } catch (err) {
    console.error("Error saving PDF locally:", err);
    showFail();
  }
};

const shareImageAsPdf = async () => {
  if (!viewShotRef.current) {
    console.error("ScrollView ref not available");
    return;
  }

  try {
    const base64Image = await captureScrollView();

    const html = convertToPDF(base64Image);

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
      .then((res) => {
        showSuccess();
        console.log("Share success:", res);
      })
      .catch((err) => {
        if (err.message === "User did not share") {
          console.log("User cancelled sharing");
        } else {
          console.error("Error sharing image:", err);
        }
      });
    showSuccess();
  } catch (err) {
    console.error("Error sharing image as PDF:", err);
    showFail();
  }
};

export const showShareOptions = () => {
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
        onPress: () => {
          Alert.alert(
            "Destination",
            "Would you like so save image locally or share it online:",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Local",
                onPress: () => saveToMediaLibrary(),
              },
              {
                text: "Online",
                onPress: () => shareImage(),
              },
            ],
            { cancelable: true }
          );
        },
      },
      {
        text: "PDF",
        onPress: () => {
          Alert.alert(
            "Destination",
            "Would you like so save PDF locally or share it online:",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Local",
                onPress: () => saveImageAsPdf(),
              },
              {
                text: "Online",
                onPress: () => shareImageAsPdf(),
              },
            ],
            { cancelable: true }
          );
        },
      },
    ],
    { cancelable: true }
  );
};

const generateCSVName = (): string => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const hour = currentDate.getHours().toString().padStart(2, "0");
  const minute = currentDate.getMinutes().toString().padStart(2, "0");
  const second = currentDate.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day}_${hour}-${minute}-${second}.csv`;
};

export const saveObjectAsCSV = async (myObject: MyObject) => {
  // const csvString = `name,age,city\n${myObject.name},${myObject.age},${myObject.city}`;
  let csvString = "";

  for (const key in myObject) {
    if (myObject.hasOwnProperty(key)) {
      const tableData = myObject[key];
      csvString += `${key}\n`;
      csvString += `table,x,y\n`;
      for (let i = 0; i < tableData.table.length; i++) {
        csvString += `${tableData.table[i]},${tableData.x[i]},${tableData.y[i]}\n`;
      }
    }
  }

  try {
    // const csvPath = `${RNFS.ExternalStorageDirectoryPath}/Documents/swimmPen.csv`;
    // const csvPath = pdfPath.replace('.pdf', '.csv')
    const csvName = generateCSVName();
    const csvPath = `${RNFS.ExternalStorageDirectoryPath}/Documents/${csvName}`;

    await RNFS.writeFile(csvPath, csvString, "utf8");

    console.log("File saved successfully");

    showMessage({
      message: "File saved successfully",
      type: "success",
    });
  } catch (error) {
    console.error("Error saving file:", error);

    showMessage({
      message: "Error saving file",
      // description: error.message,
      type: "danger",
    });
  }
};
interface TableData {
  table: any[];
  x: any[];
  y: any[];
}

interface MyObject {
  [key: string]: TableData;
}

// const myObject: MyObject = { name: "John", age: 25, city: "New York" };
