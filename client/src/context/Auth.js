// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";

// const Authcontext = createContext();

// const AuthProvider = ({children}) => {
//     // const [auth,setAuth] = useState({
//     //     user : null,
//     //     token : ""
//     // });

//     const [auth,setAuth] = useState(() => {
//         const userLogin = JSON.parse(localStorage.getItem('auth'));
//         return { users : userLogin || null };
//     })

//     console.log(auth);
    

//     //make default token
//     axios.defaults.headers.common["Authorization"] = auth?.token
//     useEffect(()=>{
//         if(auth.token){
//             localStorage.setItem('auth',JSON.stringify(auth)) 
//         }
//         // const data = JSON.parse(localStorage.getItem('auth'))
//         // if(data){
//         //     setAuth({
//         //         ...auth,
//         //         user : data.user,
//         //         token : data.token
//         //     })
//         // }
//     },[auth])
//     return (
//         <Authcontext.Provider value={[auth,setAuth]}>
//             {children}
//         </Authcontext.Provider>
//     )  
// }

// //custom hook
// const useAuth = () => useContext(Authcontext);
// export {useAuth,AuthProvider}


import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const userLogin = JSON.parse(localStorage.getItem("auth"));
    return userLogin || { user: null, token: "" };
  });

  // Set the default Authorization token 
  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = auth.token;  
    }
  }, [auth?.token]);

  // Save auth state in localStorage when it changes
  useEffect(() => {
    if (auth?.user && auth?.token) {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
