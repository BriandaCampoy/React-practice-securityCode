import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const initialState = {
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onConfirm = () => {
    dispatch({ type: actionTypes.confirm });
  };
  const onError = () => {
    dispatch({ type: actionTypes.error });
  };
  const onWrite = (newValue) => {
    dispatch({ type: actionTypes.write, payload: newValue });
  };
  const onCheck = () => {
    dispatch({ type: actionTypes.check });
  };
  const onDelete = () => {
    dispatch({ type: actionTypes.delete });
  };
  const onReset = () => {
    dispatch({ type: actionTypes.reset });
  };

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          // dispatch({
          //   type: actionTypes.confirm ,
          // })
          onConfirm();
        } else {
          // dispatch({ type:actionTypes.error})
          onError();
        }
      }, 3000);
    }
  }, [state.loading]);

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
            onWrite(event.target.value);
          }}
        />
        <button
          onClick={onCheck}
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
          onClick={onDelete}
        >
          Si, eliminar
        </button>
        <button
          onClick={onReset}
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
          onClick={onReset}
        >
          Recuperar useState
        </button>
      </React.Fragment>
    );
  }
}

/**Reducer if */
// const reducerif = (state, action) => {
//   if (action.type === "ERROR") {
//     return {
//       ...state,
//       error: true,
//       loading: false,
//     };
//   } else if (action.type === "CHECK") {
//     return {
//       ...state,
//       loading: true,
//     };
//   } else if (action.type === "") {
//   } else {
//     return { ...state };
//   }
// };

/**Reducer switch */
// const reducerSwitch = (state, action) => {
//   switch (action.type) {
//     case "ERROR":
//       return { ...state, error: true, loading: false };
//       case 'CHECK':
//         return { ...state, loading: true};
//         default:
//           return { ...state}
//         }
//       };

const actionTypes = {
  confirm: "CONFIRM",
  error: "ERROR",
  check: "CHECK",
  delete: "DELETE",
  reset: "RESET",
  write: "WRITE",
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: { ...state, error: true, loading: false },
  [actionTypes.check]: { ...state, loading: true, error: false },
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.delete]: { ...state, deleted: true },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    value: "",
    deleted: false,
  },
  [actionTypes.write]: { ...state, value: payload },
});
const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };
