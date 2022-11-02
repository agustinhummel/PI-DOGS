const { Temperament } = require('../db');
const api = "https://api.thedogapi.com/v1/breeds";
const { APIKEY } = process.env;
const axios = require('axios');
const express = require('express');
const router = express.Router();



const getTemperament = async (req, res) => {
    const dbData = await Temperament.findAll();
    if (dbData.length > 0) {
        res.status(200).json(dbData);
    }
    else {
        try {
            const apiURL = await axios.get(`${api}?api_key=${APIKEY}`)
            const apiInfo = apiURL.data.filter((e) => e.temperament).map((e) => e.temperament);
            for (let i = 0; i < apiInfo.length; i++) {
                let listTemperament = apiInfo[i].split(', ');
                await listTemperament.forEach((e) => {
                    return Temperament.findOrCreate({ where: { name: e }, default: { name: e } });
                })
            }
            const dbTemperament = await Temperament.findAll();
            res.status(200).json(dbTemperament)

        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}

const createTemperament = async (req, res) => {
    const { name } = req.body;
    try {
        Temperament.findOrCreate({ where: { name: name } })
        res.status(200).json(`${name}: created`)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    getTemperament,
    createTemperament,
    router
}