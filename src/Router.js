import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./sections/login/Login";
import Register from "./sections/register/Register";
import Activity from "./sections/activity/Activity";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register/:materiaId" element={<Register />}></Route>
        <Route path="/activity/:alumnoId" element={<Activity />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
