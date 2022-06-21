import { initializeApp } from 'firebase/app'
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc, Firestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDH1KckYOoA3qgZ1c2-wieYPU1VDwXV5tk",
    authDomain: "crwn-clothing-db-fff99.firebaseapp.com",
    projectId: "crwn-clothing-db-fff99",
    storageBucket: "crwn-clothing-db-fff99.appspot.com",
    messagingSenderId: "437133560296",
    appId: "1:437133560296:web:d68a04aead0f8b2adefc5d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc(db,'users',userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName,email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{displayName,email,createdAt});
        }catch(error){
            console.log("error creating the user",error.message)
        }
    }
    
    return userDocRef;
}