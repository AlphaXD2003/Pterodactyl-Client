import React, { useCallback } from 'react'

import {useDispatch} from 'react-redux'
import { removeUserId , logout as storeLogout} from '../store/userSlice';

const useLogout = () => {
  
    const dispatch = useDispatch()
    const logout = useCallback(()=>{
        localStorage.removeItem('email')
        localStorage.removeItem('password')
        dispatch(removeUserId())
        dispatch(storeLogout())
    },[ dispatch])
    return logout;
}

export default useLogout;