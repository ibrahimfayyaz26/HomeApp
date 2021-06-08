import React, { useState, useEffect, useCallback } from "react";
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
import { WebView } from "react-native-webview";
import Toast from "react-native-toast-message";
import * as Actions from "../../store/Action/add";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

let Im;

Platform.OS == "android" ? (Im = WebView) : (Im = Image);

const Map = (props) => {
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

  useFocusEffect(
    useCallback(() => {
      props.fetchData();
    }, [])
  );

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
          {props.mapData.map((l) => {
            const coordUpdate = l.coords.split(",");
            const q = coordUpdate[0].split(":").pop();
            const w = coordUpdate[1].split(":").pop();
            return (
              <Marker
                icon={require("../../assets/icons8-marker-100.png")}
                key={l._id}
                coordinate={{
                  latitude: parseFloat(q),
                  longitude: parseFloat(w),
                  // latitude: location.latitude,
                  // longitude: location.longitude,
                }}
              >
                <Callout
                  onPress={() => props.navigation.navigate("Details", l)}
                >
                  <View
                    style={{ flex: 1, width: width / 4, height: height / 6 }}
                  >
                    <Text>Rs:{l.price}</Text>
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

const stateProps = (state) => {
  return {
    mapData: state.add,
  };
};

const dispatchAction = (dispatch) => {
  return {
    fetchData: () => dispatch(Actions.fetch()),
  };
};

export default connect(stateProps, dispatchAction)(Map);
