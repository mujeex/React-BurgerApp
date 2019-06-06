import {put,delay,call} from 'redux-saga/effects'
// import {delay} from 'redux-saga/effects'
import * as actions from '../actions/auth'
import axios from 'axios'
// import createSagaMiddleware from 'redux-saga';

export function* logoutSaga (action){
    yield call([localStorage,'removeItem'], "token")
    yield call([localStorage,'removeItem'], "expirationDate")
    yield call([localStorage,'removeItem'], "userId")
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga (action){
    yield delay(action.expirationTime*1000)
    yield put(actions.logout())
   
}

export function* authSaga (action){

        yield put(actions.authStart());
        const authData = {
            email: action.email,
            password: action.password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBcuD1-tbdGUe6EOKAmBzxHEDlbJcT2YQo';
        if (!action.isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBcuD1-tbdGUe6EOKAmBzxHEDlbJcT2YQo';
        }
        try{
       const response= yield axios.post(url, authData)
             const expirationDate= yield new Date(new Date().getTime()+ response.data.expiresIn * 1000)
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('expirationDate',expirationDate)
            localStorage.setItem('userId',response.data.localId)
                yield put(actions.authSuccess(response.data.idToken, response.data.localId));
                yield put(actions.checkAuthTimeout(response.data.expiresIn));
        }
            catch (err){
                yield put(actions.authFail(err.response.data.error));
            };
    };

    
export function* authCheckStateSaga(){

        const token= yield localStorage.getItem('token')
        if(!token){
            yield put(actions.logout())
        }else{
            const expirationDate= yield new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                yield put(actions.logout())
            }else{
                const userId= yield localStorage.getItem('userId')
                yield put(actions.authSuccess(userId,token))
                yield put(actions.checkAuthTimeout((expirationDate.getTime()- new Date().getTime())/1000))
            }
           
        }

    }
