const Curso = require('../models/curso');

function agregarCurso(req,res) {
    var parametros = req.body;
    var cursoModel = new Curso();

    if(parametros.nombre) {
        cursoModel.nombre = parametros.nombre;
        cursoModel.save((err,cursoGuardado)=>{
            if(err) return res.status(500).send({mensaje: "error en la peticion"});
            if(!cursoGuardado) return res.status(500).send({mensaje:"Error al crear el curso"})

            return res.status(200).send({Curso:cursoGuardado})

        })
    }else{
        return res.status(500).send({mensaje:"debe de rellenar los campos necesarios"});
    }

}
function buscarCurso(req,res){
    Curso.find({},(err,cursoEncontrado)=>{
        if(err) return res.status(500).send({mensaje: "error en la peticion"});
        if(!cursoEncontrado) return res.status(500).send({mensaje:"Error al obtener el curso"})

        return res.status(200).send({Curso:cursoEncontrado})

    }).populate('idAsignacion');
}

function inscripcion(req, res) {
    var idCur = req.params.idCurso; 
    var parametros = req.body;

    Curso.findByIdAndUpdate(idCur, {$push:{asigancion:{textoAlumno: parametros.textoAlumno,
        idUsuarioAsignacion: req.user.sub}}},{new:true},(err,alumnoAgregado)=>{
            if(err) return res.status(500).send({mensaje:"Error en la peticion"});
            if(!alumnoAgregado) return res.status(500).send({mensaje:"Error al asignar"});

            return res.status(200).send({inscripcion:alumnoAgregado})
        })
}

function editarCurso(req,res){
    var idCur = req.params.idCurso;
    var parametros = req.body; 

    Curso.findByIdAndUpdate(idCur,parametros,{new:true}, (err, cursoActualizado)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!cursoActualizado) return res.status(404).send( { mensaje: 'Error al Editar el curso'});

        return res.status(200).send({ editar: cursoActualizado});
    })
}

function eliminarCurso(req,res){
    var idCur = req.params.idCurso;
    Curso.findOneAndDelete(idCur,{new:true}, (err,cursoEliminado )=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!cursoEliminado) return res.status(404).send( { mensaje: 'Error al eliminar el curso'});

        return res.status(200).send({ Curso:cursoEliminado });
    })
}

function obtenerCursoAlumno(req, res){
    Curso.find({idUsuarioAsignacion: req.user.sub},(err,cursoEncontrado)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!cursoEncontrado) return res.status(404).send( { mensaje: 'Error al obtener el curso'});

        return res.status(200).send({ Curso: cursoEncontrado});
    })
}
module.exports ={
    agregarCurso,
    buscarCurso,
    inscripcion,
    editarCurso,
    eliminarCurso,
    obtenerCursoAlumno
}