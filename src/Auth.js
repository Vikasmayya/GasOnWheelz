import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { firebaseAuth } from './Firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children}) =>{
    const [currentUser, setCurrentUser ] = useState(null);
    const [pending, setPending ] = useState(true);
    
    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
            // if(user){
            //     firestore.collection("USERS").doc(user.uid).get()
            //     .then(snapshot =>{
            //         const dbUser = snapshot.data();
            //     // default empty roles
            //     if (!dbUser.roles) {
            //         dbUser.roles = {};
            //     }
            //     // merge auth and db user
            //     user = {
            //         uid: user.uid,
            //         email: user.email,
            //         ...dbUser,
            //       };
            //       setCurrentUser(user);
            //       setPending(false)
            //       localStorage.setItem('role', user["role"]);
            //     //   console.log(user["role"])
            //     });
            // } else {
            //     setCurrentUser(null);
            // }
            setCurrentUser(user);
            setPending(false)
        });
     }, []);

     if (pending) {
         return <>
         <div style={{display: 'flex',alignItems: 'center',  justifyContent: 'center', height: "100vh", width: "100vw" }}>
         <CircularProgress style={{display: 'flex',alignItems: 'center',  justifyContent: 'center'}} color="primary" size={50} thickness={5}/>
         </div>
         </>
     }
        return (
            <AuthContext.Provider
            value={{currentUser}}>{children}
            </AuthContext.Provider>
        );
};