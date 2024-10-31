const express = require("express");
const router = express.Router();


const Comentario = require('./controllers/comentario');
const Equipamento = require('./controllers/equipamentos');
const Usuario = require('./controllers/usuario');

router.post('/login', Usuario.login);

router.get('/comentario', Comentario.read);
router.get('/comentario/:id', Comentario.read);
router.post('/comentario', Comentario.create);

router.post('/equipamento', Equipamento.create);
router.get('/equipamento', Equipamento.read);
router.get('/equipamento/:id', Equipamento.read);
router.delete('/equipamento/:id', Equipamento.del);

router.get('/', (req, res) => { return res.json("API respondendo") });

module.exports = router