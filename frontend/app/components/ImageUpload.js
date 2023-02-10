import React from "react";
import {View,StyleSheet, Text,TouchableOpacity} from 'react-native';

const ImageUpload = () =>{
    
    return (
        <View style = {styles.container}>
            <View>
                <TouchableOpacity style={styles.uploadBtnContainer}>
                    <Text style={styles.uploadBtn}>
                        Upload Profile
                    </Text>
                </TouchableOpacity>
                <Text style={styles.skip}>Skip</Text>
            </View>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    uploadBtnContainer:{
        height:150,
        width:150,
        borderRadius:150/2,
        justifyContent:'center',
        alignItems:'center',
        borderStyle:'dashed',
        borderWidth:1,
    },
    uploadBtn:{
        textAlign:'center',
        fontSize:18,
        opacity:0.3,
        fontWeight:'bold'
    },
    skip:{
        textAlign:'center',
        // marginTop:20,
        padding:10,
        fontWeight:'bold',
        fontSize:16,
        textTransform:'uppercase',
        letterSpacing:2,
        opacity:0.7,
    }
});

export default ImageUpload;