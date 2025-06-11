import { StatusBar } from 'expo-status-bar';
import { use } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { cancelAnimation, Easing, useAnimatedReaction, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';


const CircleRaidus = 30;
export default function App() {

  const left = useSharedValue(0);
  const top = useSharedValue(0);
  const previousLeft = useSharedValue(0);
  const previousTop = useSharedValue(0);
  const scale = useSharedValue(0);


  const tapGesture = Gesture.Tap().onBegin((event) => {
    console.log('tapGesture', event);
    previousLeft.value = left.value;
    previousTop.value = top.value;
    left.value = event.x - CircleRaidus;
    top.value = event.y - CircleRaidus;
  }); 

  const rStyles = useAnimatedStyle(() => {
    return {
     left: left.value, 
     top: top.value, 
     
      
    };
  },[]);

  const animatedLeft = useDerivedValue(() => {
    return withTiming(left.value,{
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
    });
  });

  const animatedTop = useDerivedValue(() => {
     return withTiming(top.value,{
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
    });
  });

  const rMagicCircleStyles = useAnimatedStyle(() => {
    return {
      left: animatedLeft.value, 
      top: animatedTop.value,
  
    };
  }, []);

  const rPreviousStyles = useAnimatedStyle(() => {
    return {  
      left:previousLeft.value, 
      top: previousTop.value, 
    
    };
  },[]);

  useAnimatedReaction(()=>{
    return left.value;
  },(curr,prev)=>{
      if(curr !== prev && curr !== 0){
        cancelAnimation(scale);
        scale.value = 0;
        scale.value = withSpring(1,{
          mass: 0.5,
        });
      }
  })

  return (
    <GestureDetector gesture={tapGesture}>
    <Animated.View style={styles.container}>
      
      <StatusBar style="light" />
      <Animated.View style={[styles.baseCircle, rStyles]} />
      <Animated.View style={[styles.baseCircle, rPreviousStyles]} />
       <Animated.View style={[styles.baseCircle, rMagicCircleStyles, {
        backgroundColor: '#f00',
        
       }]} />
     
    </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    
  },
  baseCircle: {
    width: CircleRaidus * 2,
    height: CircleRaidus * 2,
    borderRadius: CircleRaidus,
    backgroundColor: '#2f2f2f',
    position: 'absolute',
  }
});
