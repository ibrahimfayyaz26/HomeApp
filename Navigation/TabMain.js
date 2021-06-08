import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createMaterialBottomTabNavigator();

//Screens
import User from "../screens/Login/User";
import Add from "../screens/Add/Add";
import MapStack from "./MapStack";

const TabMain = () => {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        activeColor="#69779b"
        keyboardHidesNavigationBar={true}
        barStyle={{ backgroundColor: "#33313b" }}
      >
        <Tab.Screen
          name="MapStack"
          component={MapStack}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="map-signs" color={color} size={30} />
            ),
            tabBarLabel: false,
          }}
        />
        <Tab.Screen
          name="Add"
          component={Add}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="upload" color={color} size={30} />
            ),
            tabBarLabel: false,
          }}
        />

        <Tab.Screen
          name="User"
          component={User}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="user" color={color} size={30} />
            ),
            tabBarLabel: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabMain;
