//not in use for the main code
//this code is used to break the video into multiple frames, currently encountering errors
//for future work, please refere to ffmpeg-kit-react-native docs
import {
  FFmpegKit,
  FFmpegKitConfig,
  ReturnCode,
} from "ffmpeg-kit-react-native";
import RNFS from "react-native-fs";

import { FRAME_PER_SEC, FRAME_WIDTH } from "../../screens/testscreen2";

class FFmpegWrapper {
  static getFrames(
    localFileName: any,
    videoURI: any,
    frameNumber: any,
    successCallback: (arg0: string) => void
    // errorCallback: () => void
  ) {
    const outputPattern = "output_frame_%04d.png";
    const outputPath = RNFS.CachesDirectoryPath + "/" + outputPattern;
    // let outputImagePath = `${RNFS.CachesDirectoryPath}/${localFileName}_%4d.png`;
    // const command = `-i ${inputPath} -vf fps=${frameRate} -vsync 0 ${outputPath}`;
    const ffmpegCommand = `-ss 0 -i ${videoURI} -vf "fps=${FRAME_PER_SEC}/1:round=up,scale=${FRAME_WIDTH}:-2" -vframes ${frameNumber} ${outputPath}`;

    FFmpegKit.executeAsync(
      ffmpegCommand,
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
          console.log(`Check at ${outputPath}`);
          successCallback(outputPath);
        } else {
          console.log("Encode failed. Please check log for the details.");
          //   console.log(
          //     `Encode failed with state ${state} and rc ${returnCode}.${
          //       (failStackTrace, '\\n')
          //     }`,
          //   );
          //   errorCallback();
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
  }
}

export default FFmpegWrapper;
