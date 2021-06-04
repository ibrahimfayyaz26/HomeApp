import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
} from "react-native";
import { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import MapCom from "../../Components/MapView";
import { locationData } from "../../data/mockLocationData";
import { WebView } from "react-native-webview";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("window");

let Im;

Platform.OS == "android" ? (Im = WebView) : (Im = Image);

const Map = () => {
  const [location, setLocation] = useState();

  const initial = {
    latitude: 32.51922279320279,
    longitude: 74.51706916093826,
  };

  const data = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: "Permission not granted",
        text2: "Please give permission to get real time location",
      });
      setLocation(initial);
    } else {
      let locationData = await Location.getCurrentPositionAsync();
      setLocation(locationData.coords);
      // setLocation(initial);
    }
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <MapCom
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
          }}
        >
          {locationData.map((l) => {
            return (
              <Marker
                icon={require("../../assets/icons8-marker-100.png")}
                key={l.coords.latitude * l.coords.longitude}
                coordinate={l.coords}
              >
                <Callout onPress={() => console.log("hello")}>
                  <View
                    style={{ flex: 1, width: width / 4, height: height / 6 }}
                  >
                    <Text>$2000</Text>
                    <Im
                      style={{ width: width / 4, height: height / 10 }}
                      source={{ uri: l.images[0] }}
                    />
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapCom>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Map;
