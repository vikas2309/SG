import React,{useState} from 'react';
import {Text,View,StyleSheet,Dimensions, TextInput} from 'react-native';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import { isValidEmail,isValidObjField,updateError } from '../utils/methods';
import client from '../api/client';

const LoginForm=() =>{

    const [userInfo,setUserInfo] = useState({
        email:'',
        password:''
    })

    const [error,setError] = useState('');

    const {email,password} = userInfo;
    

    const handleOnChangeText=(value,fieldName) =>{
        setUserInfo({...userInfo,[fieldName]:value});
    };


    const isValidForm = ()=>{
        // we will accept only if all of the fields have value
        if(!isValidObjField(userInfo)){
            return updateError('Required all fields!',setError);
        }

        // only valid email id is allowed
        if(!isValidEmail(email)){
            return updateError('Invalid Email!',setError);
        }
        // password must have 8 or more characters
        if(!password.trim() || password.length<8){
            return updateError('Password is too short!',setError);
        }
        return true;

    }

    const submitForm = async()=>{
        if(isValidForm()){
            console.log('running');
            try{
                const res = await client.post('/sign-in',{...userInfo});
                console.log(res.data);
                if(res.data.success){
                    setUserInfo({email:'',password:''});
                }
            }
            catch(error){
                console.log(error.message);
            }
        }
    }



    return (
        <FormContainer>
            {error ? <Text style={{color:'red',fontSize:18,textAlign:'center'}}>{error}</Text>:null}
            <FormInput 
            value= {email}
            onChangeText={(value)=>handleOnChangeText(value,'email')} 
            label= 'Email' 
            autoCapitalize='none'
            placeholder='example@email.com'
            />

            <FormInput 
            value={password}
            onChangeText={(value)=>handleOnChangeText(value,'password')} 
            label= 'Password' 
            autoCapitalize='none'
            secureTextEntry 
            placeholder='********'
            />
            <FormSubmitButton onPress={submitForm} title='Login'/>
        </FormContainer>
    )
}

const styles = StyleSheet.create({
})

export default LoginForm;