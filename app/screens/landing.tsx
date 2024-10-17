import { View, StyleSheet, Text, Image, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import {
    BottomSheetModal,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import LoadingButton from '@/components/Button';
import AntDesign from '@expo/vector-icons/AntDesign';
import Input from '@/components/TextInput';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@/utils/api';
import axios, { AxiosError } from 'axios';
import { useAuth } from '@/utils/authContext';




interface LoginCredentials {
    email: string;
    password: string;
}
interface LoginResponse {
    full_name: string;
    message: string;
  }

export default function LandingScreen() {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [close, setClose] = useState(false)
    const snapPoints = useMemo(() => ['90%'], []);
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();


    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handlePresentModalClose =  useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const isButtonDisabled = !email || !password;


    const loginMutation = useMutation<LoginResponse, AxiosError, LoginCredentials>({
        mutationFn: loginApi,
        onSuccess: (data) => {
            if(data?.message === "Logged In"){
                login({
                  fullname: data?.full_name,
                });
                router.replace('/home');
            }
        },
        onError: (error) => {
            Alert.alert('Login Failed', error.message);
        },
      });

      const handleLogin = () => {
        const data: any = { usr: email, pwd:password };
        loginMutation.mutate(data);
      };

    return (
        <View style={styles.container}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                <Image
                    source={require('@/assets/images/ship-white.png')}
                    style={styles.img}
                    resizeMode="contain"
                />
                <Text style={styles.header}>SHIPPEX</Text>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                //   onChange={handleSheetChanges}
                >
                    <BottomSheetView style={styles.contentContainer}>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center",}}>
                     <AntDesign name="left" size={20} color="#4561DB" style={{fontWeight: "bold", marginRight: 2}} onPress={handlePresentModalClose}/>
                     <Text style={{color: "#4561DB", fontSize: 17}} onPress={handlePresentModalClose}>Cancel</Text>
                    </View>
                    <View style={styles.containerView}>
                        <Text style={styles.loginTxt}>Login</Text>
                        <Text style={styles.desc}>Please enter your First, Last name and your phone number in order to register</Text>
                    <View style={{marginTop: 30}}>
                        <Input 
                        label='url'
                        value='https:// | www.brandimic.com'
                        />
                        <Input 
                        label='Username / Email'
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        />
                        <Input 
                        label='Password'
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                        
                        />
                    </View>
                    <LoadingButton 
                     title='Login'
                     style={styles.btnSheet}
                     onPress={handleLogin}
                     text
                     disabled={isButtonDisabled}
                    />
                    </View>
                    </BottomSheetView>
                </BottomSheetModal>
            </View>
            </TouchableWithoutFeedback>
            <LoadingButton
                title='Login'
                onPress={handlePresentModalPress}
                style={styles.btn}
            ></LoadingButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2F50C1',
        padding: 20,
        position: 'relative',
    },
    header: {
        color: '#FFFFFF',
        fontSize: 27,
        fontWeight: 'bold',
        letterSpacing: 3
    },
    img: {
        width: 30,
        height: 24,
        marginRight: 4
    },
    contentContainer: {
        flex: 1,
        padding: 10,
        position: 'relative',
    },
    btn: {
        position: 'absolute',
        bottom: 15,
        width: "100%",
        backgroundColor: "white",
        borderRadius: 5
    },
    btnSheet: {
        position: 'absolute',
        top: 550,
        width: "100%",
        backgroundColor: "#2F50C1",
        borderRadius: 5,
        left: 15,
    },
    loginTxt: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginTop: 15,
    },
    containerView: {
        paddingHorizontal: 15,
        marginTop: 10,
    },
    desc: {
        marginTop: 15,
        color: "#757281",
        fontSize: 18,
        lineHeight: 21,
    },
    btnText: {
        fontSize: 16,
       fontWeight: 'bold',
       color: "#2F50C1",
    },
   
});