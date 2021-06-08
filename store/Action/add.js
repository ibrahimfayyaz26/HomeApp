import { locationData } from "../../data/mockLocationData";
import axios from "axios";

export const FETCH_DATA = "FETCH_DATA";
export const ADD_HOUSE = "ADD_HOUSE";

export const fetch = () => {
  return async (dispatch) => {
    const data = await axios.get("http://192.168.10.2:3000/");

    return dispatch({
      type: FETCH_DATA,
      payload: data.data,
    });
  };
};

export const add = (payload, fun) => {
  return async (dispatch) => {
    const formData = new FormData();

    payload.images.forEach((img) => {
      formData.append("images", img);
    });

    formData.append("price", payload.price);
    formData.append("description", payload.description);
    formData.append("name", payload.name);
    formData.append("phone", payload.phone);
    formData.append("coords", payload.coords);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const data = await axios.post(
      "http://192.168.10.2:3000/",
      formData,
      config
    );

    return dispatch({
      type: ADD_HOUSE,
      payload: data.data,
    });
  };
};
