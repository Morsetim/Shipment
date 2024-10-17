import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useAuth } from '@/utils/authContext';
import Input from '@/components/TextInput';
import LoadingButton from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import ShipmentCard from '@/components/ShipmentCard';
import {
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useQuery } from '@tanstack/react-query';
import { getAllShipments, useAWBs } from '@/utils/api';

const status = ['Recieved', 'Putaway', 'Rejected', 'Delivered', 'Cancelled', 'Lost', 'On Hold']

const HomeScreen = ({  }) => {
  const { data, isLoading, error } = useAWBs();


    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const { user } = useAuth();
    const [activeBtn, setActiveBtn] = useState('2');
    const [markAll, setMarkAll] = useState(false);
    const snapPoints = useMemo(() => ['30%'], []);
    const [checkboxes, setCheckboxes] = useState({
      option1: false,
    });

    const toggleCheckbox = (key: string) => {
      setCheckboxes((prev: any) => ({
        ...prev,
        [key]: !prev[key],
      }));
    };

    const toggleMarkAll = () => {
      const newMarkAllState = !markAll;
      setMarkAll(newMarkAllState);
      setCheckboxes({
        option1: newMarkAllState,
        // option2: newMarkAllState,
        // option3: newMarkAllState,
      });
    };

    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
      setActiveBtn('1');
  }, []);
  //   const handleSheetChanges = useCallback((index: number) => {
  //     console.log('handleSheetChanges', index);
  //   }, []);
  const handlePresentModalClose =  useCallback(() => {
      bottomSheetModalRef.current?.close();
      setActiveBtn('2');
  }, []);

  const onHandleScan = () => {
    setActiveBtn('2');
    handlePresentModalClose()
  }

  const renderItem = ({ item }: any) => (
    <ShipmentCard 
      destination_country={item.destination_country}
      destination_state={item.destination_state}
      barcode={item.barcode}
      status={item.status}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.first}>
       <View style={styles.circle}>
        <Image
          source={require('@/assets/images/person.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.logo}>
        <Image
          source={require('@/assets/images/shippex.png')}
        />
      </View>
      <View style={styles.circleTwo}>
      <FontAwesome5 name="bell" size={24} color="black" />
      </View>
    </View>
      <Text style={{color: '#000000', marginTop: 15}}>Hello,</Text>
      <Text style={{color: 'black', marginTop: 10, fontWeight: 'bold', fontSize: 21}}>{user?.fullname}</Text>
      <TextInput
        style={styles.input}
        placeholder="Search"
        // value={email}
        // onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={'#A7A3B3'}
      />
      <View style={{display: 'flex', flexDirection: 'row', width: '100%', columnGap: 10, marginTop: 20}}>
        <LoadingButton  
         isIcon
         title="Filter" 
         iconImage={require('@/assets/images/filter.png')}
         onPress={handlePresentModalPress} 
         style={styles.optBtn} 
         isActive={activeBtn === '1'}/>
        <LoadingButton 
         isIcon
         iconImage={require('@/assets/images/scan1.png')}
         title="Add Scan" 
         onPress={onHandleScan} 
         style={styles.optBtn} 
         isActive={activeBtn === '2'}/>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', width: '100%', columnGap: 10, marginTop: 20, justifyContent: "space-between"}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Shippments</Text>
        <Checkbox
          label="Mark All"
          isChecked={markAll}
          onPress={toggleMarkAll}
        />
      </View>
      <FlatList
      data={data?.message}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
    />
      <View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
    //   onChange={handleSheetChanges}
         >
          <BottomSheetView style={{padding: 16}}>
            <View >
              <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: "row"}}>
              <TouchableWithoutFeedback onPress={handlePresentModalClose}>
                <Text style={{color: "#2F50C1"}}>Cancel</Text>
              </TouchableWithoutFeedback>
              <Text style={{color: "black", fontWeight: 'bold'}}>Filters</Text>
              <TouchableWithoutFeedback onPress={handlePresentModalClose}>
                <Text style={{color: "#2F50C1"}}>Done</Text>
              </TouchableWithoutFeedback>
              </View>
              </View>
              <Text style={{marginTop: 16}}>SHIPMENT STATUS</Text>
              <View style={{marginTop: 7}}>
                <View  style={styles.statusRecieved}>
              {status.map((stat, i) => (
                <View key={i} style={styles.textCont}>
                  <Text 
                  style={{color: "#2F50C1",}}>
                    {stat}</Text>
                </View>
                  ))}
                  </View>
              </View>
          </BottomSheetView>
      </BottomSheetModal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 50, 
    height: 50,
    borderRadius: 75, 
    overflow: 'hidden',
  },
  circleTwo: {
    width: 50, 
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F4F2F8",
    borderRadius: 75, 
  },
  logo:{
    // width: 300, 
    height: 30, 
  },
  image: {
    // width: '100%', 
    // height: '100%', 
    resizeMode: 'contain', 
},
first: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
},
optBtn: {
  marginVertical: 10,
  paddingHorizontal: 10,
  paddingVertical: 15,
  borderRadius: 5,
  backgroundColor: '#F4F2F8',
  // borderWidth: 1,
  // borderColor: '#007BFF',
  width: "48%"
},
input: {
  height: 50,
  borderColor: 'gray',
  // borderWidth: 1,
  padding: 10,
  borderRadius: 5,
  marginVertical: 10,
  backgroundColor: "#F4F2F8"
},
statusRecieved: {
  
  // borderWidth: 1,
  borderColor: 'white',
  // backgroundColor: '#C3D1FF',
  display: 'flex',
  flexDirection: 'row',
  // width: 30
  // marginRight: 15
  gap: 10,
  flexWrap: 'wrap',
},
 textCont: {
  backgroundColor: "#F4F2F8", 
  padding: 5,
   borderRadius: 8
 }
});

export default HomeScreen;
