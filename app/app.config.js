import 'dotenv/config';

export default {
  expo: {
    name: "Ghumgham",
    slug: "ghumgham",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "app",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false
    },
    web: {
      output: "static",
      
    },
    extra : {
      eas: {
        projectId: "d1b8c9e7-5a3c-4f0b-9c8e-2a1b2c3d4e5f"
      },
      apiBaseUrl: process.env.API_BASE_URL 
    },
    experiments: {
      typedRoutes: true,
      reactCompiler: true
    }
  }
};
