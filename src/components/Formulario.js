import React, { useState } from "react";

const Formulario = () => {
  const [busqueda, guardarBusqueda] = useState({
    artista: "",
    cancion: "",
  });
  const [error, guardarError] = useState(false);

  // funcion leer input

  const actualizarBusqueda = (e) => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const { artista, cancion } = busqueda;

  const buscarInformación = (e) => {
    e.preventDefault();

    if (artista.trim() === "" || cancion.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);
  };
  return (
    <div className="bg-info">
      <div className="container">
        <div className="row">
          <form
            className="col card text-white bg-transparent mb-5 pt-5 pb-2"
            onSubmit={buscarInformación}
          >
            <fieldset>
              <legend className="text-center">Buscador Letras Canciones</legend>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Artista</label>
                    <input
                      type="text"
                      className="form-control"
                      name="artista"
                      placeholder="Nombre Artista"
                      onChange={actualizarBusqueda}
                      value={artista}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Cancion</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cancion"
                      placeholder="Nombre Canción"
                      onChange={actualizarBusqueda}
                      value={cancion}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary float-right ">
                Buscar
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;