$(document).ready(function () {
    $('#buscar-btn').click(function () {
        const terminoBusqueda = $('#buscar-input').val();
        buscarSeries(terminoBusqueda)
            .then(mostrarResultados)
            .catch(manejarError);
    });

    function buscarSeries(terminoBusqueda) {
        const apiUrl = `https://api.tvmaze.com/search/shows?q=${terminoBusqueda}&language=Spanish`;
        return new Promise((resolve, reject) => {
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('No se encontraron resultados');
                    }
                    return response.json();
                })
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error.message);
                });
        });
    }

    function mostrarResultados(resultados) {
        const contenedorResultados = $('#resultados');
        contenedorResultados.empty();
        resultados.forEach(resultado => {
            const serie = resultado.show;
            const itemSerie = `<div class="item-serie">
                                <h3>${serie.name}</h3>
                                <p>${serie.summary || 'Sin descripción disponible'}</p>
                            </div>`;
            contenedorResultados.append(itemSerie);
        });
    }

    function manejarError(mensajeError) {
        const contenedorResultados = $('#resultados');
        contenedorResultados.empty();
        contenedorResultados.append(`<p>${mensajeError}</p>`);
    }
});
