import React from "react";
import Home from "./src/screens/home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./src/screens/splashscreen";
import CreatePage from "./src/screens/create";
import UpdatePage from "./src/screens/update";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Create" component={CreatePage} />
        <Stack.Screen name="Update" component={UpdatePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
