import Constants from "expo-constants";

const API_URL_AUTH = Constants.expoConfig.extra.API_URI_AUTH || "http://192.168.1.77:3000";
const API_URL_HOTEL = Constants.expoConfig.extra.API_URI_HOTEL || "http://192.168.1.77:3001";
const API_URL_BOOKING = Constants.expoConfig.extra.API_URI_BOOKING || "http://192.168.1.77:3002";

export { API_URL_AUTH, API_URL_HOTEL, API_URL_BOOKING };
