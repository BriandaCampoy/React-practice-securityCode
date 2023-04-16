import React from 'react';
import { Loading } from './Loading';
const SECURITY_CODE = 'paradigma'

class ClassState extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      value:'',
      error:false,
      loading:false,
      deleted: false, 
      confirmed:false,
    };
  }
  // componentWillMount
  // UNSAFE_componentWillMount(){
  //   console.log('willmount')
  // }
  componentWillUnmount(){

    console.log('unmount')
  }
  componentDidUpdate(){
    console.log('actualizacion')
    if(this.state.loading){
      setTimeout(()=>{
        if(SECURITY_CODE===this.state.value){
          this.setState({error:false, loading:false})
        }else{
          this.setState({loading:false, error:true})
        }
      },3000)
    }
  }


    render(){
      /**
       * Para no tener que poner this.state con cada "state"
       * se puede poner de la siguiente manera y ya podrian ponerse
       * solo con el nombre
       */
      const {error, loading, value, deleted, confirmed }= this.state;
      // return (
      //   <div>
      //     <h2>Eliminar {this.props.name}
      //     </h2>
      //     <p>Por favor, escribe el codigo de seguridad</p>
      //     {this.state.error && (
      //       <p>Error: el codigo es incorrecto</p>
      //     )}
      //     {this.state.loading && (
      //       <Loading/>
      //     )}
      //     <input 
      //       type="text" 
      //       placeholder="Codigo de seguridad"
      //       value= {this.state.value}
      //       onChange = {(event)=>{this.setState({value: event.target.value})}}
      //       />
      //     <button
      //       onClick={()=>{this.setState({loading:true, error:false})}}
      //     >Comprobar</button>
      //   </div>
      // )
      if(!deleted && !confirmed){
        return(
          <div>
          <h2>Eliminar {this.props.name}
          </h2>
          <p>Por favor, escribe el codigo de seguridad</p>
          {this.state.error && (
            <p>Error: el codigo es incorrecto</p>
          )}
          {this.state.loading && (
            <Loading/>
          )}
          <input 
            type="text" 
            placeholder="Codigo de seguridad"
            value= {this.state.value}
            onChange = {(event)=>{this.setState({value: event.target.value})}}
            />
          <button
            onClick={()=>{this.setState({loading:true, error:false})}}
          >Comprobar</button>
        </div>
        )
      }else if(confirmed && !deleted){
        return(
        <React.Fragment>
          <p>Estado de confirmacion</p>
        </React.Fragment>
        )
      }else{
        <React.Fragment>
          <p>Eliminado con exito</p>
        </React.Fragment>
      }
    }

}

export {ClassState}