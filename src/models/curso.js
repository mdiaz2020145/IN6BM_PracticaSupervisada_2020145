const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursosSchema = Schema({
    nombre: String,
    asigancion:[{
        textoAlumno: String, 
        idUsuarioAsignacion:{type: Schema.Types.ObjectId, ref:'Usuarios'}

    }],
    idAsignacion:{type: Schema.Types.ObjectId, ref:'Usuarios'}


})

module.exports = mongoose.model('Cursos',cursosSchema);