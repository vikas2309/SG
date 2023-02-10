import React ,{useState} from "react";
import {View,StyleSheet,Text} from 'react-native';
import FormContainer from "./FormContainer";
import FormSubmitButton from "./FormSubmitButton";
import FormInput from "./FormInput";
import { isValidObjField,updateError,isValidEmail } from "../utils/methods";
import { Formik } from "formik";
import * as Yup from 'yup';
import client from "../api/client";

const validationSchema = Yup.object({
    fullname:Yup.string().trim().min(3,'Invalid Name!').required('Name is required!'),
    email:Yup.string().email('Invalid email!').required('email is required!'),
    password:Yup.string().trim().min(8,'password is too short!').required('password is required!'),
    confirmPassword : Yup.string().equals([Yup.ref('password'),null],'password does not match!')
});

const SignupForm=() =>{

    const userInfo = {
        fullname:'',
        email:'',
        password:'',
        confirmPassword:'',
    };

    const [error,setError] = useState('');

    const {fullname,email,password,confirmPassword} = userInfo;

    const handleOnChangeText=(value,fieldName) =>{
        setUserInfo({...userInfo,[fieldName]:value});
    };

    const isValidForm=()=>{
        // we will accept only if all of the fields have value
        if(!isValidObjField(userInfo)){
            return updateError('Required all fields!',setError);
        }
        // if valid name with 3 or more characters
        if(!fullname.trim()||fullname.length<3){
            return updateError('Invalid name!',setError);
        }
        // only valid email id is allowed
        if(!isValidEmail(email)){
            return updateError('Invalid Email!',setError);
        }
        // password must have 8 or more characters
        if(!password.trim() || password.length<8){
            return updateError('Password is less than 8 characters!',setError);
        }
        // password and confirm password must be the same
        if(password!==confirmPassword){
            return updateError('Password does not match!',setError);
        }
        return true;
    }

    const sumbitForm=()=>{
        if(isValidForm())
            console.log(userInfo);
    }

    const signUp = async (values,formikActions) =>{
            const res = await client.post('/create-user',{
                ...values
            })
            console.log(res.data);
            formikActions.resetForm();
            formikActions.setSubmitting(false)
    }

    return(
        <FormContainer>
            <Formik initialValues={userInfo} 
            validationSchema={validationSchema} 
            onSubmit={signUp}>
                
                {({values,errors,touched,isSubmitting,handleChange,handleBlur,handleSubmit}) => {

                    const {fullname,email,password,confirmPassword} = values
                    return <>
                            <FormInput 
                                value={fullname}
                                error={touched.fullname && errors.fullname}
                                onChangeText={handleChange('fullname')}
                                onBlur={handleBlur('fullname')}
                                label='Full Name'
                                placeholder='John Smith'
                            />

                            <FormInput 
                                value={email}
                                error={touched.email && errors.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                autoCapitalize='none'
                                label='email'
                                placeholder='example@email.com'
                            />

                            <FormInput 
                                value={password}
                                error={touched.password && errors.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                autoCapitalize='none'
                                secureTextEntry
                                label='Password'
                                placeholder='********'
                            />

                            <FormInput 
                                value={confirmPassword}
                                error={touched.confirmPassword && errors.confirmPassword}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                autoCapitalize='none'
                                secureTextEntry
                                label='Confirm Password'
                                placeholder='********'
                            />

                            <FormSubmitButton submitting={isSubmitting} onPress={handleSubmit} title='Sign Up' />
                            
                        </>
                }}

            </Formik>

        </FormContainer>
    );
};


const styles = StyleSheet.create({ 
})

export default SignupForm;