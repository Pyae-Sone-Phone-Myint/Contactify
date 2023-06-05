import React from "react";
import ContactTable from "../contacts/ContactTable";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const {token}=useSelector((state)=>state.authSlice);
  if (!token) {
    return <Navigate to={'/'}/>
  }else{
    return (
      <div className=" md:w-[80%] w-[90%] mx-auto  lg:m-0">
        <ContactTable />
      </div>
    );
  }
};

export default Dashboard;
