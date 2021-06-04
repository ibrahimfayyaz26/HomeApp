import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextInput, Title, Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MapCom from "../../Components/MapView";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

const { height, width } = Dimensions.get("window");

const Add = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [locationData, setLocationData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [MapOff, setMapOff] = useState(true);
  const [location, setLocation] = useState();
  const [image, setImage] = useState();

  const initial = {
    latitude: 32.51922279320279,
    longitude: 74.51706916093826,
  };

  const imageTaker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: "Permission not granted",
        text2: "Please give permission to select Image",
      });
    } else {
      let imagePicked = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      setImage(imagePicked.uri);
      // console.log(imagePicked.uri);
    }
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
      let AlocationData = await Location.getCurrentPositionAsync();
      setLocation(AlocationData.coords);
      // setLocation(initial);
    }
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {MapOff ? (
        <KeyboardAwareScrollView
          viewIsInsideTabBar={true}
          enableOnAndroid={true}
          extraHeight={200}
        >
          <SafeAreaView
            style={{
              marginTop: 40,
              flex: 1,
              height: height * 1.5,
              width: width,
            }}
          >
            <ScrollView
              style={{
                flex: 1,
                height: height * 1.5,
                width: width,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: width,
                }}
              >
                <Title style={{ fontSize: 25, marginTop: 25 }}>
                  Sell Your House
                </Title>
                <View
                  style={{
                    width: width / 1.2,
                  }}
                >
                  <TextInput
                    style={{ marginTop: 15 }}
                    mode="outlined"
                    label="Name"
                    placeholder="Name for your house"
                    value={name}
                    onChangeText={setName}
                  />
                  <TextInput
                    style={{ marginTop: 15 }}
                    mode="outlined"
                    label="Price"
                    placeholder="Price for your house"
                    value={price}
                    onChangeText={setPrice}
                  />
                  <TextInput
                    style={{ marginTop: 15 }}
                    mode="outlined"
                    label="Description"
                    placeholder="Describe your house"
                    value={description}
                    onChangeText={setDescription}
                  />
                  <TextInput
                    style={{ marginTop: 15 }}
                    mode="outlined"
                    label="Phone no"
                    placeholder="Help people to reach you"
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onLongPress={() => imageTaker()}
                >
                  <View
                    style={{
                      marginTop: 30,
                      borderRadius: 20,
                      width: width / 1.15,
                      height: 250,
                      borderWidth: 1,
                      borderColor: "brown",
                      justifyContent: "center",

                      backgroundColor: "#242f3e",
                    }}
                  >
                    {!image ? (
                      <Text style={{ textAlign: "center", color: "white" }}>
                        Take picture
                      </Text>
                    ) : (
                      <Image
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 20,
                        }}
                        source={{ uri: image }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onLongPress={() => setMapOff(false)}
                >
                  <View
                    style={{
                      marginTop: 30,
                      borderRadius: 20,
                      width: width / 1.15,
                      height: 250,
                      borderWidth: 1,
                      borderColor: "brown",
                      justifyContent: "center",
                      marginBottom: 5,
                      padding: 5,
                      backgroundColor: "#242f3e",
                    }}
                  >
                    {locationData ? (
                      <MapCom
                        initialRegion={{
                          latitude: locationData.latitude,
                          longitude: locationData.longitude,
                          latitudeDelta: 0.0015,
                          longitudeDelta: 0.0015,
                        }}
                      >
                        <Marker
                          icon={require("../../assets/icons8-marker-100.png")}
                          coordinate={{
                            latitude: locationData.latitude,
                            longitude: locationData.longitude,
                          }}
                        />
                      </MapCom>
                    ) : (
                      <Text style={{ textAlign: "center", color: "white" }}>
                        Select location
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    marginTop: 25,
                    justifyContent: "center",
                    marginBottom: 5,
                  }}
                >
                  <Button
                    icon="upload"
                    mode="text"
                    loading={isLoading}
                    onPress={() => [
                      console.log("Pressed"),
                      setIsLoading(!isLoading),
                      Toast.show({
                        type: "success",
                        text1: "House Uploaded",
                      }),
                    ]}
                  >
                    Upload
                  </Button>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAwareScrollView>
      ) : (
        <MapCom
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
          }}
          region={(e) => [setLocationData(e), setMapOff(true)]}
        >
          <Marker
            icon={require("../../assets/icons8-marker-100.png")}
            coordinate={{
              latitude: locationData
                ? locationData.latitude
                : location.latitude,
              longitude: locationData
                ? locationData.longitude
                : location.longitude,
            }}
          />
        </MapCom>
      )}
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({});
