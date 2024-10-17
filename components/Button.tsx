import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, TextStyle, ViewStyle, Image, View, ImageSourcePropType } from 'react-native';

interface LoadingButtonProps {
  title: string;
  onPress: () => void;  
  style?: ViewStyle;
  text?: boolean;
  disabled?: boolean;
  isActive?: boolean;
  isIcon?: boolean;
  iconImage?: ImageSourcePropType;
  textStyle?: TextStyle
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ textStyle,title, onPress, style, text, disabled, isActive, isIcon, iconImage }) => {
  const [loading, setLoading] = useState(false);
   


  const handlePress = async () => {
    if (disabled) return;

    setLoading(true);
    try {
        await onPress();
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
};


  return (
    <TouchableOpacity
      style={[styles.button, style, disabled ? styles.disabledButton : null, isActive ? styles.activeButton : null]}
      onPress={handlePress}
      disabled={loading || disabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <View style={styles.cont}>
        {isIcon && <Image
          source={iconImage}
          style={{ }}
        />}
        <Text style={textStyle || [!text ? styles.buttonTextPrimary : styles.buttonText, isActive ? styles.activeText : null]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextPrimary: {
    color: '#2F50C1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  activeButton: {
    backgroundColor: '#2F50C1',
  },
  activeText: {
    color: 'white'
  },
  inactiveButton: {
    backgroundColor: 'gray',
  },
  cont: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 8,
   
  }
});

export default LoadingButton;
