import { useState, useRef } from "react";
import { View, Text,
    TouchableOpacity,
  Animated,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import Checkbox from "./Checkbox";
import { Image } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import LoadingButton from "./Button";

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}
interface DropdownProps {
    title: string;
    children: React.ReactNode;
  }
  interface AWB {
    destination_country: string;
    destination_state: string;
    barcode: string;
    status: string;
}
const ShipmentCard:React.FC<AWB> = ({destination_country, destination_state, barcode, status}) => {

    const [isOpen, setIsOpen] = useState(false);
  const animatedController = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    const config = {
      duration: 300,
      toValue: isOpen ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animatedController, config).start();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  const arrowTransform = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const viewTransform = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
    const [markAll, setMarkAll] = useState(false);
    const [checkboxes, setCheckboxes] = useState({
        option1: false,
      });

    const toggleMarkAll = () => {
        const newMarkAllState = !markAll;
        setMarkAll(newMarkAllState);
        setCheckboxes({
          option1: newMarkAllState,
          // option2: newMarkAllState,
          // option3: newMarkAllState,
        });
      };
 return (
    <View>
        <View style={styles.container}>
            <Checkbox
            isChecked={markAll}
            onPress={toggleMarkAll}
            />
            <Image
                source={require('@/assets/images/box.png')}
                style={{ width: 40, height: 40, resizeMode: 'contain'}}
            />
            <View>
                <Text>AWB</Text>
                <Text style={{fontWeight: 'bold'}}>{barcode}</Text>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "center", columnGap: 5, paddingVertical: 2, alignItems: "center"}}>
                <Text style={{color: "#757281"}}>{destination_country}</Text>
                <AntDesign name="arrowright" size={12} color="#2F50C1" />
                <Text style={{color: "#757281", textTransform: "lowercase"}}>{destination_state}</Text>
                </View>
            </View>
            <View style={styles.statusRecieved}><Text style={{color: "#2F50C1"}}>{status}</Text></View>
          <TouchableOpacity onPress={toggleDropdown}>
          <Animated.Text
          style={[styles.trans, { transform: [{ rotate: arrowTransform }] }]}
          >
            <View style={isOpen ? styles.openCir : styles.circle}>
            <Image
            source={isOpen ? require('@/assets/images/whitearr.png') : require('@/assets/images/twoarr.png')}
            style={styles.image}
            />
            </View>
          </Animated.Text>
          </TouchableOpacity>
        </View>
        {isOpen && 
        <>
        <Animated.Text
          style={[styles.viewTrans, { transform: [{ rotate: viewTransform }] }]}
          >
            <View style={[styles.collapse]}>
                <View style={styles.dest}>
                <View>
                    <Text>Origin</Text>
                    <Text style={{fontWeight: "bold"}}>{destination_country}</Text>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "center", columnGap: 5, paddingVertical: 2, alignItems: "center"}}>
                    <Text style={{color: "#757281"}}>Dokki, 22 Nile St. </Text>
                    {/* <Text style={{color: "#757281"}}>Alexandria</Text> */}
                    </View>
                </View>
                <AntDesign name="arrowright" size={20} color="#2F50C1" />
                <View>
                    <Text>Destination</Text>
                    <Text style={{fontWeight: 'bold'}}>{destination_state}</Text>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "center", columnGap: 5, paddingVertical: 2, alignItems: "center"}}>
                    <Text style={{color: "#757281"}}>Smoha, 22 max St.</Text>
                    </View>
                </View>
                </View>
                <View style={styles.require}>
                    <LoadingButton 
                        isIcon
                        iconImage={require('@/assets/images/call.png')}
                        title="Call" 
                        onPress={() => ''} 
                        style={styles.optBtn}
                        textStyle={styles.text}
                    />
                    <LoadingButton 
                        isIcon
                        iconImage={require('@/assets/images/whats.png')}
                        title="WhatsApp" 
                        onPress={() => ''} 
                        style={styles.optBtn2}
                        textStyle={styles.text}
                    />
                </View>
            </View>
          </Animated.Text>
        </>
        }
    </View>
 )
}

export default ShipmentCard;


const styles = StyleSheet.create({
    main: {
        
    },
    viewTrans: {
        width: '100%',
    },
    collapse: {
        padding: 12,
        backgroundColor: "#FEFEFF",
        borderTopWidth: 1,
        borderTopColor: 'white',
        // borderTopStyle: 'dashed',
        width: 373,
    },
    trans: {
        // color: "white",
        // backgroundColor: "blue"
    },
    dest: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    },
    container: {
        backgroundColor: "#F4F2F8",
        paddingHorizontal: 12,
        paddingVertical: 12,
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 17,
        borderRadius: 5,
        justifyContent: "space-between",
    },
    statusRecieved: {
        padding: 5,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        backgroundColor: '#C3D1FF',
        // marginRight: 15
    },
    statusCanceled: {
        padding: 5,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        // marginRight: 15
    },
    circle: {
        width: 30, 
        height: 30,
        borderRadius: 75, 
        // overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    openCir:{
        width: 30, 
        height: 30,
        borderRadius: 75, 
        // overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6E91EC',
    },
    image: { 
            width: '50%', 
            height: '50%', 
          resizeMode: 'contain', 
    },
    optBtn: {
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 14,
        backgroundColor: '#6E91EC',
        // width: "48%"
      },
      optBtn2: {
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 14,
        backgroundColor: '#25D366',
        // width: "48%"
      },
      text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
    require: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-end",
        columnGap: 8
    }
})