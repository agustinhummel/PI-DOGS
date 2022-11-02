import React from "react";
import { Link } from "react-router-dom";
import '../style/card.css'

export default function Card({ id, name, weight_Min, weight_Max, image, temperament }) {
    if (temperament === undefined) {
        temperament = 'no exite temperamento asociado'
    }
    return (
        <div className="dogs" >

            <div className="genrescointainer">
                <img className="img" src={image} alt="img not found" />
            </div>
            <div className="namecointainer">
                <h2 className="gamesName">{name}</h2>
            </div>
            <div className="genrescointainer">
                <h3 className="genres">Weight Min: {weight_Min}kg | Weight Max: {weight_Max}kg</h3>
            </div>
            <div className="genrescointainer">
                <h4 className="genres">Temperament: {temperament}</h4>
            </div>
            <Link to={`/dogs/${id}`}>
                <button className="btn">+ info</button>
            </Link>
        </div >

    )
}