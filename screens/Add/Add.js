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
import Swiper from "react-native-swiper";
import * as Actions from "../../store/Action/add";
import { connect } from "react-redux";
import mime from "mime";

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
  const [image, setImage] = useState([]);
  const [isImage, setIsImage] = useState(false);

  const initial = {
    latitude: 32.51922279320279,
    longitude: 74.51706916093826,
  };

  const uploadHouse = async () => {
    if (
      name === "" ||
      price === "" ||
      description === "" ||
      phone === "" ||
      !locationData ||
      !image.length ||
      !isImage
    ) {
      Toast.show({
        type: "error",
        text1: "Please fill all entries",
      });
      setIsLoading(false);
    } else {
      const newImage = image.map((i) => {
        // const newUri = "file:///" + i.uri.split("file:/").join("");
        return {
          uri: i.uri,
          type: mime.getType(i.uri),
          name: i.uri.split("/").pop(),
        };
      });
      let house = {
        coords: `latitude:${locationData.latitude},longitude:${locationData.longitude}`,
        images: newImage,
        name,
        price,
        description,
        phone,
      };

      props.add(house);
      setIsLoading(false);
      props.navigation.navigate("MapStack");
      Toast.show({
        type: "success",
        text1: "House uploaded",
      });
      setName("");
      setPrice("");
      setDescription("");
      setPhone("");
      setLocationData();
      setImage([]);
      setIsImage(false);
    }
  };

  const removeImage = (uri) => {
    const filtered = image.filter((i) => i.uri != uri);
    setImage(filtered);
    if (!filtered.length) {
      setIsImage(false);
    }
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
        aspect: [4, 4],
        quality: 1,
        allowsMultipleSelection: true,
      });
      if (!imagePicked.cancelled) {
        setImage([...image, imagePicked]);
        setIsImage(true);
      }
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
                  {!isImage ? (
                    <Text style={{ textAlign: "center", color: "white" }}>
                      Take picture
                    </Text>
                  ) : (
                    <Swiper
                      showsButtons
                      loop={false}
                      style={{ height: "100%" }}
                    >
                      {image.map((im) => {
                        return (
                          <TouchableOpacity
                            key={im.uri}
                            onLongPress={() => removeImage(im.uri)}
                            activeOpacity={0.9}
                          >
                            <Image
                              key={im.uri}
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 20,
                              }}
                              source={{ uri: im.uri }}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </Swiper>
                  )}
                </View>
                <View style={{ marginTop: 10 }}>
                  <Button
                    icon="camera"
                    mode="text"
                    onPress={() => imageTaker()}
                  >
                    Upload
                  </Button>
                </View>
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
                    onPress={() => [setIsLoading(true), uploadHouse()]}
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

const styles = StyleSheet.create({});

const dispatchAction = (dispatch) => {
  return {
    add: (data) => dispatch(Actions.add(data)),
  };
};

export default connect(null, dispatchAction)(Add);
