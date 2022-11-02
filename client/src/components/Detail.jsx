import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions";
import { Link } from "react-router-dom";

import '../style/detail.css';


export default function Details(id) {
    const dogs = useSelector((state) => state.dogDetail)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    return (
        <div className="details">
            <img src={dogs?.image} alt="not found" />
            <div >
                <h1 >{dogs?.name} </h1>
                <h2 >TEMPERAMENT: {dogs.temperament}</h2>
                <h2 >HEIGHT: {dogs?.height_Min}cm | {dogs?.height_Max}cm</h2>
                <h2 >WEIGHT: {dogs?.weight_Min}kg {dogs?.weight_Max}kg</h2>
                <h2 >LIFE SPAN: {dogs?.life_span ? dogs?.life_span : 0} </h2>
            </div>
            <Link to="/home" > <button className="backButton">Volver al Inicio</button>  </Link>
        </div>


    );
}