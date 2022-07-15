import { useState } from "react";

import { signInWithGooglePopup,createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields,setFormFields] = useState(defaultFormFields);
    const {email,password} = formFields;

    const resetFormField =() =>{
        setFormFields(defaultFormFields);
    } 

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        try{
            await signInAuthUserWithEmailAndPassword(email,password);
            resetFormField();
        }catch(error){
            switch (error.code) {
                case "auth/wrong-password":
                    alert('contraseña incorrecta');
                    break;
                case "auth/user-not-found":
                    alert('correo no existe');
                    break;
                default:
                    console.log(error);
                    break;
            }
        }


    }

    const handleChange = (event)=>{
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value});
    }

    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
            <FormInput label ="Email" type="email" required onChange={handleChange} name="email" value={email}></FormInput>
            <FormInput label ="Password" type="password" required onChange={handleChange} name="password" value={password}></FormInput>
            <div className='buttons-container'>
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
            </div>
            </form>
        </div>
    )
}

export default SignInForm;