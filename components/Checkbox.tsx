import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

interface CheckboxProps {
  label?: string;
  isChecked: boolean;
  onPress: () => void;
}

 const Checkbox: React.FC<CheckboxProps> = ({ label, isChecked, onPress }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <View style={[styles.checkbox, isChecked ? styles.checked : styles.unchecked]}>
        {isChecked && <Ionicons name="checkmark" size={14} color="white" />}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    //   marginBottom: 15,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: '#E1DBDB',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    checked: {
      backgroundColor: 'blue',
    },
    unchecked: {
      backgroundColor: 'white',
    },
    checkboxLabel: {
      fontSize: 18,
    },
  });

  export default Checkbox;