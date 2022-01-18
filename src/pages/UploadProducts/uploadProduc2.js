function subirProducto() {
  return (
    <div>
      <button>Go back</button>
      <h1>Categoría</h1>
      <p>
        <label for="categorias"></label>
        <select name="categorias" id="categorias">
          <option value="Honda">Consolas</option>
          <option value="Yamaha">Arcades</option>
          <option value="Kawasaki">Videojuegos</option>
          <option value="Kawasaki">Accesorios</option>
        </select>
        <label for="name">Título</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Pon un título de producto"
        />
      </p>
      <label for="name">Precio</label>
      <input type="number" name="price" id="price" placeholder="Precio " />
      <textarea
        name="textarea"
        id="textarea"
        cols="30"
        rows="10"
        placeholder="Please type in your feedback"
      ></textarea>
      <h1>Categoría</h1>
      <p>
        <label for="estado"></label>
        <select name="estado" id="estado">
          <option value="Honda">Honda</option>
          <option value="Yamaha">Yamaha</option>
          <option value="Kawasaki">Kawasaki</option>
        </select>
      </p>
      <h1>Localidad</h1>
      <p>
        <label for="estado"></label>
        <select name="estado" id="estado">
          <option value="Honda">Honda</option>
          <option value="Yamaha">Yamaha</option>
          <option value="Kawasaki">Kawasaki</option>
        </select>
      </p>
    </div>
  );
}

export default subirProducto;
