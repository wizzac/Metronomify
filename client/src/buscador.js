import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './style.css'
import Lista from './lista'

class Buscador extends Component {
  
    constructor(){
      super();
      this.state = {
        search:'',
        results:[],     
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({search: event.target.value});
    }

    handleSubmit = async event => {
        event.preventDefault()
        var stringToSearch=this.state.search;
        const resultado=await axios.post('http://localhost:8888/search',{stringToSearch})
        this.setState({ results:resultado.data.results });
    }

    render(){
        return (
            <div className="container">
                <br/>
                <div className="row" align="center">
                    <div className="col-md-12 col-md-offset-4">
                        <form onSubmit={this.handleSubmit}>
                            <input className="barra" type="text" name="stringToSearch" value={this.state.search} onChange={this.handleChange}></input>
                            <input type="submit" className="btnesta" value="Buscar" ></input>
                        </form>
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <h3 >Esta Aplicacion permite buscar canciones en spotify, conocer en que nota esta afinada e iniciar un metrono al tempo estimado de la cancion</h3>
                </div>
                <br></br>
                <Lista list={this.state.results} />
            </div>
        );
    }
}  

export default Buscador;