import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'


function Auth() {

    let getToken = localStorage.getItem('token');


    return(

        getToken !== null ? <Outlet/> : <Navigate to="/"/>
    )
}

export default Auth;