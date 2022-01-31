import React, { useCallback, useEffect, useState } from "react";
import firabase from "@react-native-firebase/app";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";

import { Routes } from "./src/routes";
import theme from "./src/theme";
import { firebase } from "@react-native-firebase/firestore";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  function inicializeFirebase() {
    try {
      console.log("# app");
      console.log(firebase.apps);
      if (firebase.apps.length === 0) {
        firabase.initializeApp({
          appId: "1:821834076383:android:931c4409f5b4f7657ed96a",
          projectId: "myshopping-f430c",
          apiKey: "AIzaSyCzd095-Y_icv4GHCvySFXAjk5njJ1qBRA",
          databaseURL: "https://myshopping-f430c.firebaseio.com",
          messagingSenderId: "821834076383",
          storageBucket: "myshopping-f430c.appspot.com",
        });
      } else {
        setLoading(false);
        return;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    inicializeFirebase();
  }, []);

  if (!fontsLoaded || loading === true) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      <Routes />
    </ThemeProvider>
  );
}
