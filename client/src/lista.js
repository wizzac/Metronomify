import React, { Component } from 'react';
import Card from "./card";
import Metronome from "./metronomo";
import axios from 'axios';


class Lista extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      tunning:'E',
      bpm: 100,
    };
    this.refMet= React.createRef();
    this.clickHandler = this.clickHandler.bind(this)

  }
  

  async clickHandler(trackId){
    const resultado=await axios.post('http://localhost:8888/advanced',{trackId:trackId})
    this.setState({
      tunning:resultado.data.key,
      bpm:resultado.data.tempo
    })
    this.refMet.current.setState({
      tunning:resultado.data.key,
      bpm:resultado.data.tempo
    })

  }

  render(){
    
    let cards = '';
    if (this.props.list) {
      cards = this.props.list.map((m, i) => <Card key={i} item={m} handler={this.clickHandler}/>);
    }
  
    return (
      <div className="row">
        <div className="col-md-6">
          <div>{cards}</div>
        </div>
        <div className="col-md-6">
          <Metronome tunning={this.state.tunning} bpm={this.state.bpm} ref={this.refMet}></Metronome>
        </div>
      </div>
    )};
}

export default Lista;
