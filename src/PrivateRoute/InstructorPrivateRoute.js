import React from "react";
import { Navigate } from "react-router-dom";

const InstructorPrivateRoute = ({children})=>{
    const token = window.localStorage.getItem('insto');
    return token ? children : <Navigate to="/instructor-homepage"/>
}

export default InstructorPrivateRoute;