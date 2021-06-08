import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MapScreen from "../screens/map/Map";
import Details from "../screens/map/Details";

const stack = createStackNavigator();

const MapStack = () => {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="Map" component={MapScreen} />
      <stack.Screen name="Details" component={Details} />
    </stack.Navigator>
  );
};

export default MapStack;
