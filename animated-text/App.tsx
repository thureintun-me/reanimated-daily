import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// @ts-ignore
import JetBrainsMonoBold from './assets/fonts/JetBrainsMono-Bold.ttf'
import {useEffect, useState} from "react";
import * as Font from 'expo-font';
import AnimatedText from "./AnimatedText";
import {useFonts} from "expo-font";

export default function App() {



    const [loaded, error] = useFonts({
        'JetBrainsMono-Bold': require('./assets/fonts/JetBrainsMono-Bold.ttf'),
    });

    if (!loaded && !error) {
        return null;
    }

    return (
        <AnimatedText />
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
