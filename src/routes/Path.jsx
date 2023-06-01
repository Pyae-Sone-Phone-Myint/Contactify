import React from "react";
import { Route, Routes } from "react-router-dom";
import Home_page from "../pages/Home_page";
import CreateContact_page from "../pages/CreateContact_page";
import EditContact_page from "../pages/EditContact_page";
import Contact_detail from "../pages/details/contact_detail/Contact_detail";

const Path = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home_page />} />
        <Route path="/contacts/create" element={<CreateContact_page />} />
        <Route path="/contacts/edit/:id" element={<EditContact_page />} />
        <Route path="/contacts/:id" element={<Contact_detail />} />
      </Routes>
    </>
  );
};

export default Path;
