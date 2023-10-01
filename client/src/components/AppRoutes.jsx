import React from "react";
import { Routes, Route } from "react-router-dom";

// components
import Main from "./Main";
import Chat from "./Chat";

const appRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/chat" element={<Chat/>} />
    </Routes>
  )
} 

export default appRoutes