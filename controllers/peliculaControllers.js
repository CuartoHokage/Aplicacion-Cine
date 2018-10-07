'use strict'
const fs= require('fs');
const path= require('path');
const Peliculas= require ('../modelos/peliculas');
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
		var file_path= req.files.picture.path;
		console.log(req.files)
		console.log(file_path)
		//separar toda la ruta para obtener solo el nombre del fichero
		var file_split= file_path.split('\\');
		var file_name= file_split[3];
		//separa extensión
		var exp_split= file_name.split('\.');
		var file_exp= exp_split[1];
	let peliculas= new Peliculas()      
		//--//
		//var extension = req.body.picture.name.split(".").pop();
		//fs.rename(req.files.picture.path, "../public/imagenes/peliculas"+peliculas._id+"."+extension)
		peliculas.name= req.body.name
		peliculas.picture= file_name
		peliculas.censura= req.body.censura
		peliculas.descripcion= req.body.descripcion
		peliculas.fechaEstreno= req.body.fechaEstreno
		peliculas.fechaFinal= req.body.fechaFinal
		peliculas.duracion= req.body.duracion
		peliculas.tiempoCartelera= req.body.tiempoCartelera

		peliculas.save((err, peliculaStored)=>{
			if(err) res.status(500).send({message:`Error al enviar datos ${err}`})
			res.status(200).render('index')
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

function uploadImage(req, res){
	var peliculaId= req.params.id;
	var file_name= 'No subido';
	console.log(req.files)
	if(req.files){
		var file_path= req.files.picture.path;
		//separar toda la ruta para obtener solo el nombre del fichero
		var file_split= file_path.split('\\');
		var file_name= file_split[3];
		//separa extensión
		var exp_split= file_name.split('\.');
		var file_exp= exp_split[1];
		if(file_exp=="png"|| file_exp=="jpg"|| file_exp=="gif"){
			Peliculas.findByIdAndUpdate(peliculaId, {picture:file_name}, (err, peliculaUpdate)=>{
				if(!peliculaUpdate){
					res.status(404).send({message: 'No se pudo actualizar la película'})
				}else{
					res.status(200).send({pelicula: peliculaUpdate});
				}
			});
		}else{
			res.status(200).send({message: 'Extensión no válida'})
		}
	}else{
		res.status(200).send({message: 'No has subido imagen'})
	}
}

module.exports={
	getPelicula,
	getPeliculas,
	postPelicula,
	updatePelicula,
	deletePelicula,
	uploadImage
}