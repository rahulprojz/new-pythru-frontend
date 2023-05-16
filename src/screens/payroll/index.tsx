import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Payroll(){
const Navigate = useNavigate();
    useEffect(()=>{
        let baseUrl = import.meta.env.VITE_APP_PAYROLL_REDIRECT_URL;
        let url = `${baseUrl}/?token=${sessionStorage.accessToken}`;
        console.log("============here redirect============", url);
            window.open(url, '_blank', 'noopener,noreferrer');
Navigate("/dashboard");

    },[])
    
    
    return(
        <div><h1>Redirecting to payroll..</h1></div>
    );
}

export default Payroll;