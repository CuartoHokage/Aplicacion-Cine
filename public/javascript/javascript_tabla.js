$(document).ready(function () {

    $('#btnconsultar').click(function () {
        var htmlpuro = '<table class="table table-striped"><thead>'
        htmlpuro += '<tr>'
        htmlpuro += '<th>ID</th>'
        htmlpuro += '<th>Título</th>'
        htmlpuro += '<th>Imagen</th>'
        htmlpuro += '<th>Clasificación</th>'
        htmlpuro += '<th>Descripción</th>'
        htmlpuro += '<th>Fecha de Estreno</th>'
        htmlpuro += '<th>Fin de cartelera </th>'
        htmlpuro += '<th>Duración</th>'
        htmlpuro += '<th>Tiempo en Cartelera</th>'
        htmlpuro += '</tr></thead><tbody>'
        //var varid=$("#txtcedula").val();
        $.ajax({
            type: "GET",
            url: "/api/pelicula",
            dataType: "json",
            contentType: "text/plain"
        }).done(function (msg) {
            //este for entra al objeto peliculas del json "msg" "i" quedara en posicion u objeto 0
            for (let i in msg) {
                //el objeto peliculas del json es un array ahi recorreremos el array con j y sus propiedades
                // de cada j
                for (let j in msg[i]) {
                    // console.log(msg[i][j])
                    htmlpuro += '<tr>'
                    htmlpuro += '<td>' + msg[i][j]._id + '</td>'
                    htmlpuro += '<td>' + msg[i][j].name + '</td>'
                    htmlpuro += '<td>' + msg[i][j].picture + '</td>'
                    htmlpuro += '<td>' + msg[i][j].censura + '</td>'
                    htmlpuro += '<td>' + msg[i][j].descripcion + '</td>'
                    htmlpuro += '<td>' + msg[i][j].fechaEstreno + '</td>'
                    htmlpuro += '<td>' + msg[i][j].fechaFinal + '</td>'
                    htmlpuro += '<td>' + msg[i][j].duracion + '</td>'
                    htmlpuro += '<td>' + msg[i][j].tiempoCartelera + '</td>'
                    htmlpuro += '</tr>'
                }
            }
            htmlpuro += '</tbody></table>';
            $("#contenido").html(htmlpuro)
        });
    });
}); 