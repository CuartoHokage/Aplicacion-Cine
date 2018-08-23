'use strict'
const Peliculas= require ('../modelos/peliculas')

function getPeliculas(req, res){
	Peliculas.find({}, (err, peliculas)=>{
		if (err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
		if(!peliculas) return res.status(404).send({message:`Pelicula no existe`})
		res.status(200).send({peliculas})
	})
}

function getPelicula(req, res){
	let peliculaID =req.params.peliculaID
	Peliculas.findById(peliculaID, (err, pelicula)=>{
		if (err) return res.status(500).send({message: `Error al realizar la petición posiblemente la película no existe ${err}`})
			if (!pelicula) return res.status(404).send({message: 'Película no existe'})
			res.status(200).send({pelicula})	
	})
}

function postPelicula(req, res){
	console.log('Post /api/peliculas')
	let peliculas= new Peliculas()
	peliculas.name= req.body.name
	peliculas.picture= req.body.picture
	peliculas.censura= req.body.censura
	peliculas.descripcion= req.body.descripcion
	peliculas.fechaEstreno= req.body.fechaEstreno
	peliculas.fechaFinal= req.body.fechaFinal
	peliculas.duracion= req.body.duracion
	peliculas.tiempoCartelera= req.body.tiempoCartelera

	peliculas.save((err, peliculaStored)=>{
		if(err) res.status(500).send({message:`Error al enviar datos ${err}`})
		res.status(200).send({peliculas: peliculaStored})	
	})
}

function updatePelicula(req, res){
	let peliculaID= req.params.peliculaID
	let update= new Peliculas(req.body)
	console.log(update)
	update._id = peliculaID 

	Peliculas.findByIdAndUpdate(peliculaID, update, {new: true}, (err, peliculaUpdate) =>{
		if(err) return res.status(500).send({message: `Error al actualizar película verifique si la película que quiere modificar existe ${err}`})
		if(!peliculaUpdate) return res.status(500).send({message:'No retorno película actual'})
		return res.status(200).send({peliculaUpdate })
	})
}

function deletePelicula(req, res){
	let peliculaID =req.params.peliculaID
	Peliculas.findById(peliculaID, (err, pelicula) => {
		if(err) return res.status(500).send({message: `Error al eliminar datos ${err}`})
		if(!pelicula) return res.status(404).send({message: 'La pelicula que quiere eliminar no existe'})	
		pelicula.remove(err =>{
			if(err) res.status(500).send({message: `Error al eliminar datos ${err}`})
			res.status(200).send({message: 'La pelicula a sido eliminada'})
		})

	})
}

module.exports={
	getPelicula,
	getPeliculas,
	postPelicula,
	updatePelicula,
	deletePelicula
}