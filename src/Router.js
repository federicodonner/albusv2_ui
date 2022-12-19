import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./login/Login";
import Register from "./register/Register";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
