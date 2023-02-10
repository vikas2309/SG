import React from 'react';
import { View, Text ,StyleSheet,TouchableWithoutFeedback,Animated} from 'react-native';


const FormSelectorBtn = ({backgroundColor,title,style,onPress}) =>{
    return <TouchableWithoutFeedback onPress={onPress}>
    <Animated.View style={[styles.container,style, {backgroundColor}]}>
      <Text style={styles.title}>{title}</Text>
    </Animated.View>
  </TouchableWithoutFeedback>
}

const styles = StyleSheet.create({
    container:{
        height:45,
        width:'50%',
        backgroundColor:'rgba(27,27,51,1)',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{color:'white',fontSize:16}
})

export default FormSelectorBtn;