import React from "react";
import { Link } from "react-router-dom";
import '../style/landing.css'

export default function landingPage() {
    return (
        <div className="landing">
            <h1 className="welcomeMsg">Bienvenidos al Mundo de los Perros</h1>
            <Link to='/home' >
                <button className="homeButton">-  I  n  g  r  e  s  a  r  -</button>
            </Link>
        </div>
    )
}