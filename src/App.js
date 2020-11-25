import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import axios from "axios";
import Cancion from "./components/Cancion";
import Info from "./components/Info";

const App = () => {
  const [busquedaLetra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState("");
  const [infoArtista, guardarInfoArtista] = useState("");
  const [error, guardarError] = useState(false);

  useEffect(() => {
    if (Object.keys(busquedaLetra).length === 0) return;
    const consultarAPIletra = async () => {
      const { artista, cancion } = busquedaLetra;

      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letra, informacion] = await Promise.all([
        axios(url),
        axios(url2),
      ]).catch((error) => {
        guardarError(true);
      });

      guardarError(false);

      guardarLetra(letra.data.lyrics);
      guardarInfoArtista(informacion.data.artists[0]);
    };
    consultarAPIletra();
  }, [busquedaLetra]);
  return (
    <>
      {error ? (
        <p className="alert alert-danger text-center p-2">
          Ha Ocurrido un Error en el proceso intente de nuevo.
        </p>
      ) : null}
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={infoArtista} />
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
