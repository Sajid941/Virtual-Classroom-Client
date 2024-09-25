import React, { useContext } from 'react';
import { Navigate,useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const location=useLocation()

    if(loading){
        return <div className="flex items-center justify-center min-h-screen"><span className="loading loading-dots loading-lg"></span></div>
    }
    if(user){
        return children;
    }
    return (
        <Navigate state={location.pathname} to={'/signin'}></Navigate>
    );
};

export default PrivateRoute;