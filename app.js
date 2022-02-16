// IMPORTACIONES
const express = require('express');
const cors = require('cors');

//Importaciones PDF
const pdfPrinter = require("pdfmake");
const fs = require("fs");

//Importaciones de rutas pdf
const fonts = require("./src/pdfStyles/fonts");
const Styles = require("./src/pdfStyles/styles");
const {content} = require("./src/pdfStyles/pdfContent");

let docDefinition ={
    content: content,
    Styles: Styles 
};

const printer = new pdfPrinter(fonts);

let pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream("./src/pdfs/pdfCursos.pdf"));
pdfDoc.end();


var app = express();

// IMPORTACIONES RUTAS
const UsuarioRutas = require('./src/routes/usuario.routes');
const CursoRutas = require('./src/routes/curso.routes');

// MIDDLEWARES -> INTERMEDIARIOS
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/obtenerProductos
app.use('/api', UsuarioRutas, CursoRutas);


module.exports = app;