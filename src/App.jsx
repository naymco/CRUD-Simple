import React from "react";
import shortid from "shortid";

function App() {
  const [tarea, setTarea] = React.useState("");
  const [tareas, setTareas] = React.useState([]);
  const [edit, setEdit] = React.useState(false);
  const [id, setId] = React.useState("");
  const [ error, setError ] = React.useState(null);

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("elemento vacio");
      setError('Debes escribir algo, por favor');
      return;
    }

    setTareas([
      ...tareas, // funciona como un push pero más fácil
      { id: shortid.generate(), nombreTarea: tarea },
    ]);

    setTarea(""); // resetea los campos y los vacia después de agregar
    setError(null);

  };

  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter((item) => item.id !== id); // con este método eliminamos las taras
    setTareas(arrayFiltrado);
  };

  const editarTarea = (elemento) => {
    console.log(elemento);
    setEdit(true);
    setTarea(elemento.nombreTarea);
    setId(elemento.id);
  };

  const editarTareas = (event) => {
    event.preventDefault();
    if (!tarea.trim()) {
      console.log("elemento vacio");
      setError('Debes escribir algo, por favor');
      return;
    }

    const arrayEditado = tareas.map((item) =>
      item.id === id ? { id, nombreTarea: tarea } : item
    );

    setTareas(arrayEditado);
    setEdit(false);
    setTarea('');
    setId('');
    setError(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            {
              tareas.length === 0 ? (
                <li className="list-group-item">Todavía no hay tareas, agrega alguna</li>
              ) : (
                tareas.map((elemento) => (
                  <li key={elemento.id} className="list-group-item">
                    <span className="lead"> {elemento.nombreTarea} </span>
    
                    <button
                      className="btn btn-danger btn-sm float-right mx-2"
                      onClick={() => eliminarTarea(elemento.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => editarTarea(elemento)}
                      className="btn btn-warning btn-sm float-right "
                    >
                      Editar
                    </button>
                  </li>
                ))
              )
            
           }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {edit ? "Editar Tarea" : "Agregar tarea"}
          </h4>
          <form onSubmit={edit ? editarTareas : agregarTarea}>
           {
             error ? ( <span className="text-danger"> {error} </span> ) : null
           }

            <input
              onChange={(e) => setTarea(e.target.value)}
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la tarea"
              value={tarea}
            />
            {edit ? (
              <button className="btn btn-warning btn-sm float-right btn-block ">
                Editar
              </button>
            ) : (
              <button type="submit" className="btn btn-dark btn-block">
                Agregar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
