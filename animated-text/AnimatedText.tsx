import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useState} from "react";
import {useDerivedValue, useSharedValue, withTiming} from "react-native-reanimated";
import {ReText} from "react-native-redash";
import {Canvas, RadialGradient, SweepGradient, Text as SkiaText, useFont, vec} from "@shopify/react-native-skia";
import {useFonts} from "expo-font";
import {StatusBar} from "expo-status-bar";
const AnimatedText = () => {
   // const [count, setCount] = useState(0);

    const count = useSharedValue(0)

    const countString = useDerivedValue(() =>{
        return Math.floor(count.value).toString()
    },[count])

    const fontSize = 80
    const font = useFont(
         require('./assets/fonts/JetBrainsMono-Bold.ttf'),
        fontSize
    );

    const canvasWidth = 200;
    const canvasHeight = 200;

    const x = useDerivedValue(() => {
        return canvasWidth / 2 - (font?.measureText(countString.value).width ?? 0) / 2 ;
    },[font])

    const y = useDerivedValue(() => {
        return canvasHeight / 2 + fontSize / 3;
    },[])


    const c = useDerivedValue(() => {
        return vec(x.value, y.value);
    })
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            {/*<Text style={styles.count}>{count.value}</Text>*/}
            {/*<ReText style={styles.count} text={countString} />*/}
            <Canvas style={{
                width: canvasWidth,
                height: canvasHeight,
            }}>
                <SkiaText font={font} text={countString} color={"#000 "} x={x} y={y} >
                    <SweepGradient
                        c={c}
                        colors={["cyan", "magenta", "yellow", "cyan"]}
                    /></SkiaText>

            </Canvas>
            <TouchableOpacity onPress={()=>{

                count.value = withTiming((Math.random() * 100), {duration: 1000});
               // setCount(nextCount);
            }} style={styles.floatingButton} >
                <FontAwesome name="random" size={24} color="#000" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',

    },
    count:{
        fontSize: 80,
        fontWeight: 'bold',
        fontFamily: 'JetBrainsMono-Bold',
        width: 300,
        textAlign: 'center',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 48,
        right: 32,
        width: 64,
        aspectRatio: 1,
        borderRadius: 32,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default AnimatedText;
