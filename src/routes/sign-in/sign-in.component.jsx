
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { auth,signInWithGooglePopup,signInWithGoogleRedirect,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import SignUpForm from '../../components/sign-up/sign-up-form.component';

const SignIn = () => {
    /*useEffect(() => {
        async function functAux(){
            const response = await getRedirectResult(auth);
            if(response){
                const userDocRef = await createUserDocumentFromAuth (response.user);
            }
        }
        
        functAux();
    },[])*/

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth (user);
    }

    return(<div>
        <h1>Sign in page</h1>
        <button onClick={logGoogleUser}>Sign In With Google Popup</button>
        {/* <button onClick={signInWithGoogleRedirect}>Sign In With Google Redirect</button> */} 
        <SignUpForm></SignUpForm>
    </div>)
}

export default SignIn;