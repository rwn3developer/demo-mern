import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/Auth'
import { Outlet , Navigate} from 'react-router-dom';

const Private = () => {

    const [auth,setAuth] = useAuth();

  return (
        auth?.token && auth?.user?.role === "admin" ? <Outlet/> : <Navigate to={'/login'}/>
        
  )
}

export default Private
