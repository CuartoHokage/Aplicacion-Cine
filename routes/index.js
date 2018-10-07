'use strict'

const express= require('express');
const api= express.Router();
const peliculaControllers= require('../controllers/peliculaControllers');
//const auth= require('../middlewares/auth')
const userControllers= require('../controllers/userControllers');
//modulo para subir archivos
var multiparty= require('connect-multiparty');
//middleware para imagenes
var md_upload= multiparty({uploadDir: './public/uploads/peliculas'});
//Cruds para peliculas
api.get('/pelicula', peliculaControllers.getPeliculas);
api.get('/pelicula/:peliculaID', peliculaControllers.getPelicula);
api.post('/pelicula',md_upload, peliculaControllers.postPelicula);
api.put('/pelicula/:peliculaID', peliculaControllers.updatePelicula);
api.delete('/pelicula/:peliculaID', peliculaControllers.deletePelicula);
api.get('/video',(req, res)=>{
	res.render('video');
});
api.post('/upload-image-pelicula/:id', md_upload, peliculaControllers.uploadImage);
//Cruds para usuarios
/*api.post('/signup', userControllers.signup)
api.post('/signin', userControllers.signin)
api.get('/private', auth, (req, res)=>{
	res.status(200).send({message: 'Tienes acceso'})
})
*/
module.exports= api
