import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import CameraScreen from "./src/screens/CameraScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import VideoReviewScreen from "./src/screens/VideoReviewScreen";
import AnnotationScreen from "./src/screens/AnnotationScreen";
import { Provider } from "./src/context/cameraContext";
import MdModal2 from "./src/components/metadata/MdModal2";
import TestScreen from "./src/screens/testScreen";
import ScrubScreen from "./src/screens/ScrubScreen";
import AnnotationTest from "./src/screens/AnnotationTest";
import Line from "./src/screens/testLine";
import ChartScreen from "./src/screens/ChartScreen";
import ChartsReviewScreen from "./src/screens/ChartsReviewScreen";

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Loading: undefined;
  Review: undefined;
  Annotation: undefined;
  AnnotationTest: undefined;
  MdModal2: undefined;
  Test: undefined;
  Scrub: undefined;
  Line: undefined;
  Chart: undefined;
  ChartsReview: undefined;
};

export type NavigatorProps = NativeStackScreenProps<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ gestureEnabled: false }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "SwimmerPenV2",
            headerShown: true,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Group
          screenOptions={({ navigation }) => ({
            headerShown: false,
          })}
        >
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Review" component={VideoReviewScreen} />
          <Stack.Screen name="Annotation" component={AnnotationScreen} />
          <Stack.Screen name="AnnotationTest" component={AnnotationTest} />
          <Stack.Screen name="MdModal2" component={MdModal2} />
          <Stack.Screen name="Test" component={TestScreen} />
          <Stack.Screen name="Line" component={Line} />
          <Stack.Screen name="Chart" component={ChartScreen} />
          <Stack.Screen name="ChartsReview" component={ChartsReviewScreen} />
          {/* <Stack.Screen name="Scrub" component={ScrubScreen} /> */}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
