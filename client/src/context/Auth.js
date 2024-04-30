import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const Authcontext = createContext();

const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState({
        user : null,
        token : ""
    });
    //make default token
    axios.defaults.headers.common["Authorization"] = auth?.token
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('auth'))
        if(data){
            setAuth({
                ...auth,
                user : data.user,
                token : data.token
            })
        }
    },[])
    return (
        <Authcontext.Provider value={[auth,setAuth]}>
            {children}
        </Authcontext.Provider>
    )  
}

//custom hook
const useAuth = () => useContext(Authcontext);
export {useAuth,AuthProvider}