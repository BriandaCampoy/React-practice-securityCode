import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    confirmed: false,
    deleted: false,
  });
  // const [value, setValue] = React.useState("");
  // const [error, setError] = React.useState(false);
  // const [loading, setLoading] = React.useState(false);
  // console.log(state)

  const onConfirm = () => {
    setState({ ...state, error: false, loading: false, confirmed: true });
  };
  const onError = () => {
    setState({ ...state, error: true, loading: false });
  };
const onWrite= (newValue)=>{
  setState({ ...state, value: newValue });
}
const onCheck=()=>{
  setState({ ...state, loading: true, error: false });
}
const onDelete=()=>{
  setState({ ...state, deleted: true });
}
const onReset=()=>{
  setState({ ...state, confirmed: false, value: "", deleted: false });
}

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        // console.log(state.value);
        if (state.value === SECURITY_CODE) {
          onConfirm();
          // setError(true);
        } else {
          onError();
        }
        // setLoading(false);
      }, 3000);
    }
  }, [state.loading]);

  // return (
  //   <div>
  //     <h2>Eliminar {name}</h2>
  //     <p>Por favor, escribe el codigo de seguridad.</p>

  //     {state.error && <p>Error: el codigo es incorrecto</p>}
  //     {state.loading && <p>Cargando...</p>}

  //     <input
  //       type="text"
  //       placeholder="Codigo de seguridad"
  //       value= {state.value}
  //       onChange = {(event) => {
  //         setState({...state, value: event.target.value});
  //       }}
  //       />
  //     <button
  //       onClick={() => {
  //         setState({...state, loading: true, error:false});
  //         // setError(false)
  //         // setLoading(true);
  //       }}
  //     >
  //       Comprobar
  //     </button>
  //   </div>
  // );
  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el codigo de seguridad.</p>

        {state.error && <p>Error: el codigo es incorrecto</p>}
        {state.loading && <p>Cargando...</p>}

        <input
          type="text"
          placeholder="Codigo de seguridad"
          value={state.value}
          onChange={(event) => {
           onWrite(event.target.value)
          }}
        />
        <button
          onClick={() => {
            onCheck()
            // setError(false)
            // setLoading(true);
          }}
        >
          Comprobar
        </button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>¿Seguro que quieres eliminar?</p>
        <button
          onClick={() => {
            onDelete()
          }}
        >
          Si, eliminar
        </button>
        <button
          onClick={() => {
            onReset()
          }}
        >
          mejor no
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p> Eliminado con exito</p>
        <button
          onClick={() => {
            onReset()
          }}
        >
          Recuperar useState
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };
