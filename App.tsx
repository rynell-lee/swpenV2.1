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

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Loading: undefined;
  Review: undefined;
  Annotation: undefined;
  MdModal2: undefined;
  Test: undefined;
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
          <Stack.Screen name="MdModal2" component={MdModal2} />
          <Stack.Screen name="Test" component={TestScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
