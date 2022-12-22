import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import CameraScreen from "./src/screens/CameraScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoadingScreen from "./src/screens/LoadingScreen";

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Loading: undefined;
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
            headerShown: true,
          })}
        >
          <Stack.Screen name="Camera" component={CameraScreen} />
          {/* <Stack.Screen name="Loading" component={LoadingScreen} /> */}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
