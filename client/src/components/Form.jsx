import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewDogs, getTemperament } from "../redux/actions";
import { Link, useHistory } from "react-router-dom";

import '../style/form.css';



export default function Form() {
    const alltemperament = useSelector((state) => state.temperament)

    const dispatch = useDispatch();
    const history = useHistory();

    const [input, setInput] = useState({
        name: '',
        height_Min: '',
        height_Max: '',
        weight_Min: '',
        weight_Max: '',
        life_span: '',
        temperament: [],
        image: ''
    })

    const [temp, setTemp] = useState('')

    useEffect(() => {
        dispatch(getTemperament())
    }, [dispatch])

    const [errors, setErrors] = useState({})

    const handleInput = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value
            })
        )
    }

    const handleSelect = function () {
        const value = { ...input, temperament: [...input.temperament, temp] }
        setInput(value)
        setTemp('')
    }

    const handleTemp = function (e) {
        const value = e.target.value
        setTemp(value)
    }

    const deleteFromList = function (e) {
        const newlist = input.temperament.filter(t => t !== e.target.value)
        setInput({ ...input, temperament: newlist })

    }

    const submit = function (e) {
        e.preventDefault();
        if (
            input.name && input.name !== " " &&
            input.image &&
            input.height_Max < 20 &&
            input.height_Min > 0 &&
            input.weight_Max < 20 &&
            input.weight_Min > 0 &&
            input.life_span &&
            input.temperament.length
        ) {
            dispatch(postNewDogs({ ...input, temperament: input.temperament.toString() }));
            alert(`"${input.name} se creo correctamente" `)
            setInput({
                name: '',
                height_Min: '',
                height_Max: '',
                weight_Min: '',
                weight_Max: '',
                life_span: '',
                temperament: [],
                image: ''
            });
            history.push('/home')
        } else {
            alert(`Faltan datos requeridos`)
        }
    }

    return (
        <div className="Create">
            <div className="CreationForm">
                <div className="form" >
                    <form onSubmit={(e => submit(e))}>
                        <h1 className="msg">CREATE NEW DOG</h1>
                        <div className="Creation-FormElement">
                            <label className="Creation-Label" >Name: </label>
                            <input className={errors.name && 'Creation-Input'} type="text" name="name" onChange={(e => handleInput(e))} value={input.name} />
                            {errors.name && <p className="errors">{errors.name}</p>}
                        </div>
                        <div className="Creation-FormElement">
                            <label className="Creation-Label">Height Min: </label>
                            <input className={errors.height_Min && 'Creation-Input'} type="number" min="0" max='20' name="height_Min" onChange={(e => handleInput(e))} value={input.height_Min} />
                            {errors.height_Min && <p className="errors">{errors.height_Min}</p>}
                        </div>
                        <div className="Creation-FormElement">
                            <label className="Creation-Label">Height Max: </label>
                            <input className={errors.height_Max && 'Creation-Input'} type="number" min="0" max='20' name="height_Max" onChange={(e => handleInput(e))} value={input.height_Max} />
                            {errors.height_Max && <p className="errors">{errors.height_Max}</p>}
                        </div>
                        <div className="Creation-FormElement">
                            <label className="Creation-Label">Weight Min: </label>
                            <input className={errors.weight_Min && 'Creation-Input'} type="number" min="0" max='20' name="weight_Min" onChange={(e => handleInput(e))} value={input.weight_Min} />
                            {errors.weight_Min && <p className="errors">{errors.weight_Min}</p>}
                        </div>
                        <div className="Creation-FormElement">
                            <label className="Creation-Label">Weight Max: </label>
                            <input className={errors.weight_Max && 'Creation-Input'} type="number" min="0" max='20' name="weight_Max" onChange={(e => handleInput(e))} value={input.weight_Max} />
                            {errors.weight_Max && <p className="errors">{errors.weight_Max}</p>}
                        </div>
                        <div className="Creation-FormElement">
                            <label className="Creation-Label" >Life Span:</label>
                            <input className={errors.life_span && 'Creation-Input'} type="text" name="life_span" onChange={(e => handleInput(e))} value={input.life_span} />
                            {errors.life_span && <p className="errors">{errors.life_span}</p>}
                        </div>
                        <div className="Creation-FormElement">
                            <label className="Creation-Label">Temperament:</label>
                            <input
                                className="Creation-Input"
                                list="temperament"
                                name="temperament"
                                placeholder="temperament"
                                value={temp}
                                onChange={handleTemp}
                            />
                            <datalist className="Creation-Input" id="temperament">
                                {alltemperament
                                    ?.filter(
                                        (c) => !input.temperament.find((t) => c.name === t)
                                    )
                                    .map((c) => {
                                        return <option key={c.id} value={c.name} id={c.id} />;
                                    })}
                            </datalist>
                            <br></br>
                            <button onClick={(e) => handleSelect(e)} className="checkSelect" type="button">+</button>
                        </div>
                        <ul className="listIdsFlags">
                            {input.temperament?.map((c) => {
                                return (
                                    <div key={c} className="countryBubble">

                                        <h6>{c}</h6>
                                        <button className="deleteBtn" type="button" value={c} onClick={(e) => deleteFromList(e)}>
                                            x
                                        </button>
                                    </div>
                                );
                            })}
                        </ul>
                        <div className="Creation-FormElement">
                            <label className="Creation-Label">Image</label>
                            <input className={errors.image && 'Creation-Input'} name="image" type="text" onChange={(e => handleInput(e))} value={input.image} />
                            {errors.image && <p className="errors">{errors.image}</p>}
                        </div>
                        <div className="Creation-FormElement">
                            <Link to="/home"><button className="goBackButton">Volver al Inicio</button></Link>
                            <button className="submitButton" type="submit">CREATE</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "The NAME error";
    } else if (!input.height_Min || input.height_Min < 0) {
        errors.height_Min = "The HEIGHT error";
    } else if (!input.height_Max || input.height_Max > 20 || input.height_Max < 0) {
        errors.height_Max = "The HEIGHT error";
    } else if (!input.weight_Min || input.weight_Min < 0) {
        errors.weight_Min = "The WEIGHT error";
    } else if (!input.weight_Max || input.weight_Max > 20 || input.weight_Max < 0) {
        errors.weight_Max = "The WEIGHT error";
    } else if (!input.life_span || input.life_span < 0) {
        errors.life_span = "The LIFE SPAN error";
    } else if (!input.image || input.image.length > 255) {
        errors.image = "The IMAGE error";
    } else if (input.temperament.length === 0) {
        errors.temperament = "The TEMPERAMENT error";
    }
    return errors;
}