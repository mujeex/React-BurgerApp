import axios from 'axios'
import * as actionTypes from './actionTypes'

export const authStart = () =>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess= (localId,token) =>{
    //storing token and expiration time in local storage
    return{
        type:actionTypes.AUTH_SUCCESS,
        userId:localId,
        idToken:token,
    }
}

export const authFail= (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error
    }
}


export const auth = (email, password,isSignUp)=> {
    return dispatch=>{
        dispatch(authStart())
        const authData={
            email: email,
            password:password,
            returnSecurityToken:true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBcuD1-tbdGUe6EOKAmBzxHEDlbJcT2YQo';
        if (!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBcuD1-tbdGUe6EOKAmBzxHEDlbJcT2YQo';
        }
        axios.post(url,authData)
        .then(response=>{
            console.log(response)
            const expirationDate= new Date(new Date().getTime()+ response.data.expiresIn * 1000)
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('expirationDate',expirationDate)
            localStorage.setItem('userId',response.data.localId)
            dispatch(authSuccess(response.data.localId,response.data.idToken))
            dispatch(checkAuthTimeOut(response.data.expiresIn))
        })
        .catch(err=>{
            console.log(err)
            dispatch(authFail(err.response.data.error))
        })
        

    }

}

export const logout = ()=> {
    //removing token and expiry date from local storage
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expirationTime)=>{
    return dispatch=>{
        console.log(expirationTime)
        setTimeout(()=>{
            dispatch(logout())
        },expirationTime* 1000 )
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token= localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate= new Date(localStorage.getItem('expirationDate'));
            if(expirationDate> new Date()){
                dispatch(logout())
            }else{
                const userId= localStorage.getItem('userId')
                dispatch(authSuccess(userId,token))
                dispatch(checkAuthTimeOut(expirationDate.getSeconds()- new Date().getSeconds))
            }
           
        }

    }
}