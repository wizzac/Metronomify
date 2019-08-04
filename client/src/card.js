import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './style.css'

class Card extends Component {

  constructor(props){
    super(props)
    this.state={
      item:null,
      trackId:''
    }

  }

  render(){
    const { name,artists,album,id} =this.props.item;
    const image=album.images[0].url
    const fondo={backgroundImage: `url(${image})`}

    return (
          <div className="card-container" onClick={()=>{this.setState({trackId:id});this.props.handler(id)}}>
                <div className="card" style={fondo}>
                <h4>{name}</h4>
                <span className="chev">{artists[0].name}</span>
                </div>
            </div>
    )};
}

export default Card
