import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import Swiper from "react-native-swiper";

const { height, width } = Dimensions.get("window");

const Details = (props) => {
  const { images, description, name, phone, price } = props.route.params;
  return (
    <ScrollView style={{ flex: 1, height: height * 1.5, width: width }}>
      <View
        style={{
          marginTop: 35,
          borderRadius: 15,
          width: width / 1.05,
          height: height / 2,
          borderWidth: 1,
          borderColor: "brown",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Swiper showsButtons loop={false} style={{ height: "100%" }}>
          {images.map((im) => {
            return (
              <Image
                key={Math.random * Math.random}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 15,
                }}
                source={{ uri: im }}
              />
            );
          })}
        </Swiper>
      </View>
      <View
        style={{
          margin: 10,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{name}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{phone}</Text>
      </View>
      <View
        style={{
          margin: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}>
          Rs: {price}
        </Text>
      </View>
      <View
        style={{
          margin: 20,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Description:</Text>
        <Text style={{ fontSize: 20 }}>{description}</Text>
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({});
