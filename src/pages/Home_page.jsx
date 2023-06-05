import React from "react";
import ContactTable from "../components/contacts/ContactTable";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";


const Home_page = () => {
  const {token}=useSelector((state)=>state.authSlice)
  if (token===null) {
    return <Navigate to={'/login'}/>
  }else if(token!==null){
    return <Navigate to={'/dashboard'}/>
  }
};

export default Home_page;
