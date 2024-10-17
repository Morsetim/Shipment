import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Image, Animated } from "react-native";

export default function SplashScreen() {
    const scaleAnim = useRef(new Animated.Value(0)).current;

    const startAnimation = () => {
      Animated.timing(scaleAnim, {
        toValue: 1, 
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };
  
    useEffect(() => {
      startAnimation();
    }, []);
  
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            {
              transform: [
                {
                  scale: scaleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.1, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Image
            source={require('@/assets/images/Group.png')} 
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
    },
    image: {
      width: 100,  
      height: 100,
    },
  });
  