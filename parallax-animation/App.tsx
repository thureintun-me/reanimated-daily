import { StatusBar } from 'expo-status-bar';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Images} from "./constant";
import ListImage from "./ListImage";
import Animated, {useAnimatedReaction, useAnimatedRef, useScrollViewOffset} from "react-native-reanimated";

const {width:WindowWith} = Dimensions.get('window');

const imageWidth = WindowWith * 0.8;
const listPadding = (WindowWith - imageWidth) / 2;
const itemInternalPadding = 10;
const itemContainerWidth = imageWidth + itemInternalPadding * 2;

export default function App() {

    const scrollRef = useAnimatedRef<Animated.ScrollView>()

    const scrollOffset = useScrollViewOffset(scrollRef)

    useAnimatedReaction(()=>{
        return scrollOffset.value
    },currentOffset=>{
        console.log(currentOffset)
    })
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <Animated.ScrollView
            ref={scrollRef}
            horizontal={true} style={{
            flex:1,
        }}
                    contentContainerStyle={{
                        alignItems: "center",
                        paddingLeft:listPadding,
                        paddingRight:listPadding

                    }}
                    snapToInterval={itemContainerWidth}
                    pagingEnabled={true}
                    decelerationRate="fast"
        >
            {
                Images.map((imageURI,index)=>{
                    return (
                        <ListImage itemWidth={itemContainerWidth} scrollOffset={scrollOffset} index={index} style={{
                            marginHorizontal:itemInternalPadding
                        }} uri={imageURI} key={imageURI} imageWidth={imageWidth} />
                    )
                })
            }
        </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
