import React, { useState } from 'react';
import { TextInput, StyleSheet, TextInputProps, View, Text, ViewStyle } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;               
  error?: string;               
  containerStyle?: ViewStyle;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  containerStyle,
  placeholder,
  ...rest 
}) => {
    const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle, isFocused ? styles.focusedContainer : null]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error ? styles.errorInput : null]}
        {...rest}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={'thissss'}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    backgroundColor: "#F4F2F8",
    borderRadius: 5,
    paddingHorizontal: 10,
    // paddingVertical: 8,
  },
  label: {
    marginTop: 3,
    fontSize: 14,
    color: '#58536E',
  },
  input: {
    height: 40,
    // borderColor: '#ccc',
    // borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    color: '#2F50C1'
    
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    marginTop: 5,
    color: 'red',
    fontSize: 12,
  },
  focusedContainer: {
    borderColor: '#007BFF',
    borderWidth: 2,
  },
});

export default Input;
