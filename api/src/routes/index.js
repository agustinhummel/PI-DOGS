const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const { getDogs, getById, createDog, deleteDogs } = require('../controller/dogs')
const { getTemperament, createTemperament } = require('../controller/temperament')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', getDogs)
router.get('/dogs/:id', getById)
router.post('/dogs/create', createDog)
router.get('/temperament', getTemperament)
router.post('/temperament/create', createTemperament)
router.delete('/dogs/delete', deleteDogs)

module.exports = router;
