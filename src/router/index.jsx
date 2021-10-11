import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouterSwitch from "./switch";
import NavBar from '../components/navbar/navbar'
export default function appRouter() {
    return (
        <Router>
            <NavBar />
            <RouterSwitch />
            {/* Buraya footer'ıda ekle */}
        </Router>
    )
}