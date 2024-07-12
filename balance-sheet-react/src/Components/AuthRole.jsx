import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'


function AuthRole() {

    let getToken = localStorage.getItem('tokenRole');


    return(

        getToken !== 'user' ? <Outlet/> : <Navigate to="/dashboard"/>
    )
}

export default AuthRole;