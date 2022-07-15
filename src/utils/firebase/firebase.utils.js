import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'

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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) =>{
    if(!userAuth) return;
    const userDocRef = doc(db,'users',userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName,email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{displayName,email,createdAt,...additionalInformation});
        }catch(error){
            console.log("error creating the user",error.message)
        }
    }
    
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email ||!password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email ||!password) return;
    return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async () => await signOut (auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);