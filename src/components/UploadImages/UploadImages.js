import { useState } from "react";
import axios from "axios";

const { REACT_APP_BACKEND_API } = process.env;

function UploadImages() {
  const [fichero, setFichero] = useState();

  async function subirFicheroBackend(evento) {
    evento.preventDefault();

    const formData = new FormData();

    formData.append("sampleFile", fichero);

    const respuesta = await axios.post(
      `${REACT_APP_BACKEND_API}/api/v1/products/image/:idProduct`,
      formData
    );
  }
  return (
    <div>
      <h2>Subir imagen</h2>
      <form onSubmit={subirFicheroBackend}>
        <div>
          <label>
            Imagen:{" "}
            <input
              multiple
              type={"file"}
              onChange={(event) => {
                const fichero = event.target.files[0];
                setFichero(fichero);
              }}
            />
          </label>
        </div>

        <div>
          <button>Subir imagen</button>
        </div>
      </form>
    </div>
  );
}

export default UploadImages;
