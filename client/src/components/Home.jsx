import React from "react";
import { filterByCreated, filterByTemp, getDogs, getTemperament, sortByName, weightSort } from "../redux/actions";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Card from "./Card";
import '../style/home.css'
import SearchBar from "./Searchbar";
import Paginated from "./Paginated";
import Error from "./Error";


export default function Home() {
    const getAllDogs = useSelector((state) => state.dogs);
    const totalTemp = useSelector((state) => state.temperament)
    const dispatch = useDispatch();

    const [setOrder] = useState('');

    const [page, setPage] = useState(1);
    const [forPage] = useState(8);

    const max = Math.ceil(getAllDogs.length / forPage);


    function handleByAlphabetical(e) {
        e.preventDefault();
        if (e.target.value === 'all') {
            dispatch(getDogs())
            setPage(1)
            setOrder(`Order ${e.target.value}`)
        } else {
            dispatch(sortByName(e.target.value));
            setPage(1)
            setOrder(`Order ${e.target.value}`)
        }

    }

    function handleWeight(e) {
        e.preventDefault();
        if (e.target.value === 'all') {
            dispatch(getDogs())
            setPage(1)
            setOrder(`Order ${e.target.value}`)
        } else {
            dispatch(weightSort(e.target.value));
            setPage(1)
            setOrder(`Order ${e.target.value}`)
        }
    }

    function handleTempFilter(e) {
        e.preventDefault();
        dispatch(filterByTemp(e.target.value))
        setPage(1)
        setOrder(`Order ${e.target.value}`)
    }

    function handleCreate(e) {
        e.preventDefault();
        if (e.target.value === 'all') {
            dispatch(getDogs())
            setPage(1)
            setOrder(`Order ${e.target.value}`)
        } else {
            dispatch(filterByCreated(e.target.value))
            setPage(1)
        }
    }



    useEffect(() => {
        dispatch(getDogs())
        dispatch(getTemperament())
    }, [dispatch])


    return (
        <div className="body">
            <div className="nav1">
                <div>
                    <Link to='/create'>
                        <button className="crearDog">Create Dogs</button>
                    </Link>
                </div>
                <div><SearchBar /></div>
            </div>
            <div className="nav">
                <div>
                    <select className="filters" onChange={e => handleWeight(e)} >
                        <option value='all'>Ordenar por Peso</option>
                        <option value='best'> Min a Max</option>
                        <option value='wrost'> Max a Min </option>
                    </select>
                </div>
                <div>
                    <select className="filters" onChange={e => handleByAlphabetical(e)}>
                        <option value='all' >Orden Alfabetico</option>
                        <option value='asc'> A - Z </option>
                        <option value='desc'> Z - A </option>
                    </select>
                </div>


            </div>
            <div className="nav">
                <div>
                    <select className="filters" onChange={e => handleTempFilter(e)}>
                        <option value='All'>Todos</option>
                        {totalTemp.map((e, i) => {
                            return <option value={e.name} key={i}>{e.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <select className="filters" onChange={e => handleCreate(e)} >
                        <option value='all'>Creados</option>
                        <option value='Api'>API</option>
                        <option value='Db' >Base Dato</option>
                    </select>
                </div>
            </div>
            <div className="alldogs">
                {getAllDogs.length > 1 ? getAllDogs.slice((page - 1) * forPage, (page - 1) * forPage + forPage).map((d, i) => (
                    < div key={i} >
                        <Card
                            id={d.id} name={d.name} weight_Min={d.weight_Min} weight_Max={d.weight_Max} image={d.image} temperament={d.temperament} />
                    </div>
                )) :
                    getAllDogs.length > 0 ?
                        getAllDogs.slice((page - 1) * forPage, (page - 1) * forPage + forPage).map((d, i) => (

                            <div key={i}>
                                <Card
                                    id={d.id} name={d.name} weight_Min={d.weight_Min} weight_Max={d.weight_Max} image={d.image} temperament={d.temperament} />

                            </div>
                        )) : <Error />}


            </div>
            <div className="footer">
                <Paginated page={page} setPage={setPage} max={max} />
            </div>
        </div >
    )

}

