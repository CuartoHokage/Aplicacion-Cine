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
	let peliculaID= req.params.peliculaID
	Peliculas.findById(peliculaID, (err, pelicula)=>{
		if (err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
			if (!pelicula) return res.status(404).send({message: 'Película no existe'})
			res.status(200).send({pelicula})	
	})
}
//comentario
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

	peliculas.save((err, productoStored)=>{
		if(err) res.status(500).send({message:`Error al enviar datos ${err}`})
		res.status(200).send({product: productoStored})	
	})
}

function updatePelicula(req, res){

}

function deletePelicula(req, res){

}

module.exports={
	getPelicula,
	getPeliculas,
	postPelicula,
	updatePelicula,
	deletePelicula
}