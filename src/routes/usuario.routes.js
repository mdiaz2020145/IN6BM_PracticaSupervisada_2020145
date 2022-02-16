const express = require('express');
const usuarioControlador = require('../controllers/usuario.controlador');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/registrarAlumno',usuarioControlador.registrarAlumno);
api.post('/registrarProfesor',usuarioControlador.registrarProfesor);
api.post('/login',usuarioControlador.login);
api.put('/editarAlumno/:idUsuario',md_autenticacion.Auth,usuarioControlador.EditarUsuario);
api.delete('/eliminarAlumno/:idUsuario',md_autenticacion.Auth,usuarioControlador.EliminarUsuario);

module.exports = api;