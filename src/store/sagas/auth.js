import { put, delay } from 'redux-saga/effects';
import * as actions from '../actions/index'
import axios from 'axios';

export function* logoutSaga (action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationTime');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga (action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true,
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB2Edi3vbatkKkh6wHY5-tAUMJ7IOpqlpg'; 
    if (!action.isSignup){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB2Edi3vbatkKkh6wHY5-tAUMJ7IOpqlpg'
    }

    try {
    const  res = yield axios.post(url, authData)  // When generator authUserSaga is called , it will wait for this axios call to finish , just like async await call
    
    // yield in synchronous call is optional
    const  expirationDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000)
    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId',res.data.localId)
    console.log('It is good here')
    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));
    }catch(err){ 
        yield put(actions.authFail({error:'This is a error'}));
    };
}