import {
	signInWithGoogle,
	registerUserWithEmailAndPassword,
    loginWithEmailAndPassword,
    logoutFirebase,
} from "../../firebase/providers";
import { logout, login, checkingCredentials } from "./authSlice"
import { clearNotesLogout } from "../journal/journalSlice";



export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
    
        dispatch(checkingCredentials());

    
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
    
        dispatch(checkingCredentials());

        const result = await signInWithGoogle();

        if(!result.ok) return dispatch(logout(result.errorMessage))

        dispatch(login(result));

    
    }
}

export const startCreatingUserWithEmailAndPassword = ({email, password, displayName}) => {

    return async (dispatch) => {
    
        dispatch(checkingCredentials());

        const {ok, uid, errorMessage} = await registerUserWithEmailAndPassword({
					email,
					password,
                    displayName
				}); 
    
        if(!ok) return dispatch(logout({errorMessage}))

        dispatch(login({uid, email, displayName}));

    }


}


export const startLoginEmailAndPassword = ({email, password}) => {

    return async (dispatch) => {
    
        dispatch(checkingCredentials());

        const {ok, uid, displayName, errorMessage}= await loginWithEmailAndPassword({email, password});

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, email, displayName }));

    }

}

export const startLogOut = () => {
    return async (dispatch) => {
    
        const {ok} = await logoutFirebase();
        dispatch(clearNotesLogout());

        if(!ok) return dispatch(logout({errorMessage}))

        dispatch(logout({}));

    }
}
