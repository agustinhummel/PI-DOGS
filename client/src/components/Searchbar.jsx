import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../redux/actions";

import '../style/searchbar.css';

export default function SearchBar() {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()

    const searcher = (e) => {
        dispatch(getNameDogs(input));
        setInput('')
    }

    const onChange = (e) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        if (input === 0) {
            searcher()
        }
    }, [input])

    return (
        <div className="search">
            <input className="searchInput" type="text" name="name" value={input} placeholder="Buscar" onChange={e => onChange(e)} />
            <svg className="searchBtn" onClick={searcher} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" /></svg>
        </div>
    )
}