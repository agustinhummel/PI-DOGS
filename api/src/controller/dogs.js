const axios = require('axios');
const express = require('express');
const router = express.Router()
const { APIKEY } = process.env
const api = "https://api.thedogapi.com/v1/breeds"
const { Dog, Temperament } = require('../db');


const getDogs = async (req, res) => {

    const { name } = req.query

    if (name) {
        const listName = await axios.get(`${api}/search?q=${name}&api_key=${APIKEY}`)
        const allDogs = await listName.data.map((el) => {
            return {
                name: el.name,
            }
        });
        const dbName = await Dog.findAll({ where: { name: name.toLowerCase() } })
        const totalName = allDogs.concat(dbName);
        res.status(200).json(totalName)
    }
    else {
        try {
            const apiInfo = await axios.get(`${api}?api_key=${APIKEY}`)
            const dogs = apiInfo.data.map((el) => {
                return {
                    name: el.name,
                    id: el.id,
                    height_Min: parseInt(el.height.metric.split(" - ")[0]),
                    height_Max: parseInt(el.height.metric.split(" - ")[1]),
                    weight_Min: parseInt(el.weight.metric.split(" - ")[0]),
                    weight_Max: parseInt(el.weight.metric.split(" - ")[1]),
                    life_span: el.life_span,
                    image: el.image.url,
                    temperament: el.temperament
                }
            });
            const dbDogs = await Dog.findAll();
            const allDogs = dogs.concat(dbDogs)
            res.status(200).json(allDogs)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}


const getDbInfo = async () => {
    const data = await Dog.findAll({
        include: {
            model: Temperament,
            through: {
                attributes: [],
            },
        },
    });
    return data
}

const getAllDogs = async () => {
    const apiInfo = await getDogs();
    const dbInfo = await getDbInfo();
    const infoTotal = [...apiInfo, dbInfo];
    return infoTotal
}

const getById = async (req, res) => {
    const { id } = req.params
    try {
        if (isNaN(id)) {
            const dogsDB = await Dog.findByPk(id, { include: [{ model: Temperament }] });

            res.status(200).json(dogsDB)
        } else {
            const dogsApi = await axios.get(`${api}?api_key=${APIKEY}`)
            const totalApi = dogsApi.data.filter((e) => e.id === parseInt(id)).map(e => {
                return {
                    name: e.name,
                    id: e.id,
                    height_Min: parseInt(e.height.metric.split(" - ")[0]),
                    height_Max: parseInt(e.height.metric.split(" - ")[1]),
                    weight_Min: parseInt(e.weight.metric.split(" - ")[0]),
                    weight_Max: parseInt(e.weight.metric.split(" - ")[1]),
                    life_span: e.life_span,
                    image: e.image.url,
                    temperament: e.temperament
                }
            })

            res.status(200).json(totalApi[0])
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const createDog = async (req, res) => {
    const { name, height_Min, height_Max, weight_Min, weight_Max, life_span, image, temperament } = req.body;
    try {
        const dogs = await Dog.create({
            name, height_Min, height_Max, weight_Min, weight_Max, life_span, image, temperament
        });
        res.status(200).send(`${dogs.name}: created`)

    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteDogs = async (req, res) => {
    const { name } = req.query
    try {
        let dogs = await Dog.findAll({ where: { name } })
        if (dogs) {
            await Dog.destroy({ where: { name } })
            res.status(200).send(`delete ${name}`)
        }
    } catch (error) {
        res.status(400).send('imposible eliminar')
    }
}


module.exports = {
    getDogs,
    getDbInfo,
    getAllDogs,
    getById,
    createDog,
    deleteDogs,
    router
}