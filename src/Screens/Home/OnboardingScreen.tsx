import React from "react";
import { View, Text, StatusBar, StyleSheet, Image, ImageBackground } from "react-native";
import Onboarding from 'react-native-onboarding-swiper';
import { OnboardFlow } from 'react-native-onboard';
import { Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
const OnboardingScreen = () => {
    const navigation = useNavigation();
    const handleDone = () => {
        navigation.navigate('Home')
    }
    return (
        <View style={styles.container}>
            <Onboarding
                onDone={handleDone}
                containerStyles={{ paddingHorizontals: 15 }}

                pages={[
                    {
                        backgroundColor: '#fff',
                        image:
                            <Image resizeMode="contain" style={styles.image} source={require('../../../assets/on1.png')}></Image>
                        ,
                        title: 'Onboarding',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    {
                        backgroundColor: '#fff',
                        image:
                            <Image resizeMode="contain" style={styles.image} source={require('../../../assets/on2.png')}></Image>
                        ,
                        title: 'Onboarding',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    {
                        backgroundColor: '#fff',
                        image:
                            <Image resizeMode="contain" style={styles.image} source={require('../../../assets/on3.png')}></Image>
                        ,
                        title: 'Onboarding',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    //   ...
                ]}
            />
        </View>


    )

};
export default OnboardingScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    image: {
        marginTop: 175,
        justifyContent: 'center',
        width: Dimensions.get('window').width,
    },
    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000c0',
    },
});
