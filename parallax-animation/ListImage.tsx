import {Dimensions, Image, StyleProp, View, ViewStyle} from "react-native";
import React from "react";
import Animated, {interpolate, SharedValue, useAnimatedStyle} from "react-native-reanimated";

type ListImageProps = {
    uri:string;
    imageWidth:number;
    style:StyleProp<ViewStyle>;
    scrollOffset:SharedValue<number>;
    index:number;
    itemWidth : number;
}

const {width:screenWidth} = Dimensions.get('window');
const ListImage : React.FC<ListImageProps> = ({
    uri:imageURI,
    imageWidth:imageWidth,
    style,
    scrollOffset,
    index,
    itemWidth
                                              }) => {

    const rImageStyle = useAnimatedStyle(()=>{
        const translateX = interpolate(
            scrollOffset.value,
            [
                itemWidth *  (index-1),
                itemWidth * index,
                itemWidth * (index +1)
            ],
            [
                -screenWidth/2,
                0,
                screenWidth/2
            ]
        )
        return {
            transform :[
                {
                    scale:1.8
                },
                {
                    translateX : translateX
                }
            ]
        }
    },[])

    const rContainerStyle = useAnimatedStyle(()=>{
        const outputRange = [1,1.5,1]
        const scale = interpolate(
            scrollOffset.value,
            [
                itemWidth *  (index-1),
                itemWidth * index,
                itemWidth * (index +1)
            ],
            outputRange

        )
        return {
            transform : [
                {
                    scale :scale
                }
            ]
        }
    })
    return (
        <Animated.View style={[style,{
            overflow:'hidden',
            borderRadius:20,
        }]}>
        <Animated.Image
            resizeMode="cover"
            key={imageURI}
            source={{
                uri:imageURI
            }}
            style={[{width:imageWidth, aspectRatio:0.6,},rImageStyle]}
        />
        </Animated.View>
    )
}

export default ListImage;
