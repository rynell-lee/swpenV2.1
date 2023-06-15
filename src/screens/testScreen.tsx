import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Text } from "react-native";
import {
  FFmpegKit,
  FFmpegKitConfig,
  FFmpegSession,
  ReturnCode,
} from "ffmpeg-kit-react-native";
import RNFS from "react-native-fs";
import FFmpegWrapper from "../components/annotations/Ffmpeg";

function executeFFmpegCommand(
  command: string,
  callback: (arg0: FFmpegSession | null) => void
) {
  FFmpegKit.execute(command)
    .then((execution) => {
      callback(execution);
    })
    .catch((error) => {
      console.error(error);
      callback(null);
    });
}

async function extractFrames(inputPath: string, frameRate: number) {
  const outputPattern = "output_frame_%04d.png";
  const outputPath = RNFS.CachesDirectoryPath + "/" + outputPattern;

  try {
    const command = `-i ${inputPath} -vf fps=${frameRate} -vsync 0 ${outputPath}`;
    // const execution: any = await FFmpegKit.execute(command);

    FFmpegKit.executeAsync(
      command,
      async (session) => {
        const state = FFmpegKitConfig.sessionStateToString(
          await session.getState()
        );
        const returnCode = await session.getReturnCode();
        const failStackTrace = await session.getFailStackTrace();
        const duration = await session.getDuration();

        if (ReturnCode.isSuccess(returnCode)) {
          console.log(
            `Encode completed successfully in ${duration} milliseconds;.`
          );
          // console.log(`Check at ${outputImagePath}`);
          // successCallback(outputImagePath);
          const frameFiles = await RNFS.readdir(RNFS.CachesDirectoryPath);
          const frames: any = [];
          // console.log("data", frames);

          for (const file of frameFiles) {
            if (file.startsWith("output_frame_")) {
              const frameData = await RNFS.readFile(
                RNFS.CachesDirectoryPath + "/" + file,
                "base64"
              );
              frames.push(`data:image/png;base64,${frameData}`);
            }
          }
          console.log("data", frames);

          return frames;
        } else {
          console.log("Encode failed. Please check log for the details.");

          // errorCallback();
        }
      },
      (log) => {
        console.log(log.getMessage());
      },
      (statistics) => {
        console.log(statistics);
      }
    ).then((session) =>
      console.log(
        `Async FFmpeg process started with sessionId ${session.getSessionId()}.`
      )
    );
    //new code
    // let executionResult: any = await new Promise<void>((resolve) => {
    //   executeFFmpegCommand(command, (execution) => {
    //     executionResult = execution;
    //     // console.log("exectuion", execution);
    //     resolve();
    //   });
    // });
    //
    // if (
    //   executionResult &&
    //   executionResult.getReturnCode() === 0
    //   // execution.getReturnCode() !== undefined
    // ) {
    //   const frameFiles = await RNFS.readdir(RNFS.CachesDirectoryPath);
    //   const frames: any = [];
    //   console.log("data", frames);

    //   for (const file of frameFiles) {
    //     if (file.startsWith("output_frame_")) {
    //       const frameData = await RNFS.readFile(
    //         RNFS.CachesDirectoryPath + "/" + file,
    //         "base64"
    //       );
    //       frames.push(`data:image/png;base64,${frameData}`);
    //     }
    //   }
    //   console.log("data", frames);

    //   return frames;
    // } else {
    //   throw new Error(
    //     `FFmpeg execution failed with return code: ${
    //       executionResult ? executionResult.returnCode : "undefined"
    //     }`
    //   );
    // }
  } catch (error) {
    console.error(error);
    return [];
  }
}

const ImageGallery = ({ images }: any) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <View>
      <Image
        source={{ uri: images[currentImageIndex] }}
        style={{ width: 300, height: 300 }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Button
          title="Previous"
          onPress={handlePreviousImage}
          disabled={currentImageIndex === 0}
        />
        <Button
          title="Next"
          onPress={handleNextImage}
          disabled={currentImageIndex === images.length - 1}
        />
      </View>
    </View>
  );
};

const FrameExtractor = () => {
  const [images, setImages] = useState([]);
  const uri =
    "file:///data/user/0/com.ssi.swpencamera/cache/VisionCamera-20230329_0338019084713904147356316.mp4";

  const uri2 =
    "file:///data/user/0/com.ssi.swpencamera/cache/ImagePicker/16e3f33b-a6af-4704-84f1-7c755a6b2946.mp4";

  const handleExtractFrames = async () => {
    // const extractedImages: any = await extractFrames(uri2, 30);
    extractFrames(uri2, 30)
      .then((data: any) => {
        setImages(data);
        // console.log("images length", images.length);
      })
      .then(() => {
        console.log("images length", images.length);
      })
      .catch((err) => console.log(err));
    // console.log("images length", extractedImages.length);
    // setImages(extractedImages);

    return <Text>Done</Text>;
  };

  // extractFrames(uri, 30);

  // FFmpegKit.execute(
  //   `-i ${uri} -vf "select=eq(n\, 30)" -vsync 0 output_frame_%04d.png`
  // )
  //   .then(async (session) => {
  //     const returnCode = await session.getReturnCode();
  //     const logs = await session.getLogs();
  //     // console.log(session);
  //     console.log(returnCode);
  //   })
  //   .catch((err) => console.log(err));
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* {images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <Button title="Extract Frames" onPress={handleExtractFrames} />
        // <Text>hello</Text>
      )}
      <ImageGallery /> */}
      <Button title="Extract Frames" onPress={handleExtractFrames} />
      {/* {images.length > 0 ? <ImageGallery images={images} /> : null} */}
    </View>
  );
};

export default FrameExtractor;

// "file:///data/user/0/com.ssi.swpencamera/cache/VisionCamera-20230329_0338019084713904147356316.mp4",

//ffmpeg -i input_video.mp4 -vf "select=eq(n\,frame_number)" -vsync 0 output_frame_%04d.png
