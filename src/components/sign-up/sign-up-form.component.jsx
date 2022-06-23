import { useState } from "react";

import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields,setFormFields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = formFields;

    console.log(formFields)

    const resetFormField =() =>{
        setFormFields(defaultFormFields);
    } 

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(password !== confirmPassword){
            alert("password do not match");
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            
            await createUserDocumentFromAuth(user,{displayName})

            resetFormField();

        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert("email already used");
            }else{
                console.log('hay un error',error)
            }
        }


    }

    const handleChange = (event)=>{
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value});
    }

    return(
        <div>
            <h2>Dont have an account?</h2>
            <span>sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
            <FormInput label ="Display name" type="text" required onChange={handleChange} name="displayName" value={displayName}></FormInput>
            <FormInput label ="Email" type="email" required onChange={handleChange} name="email" value={email}></FormInput>
            <FormInput label ="Password" type="password" required onChange={handleChange} name="password" value={password}></FormInput>
            <FormInput label ="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}></FormInput>
            <Button type="submit">Login</Button>
            </form>
        </div>
    )
}

export default SignUpForm;