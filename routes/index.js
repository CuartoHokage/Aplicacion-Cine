'use strict'

const express= require('express');
const api= express.Router()
const peliculaControllers= require('../controllers/peliculaControllers')
//const auth= require('../middlewares/auth')
const userControllers= require('../controllers/userControllers')
//Cruds para peliculas
api.get('/pelicula', peliculaControllers.getPeliculas)
api.get('/pelicula/:peliculaID', peliculaControllers.getPelicula)
api.post('/pelicula', peliculaControllers.postPelicula)
api.put('/pelicula/:peliculaID', peliculaControllers.updatePelicula)
api.delete('/pelicula/:peliculaID', peliculaControllers.deletePelicula)
//Cruds para usuarios
/*api.post('/signup', userControllers.signup)
api.post('/signin', userControllers.signin)
api.get('/private', auth, (req, res)=>{
	res.status(200).send({message: 'Tienes acceso'})
})
*/
module.exports= api
