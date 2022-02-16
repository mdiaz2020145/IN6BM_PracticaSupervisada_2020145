const express = require('express');
const cursoControlador = require('../controllers/curso.controlador');

const md_autenticacion = require("../middlewares/autenticacion");


const api = express.Router();
api.post('/agregarCurso', md_autenticacion.Auth, cursoControlador.agregarCurso);
api.get('/buscarCurso',md_autenticacion.Auth, cursoControlador.buscarCurso);
api.put('/inscripcion/:idCurso', md_autenticacion.Auth, cursoControlador.inscripcion);
api.put('/editarCurso/:idCurso',cursoControlador.editarCurso );
api.get('/obtenerCursoAlumno',md_autenticacion.Auth, cursoControlador.obtenerCursoAlumno);
api.delete('/eliminarCurso/:idcurso',md_autenticacion.Auth,cursoControlador.eliminarCurso);
module.exports =api;