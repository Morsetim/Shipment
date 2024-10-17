import React, { useEffect, useState } from "react";
import { StyleSheet, View} from "react-native";
import {
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SplashScreen from './screens/splash';
import LandingScreen from './screens/landing';


export default function WelcomeScreen() {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 2000);
  });


  return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
            <View style={styles.container}>
            {isShowSplashScreen ? <SplashScreen /> : <LandingScreen />}
            </View>
        </BottomSheetModalProvider>
        </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});
