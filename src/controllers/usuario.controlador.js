const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');

//Registrar Alumno
function registrarAlumno(req,res){
    var parametros = req.body;
    var usuarioModel = new Usuario;

    if(parametros.nombre && parametros.apellido && parametros.email && parametros.password){
        usuarioModel.nombre = parametros.nombre;
            usuarioModel.apellido = parametros.apellido;
            usuarioModel.email = parametros.email;
            usuarioModel.rol = 'ALUMNO';
        
            Usuario.find({ email : parametros.email }, (err, alumnoEncontrado) => {
                if ( alumnoEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, 10, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;

                        usuarioModel.save((err, alumnoGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!alumnoGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar al alumno'});
                            
                            return res.status(200).send({ usuario: alumnoGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
                }
            })

    }

}


//Registrar Profesor
function registrarProfesor(req,res){
    var parametros = req.body;
    var usuarioModel = new Usuario;

    if(parametros.nombre && parametros.apellido && parametros.email && parametros.password){
        usuarioModel.nombre = parametros.nombre;
            usuarioModel.apellido = parametros.apellido;
            usuarioModel.email = parametros.email;
            usuarioModel.rol = 'MAESTRO';
        
            Usuario.find({ email : parametros.email }, (err, maestroEncontrado) => {
                if ( maestroEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, 10, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;

                        usuarioModel.save((err, maestroGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!maestroGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar al maestro'});
                            
                            return res.status(200).send({ usuario: maestroGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
                }
            })

    }

}
function login(req, res) {
    var parametros = req.body;
    Usuario.findOne({ email : parametros.email }, (err, usuarioEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(usuarioEncontrado){
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword)=>{//TRUE OR FALSE
                    if ( verificacionPassword ) {
                        if(parametros.obtenerToken === 'true'){
                            return res.status(200)
                                .send({ token: jwt.crearToken(usuarioEncontrado) })
                        } else {
                            usuarioEncontrado.password = undefined;
                            return  res.status(200)
                                .send({ usuario: usuarioEncontrado })
                        }
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'Las contrasena no coincide'});
                    }
                })

        } else {
            return res.status(500)
                .send({ mensaje: 'Error, el correo no se encuentra registrado.'})
        }
    })
}

//Editar
function EditarUsuario(req, res) {
    var idUser = req.params.idUsuario;
    var parametros = req.body;
    if (idUser !== req.user.sub) return res.status(500)
        .send({ mensaje: 'No puede editar otros usuarios' });
    Usuario.findByIdAndUpdate(req.user.sub, parametros, { new: true },
        (err, usuarioActualizado) => {
            if (err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if (!usuarioActualizado) return res.status(500)
                .send({ mensaje: 'Error al editar el Usuario' });

            return res.status(200).send({ usuario: usuarioActualizado })
        })

}
//Eliminar
function EliminarUsuario(req,res){
    var idUser = req.params.idUsuario; 

    Usuario.findByIdAndDelete(idUser,(err,usuarioEliminado)=>{
        if (err) return res.status(500).send({message:"error en la peticion"});
        if(!usuarioEliminado) return res.status(404).send({message:"Error, al eliminar  el Usuario"});
        return res.status(200).send({usuario: usuarioEliminado})
    })
}

module.exports ={
    registrarAlumno,
    registrarProfesor,
    login,
    EditarUsuario,
    EliminarUsuario


}