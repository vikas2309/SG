import React,{useRef,useEffect} from 'react';
import { ScrollView, StyleSheet,View,Animated,Dimensions } from 'react-native';
import FormHeader from './app/components/FormHeader';
import FormSelectorBtn from './app/components/FormSelectorBtn';
import LoginForm from './app/components/LoginForm';
import SignupForm from './app/components/SignupForm';
import axios from 'axios';
import ImageUpload from './app/components/ImageUpload';

const {width} = Dimensions.get('window')

export default function App(){
  const animation = useRef(new Animated.Value(0)).current;
  const scrollView = useRef();

  const fetchApi = async ()=>{
    try{
      const res = await axios.get('http://192.168.29.161:8000/');
      console.log(res.data);
    }
    catch(error){
      console.log(error.message);
    }
  };

  useEffect(()=>{
    fetchApi()
  },[])

  const rightHeaderOpacity = animation.interpolate({
    inputRange:[0,width],
    outputRange:[1,0]
  })

  const leftHeaderTranslateX = animation.interpolate({
    inputRange:[0,width],
    outputRange:[0,40]
  })

  const rightHeaderTranslateY = animation.interpolate({
    inputRange:[0,width],
    outputRange:[0,-20]
  })

  const logincolorInterpolate = animation.interpolate({
    inputRange:[0,width],
    outputRange:['rgba(27,27,51,1)','rgba(27,27,51,0.4)']
  })

  const signupcolorInterpolate = animation.interpolate({
    inputRange:[0,width],
    outputRange:['rgba(27,27,51,0.4)','rgba(27,27,51,1)']
  })

  // return(
  //   //Heading
  //   <View style={{flex:1,paddingTop:120}}>
  //     <View style={{height:100}}>
  //       {/* <Text>Vikas</Text> */}
  //       <FormHeader leftHeading='Welcome 'rightHeading='Back' subHeading='Subtitle Generator...' rightHeaderOpacity={rightHeaderOpacity} leftHeaderTranslateX={leftHeaderTranslateX} rightHeaderTranslateY={rightHeaderTranslateY}/>
  //     </View>

      
  //     <View style={{flexDirection:'row',paddingHorizontal:20,marginBottom:20}}>
  //       <FormSelectorBtn style={styles.borderLeft} 
  //       backgroundColor={logincolorInterpolate} 
  //       title='Login' 
  //         onPress={()=>scrollView.current.scrollTo({x:0})}
  //       />
  //       <FormSelectorBtn style={styles.borderRight} 
  //       backgroundColor={signupcolorInterpolate} 
  //       title='Signup' 
  //       onPress={()=>scrollView.current.scrollTo({x:width})}
  //       />
  //     </View>


  //     <ScrollView 
  //     ref={scrollView}
  //     horizontal 
  //     pagingEnabled 
  //     showsHorizontalScrollIndicator = {false} 
  //     scrollEventThrottle={16} 
  //     onScroll={Animated.event([{nativeEvent:{contentOffset:{x:animation}}}],{useNativeDriver:false})}>
  //     <LoginForm />
  //     <ScrollView>
  //     <SignupForm /> 
  //     </ScrollView>
      
  //     </ScrollView>
  //   </View>
  // );

  return <ImageUpload />
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderLeft:{
    borderTopLeftRadius:8,
    borderBottomLeftRadius:8
  },
  borderRight:{
    borderTopRightRadius:8,
    borderBottomRightRadius:8
  },
});
