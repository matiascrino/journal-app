import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();



export const signInWithGoogle = async() => {

    try{
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true, 
            displayName,
            email,
            photoURL,
            uid
        }
        

    }catch(err){
        const errorCode = err.code;
        const errorMessage = err.message;


        return {
            ok: false,
            code: errorCode,
            message: errorMessage
        }
    }
}


export const registerUserWithEmailAndPassword = async({email, password, displayName}) => {

    try{

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid } = resp.user;
        
        await updateProfile(FirebaseAuth.currentUser, {
            displayName
        })

        return {
            ok: true,
            uid,
            displayName,
            email,
        }


    }catch(error){
        return {
            ok: false,
            errorMessage: error.message,
        }
    }

}


export const loginWithEmailAndPassword = async({email, password}) => {

    try{
        

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, displayName } = resp.user;

        return {
            ok: true,
            uid,
            displayName,
            email,
        }


    }catch(error){
        return{
            ok: false,
            errorMessage: error.message,}
    }

}

export const logoutFirebase = async() => {
    try{
        await FirebaseAuth.signOut();
        return {
            ok: true,
        }
    }catch(error){
        return {
            ok: false,
            errorMessage: error.message,
        }
    }
}
