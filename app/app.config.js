import 'dotenv/config';

export default {
  expo: {
    name: "GhumGham",
    slug: "ghumgham",
    version: "1.0.0",
    orientation: "portrait",
    // icon: "./assets/images/icon.png", // Add later when icon is ready
    scheme: "app",
    userInterfaceStyle: "automatic",

    extra: {
      API_URI_AUTH: process.env.API_URI_AUTH,
      API_URI_HOTEL: process.env.API_URI_HOTEL,
      API_URI_BOOKING: process.env.API_URI_BOOKING,
    },

    newArchEnabled: true,

    ios: {
      supportsTablet: true,
    },

    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        // foregroundImage: "./assets/images/android-icon-foreground.png",
        // backgroundImage: "./assets/images/android-icon-background.png",
        // monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },

    web: {
      output: "static",
    },

    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png", // Add splash icon when ready
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  },
};