import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './style.css'

const Card = props => {
    const { name,artists,album} = props.item;
    console.log(album)
    const image=album.images[0].url
    const fondo={backgroundImage: `url(${image})`}
    return (
          <div className="card-container" >
                <div className="card" style={fondo}>
                <h4>{name}</h4>
                <span className="chev">{artists[0].name}</span>
                </div>
            </div>
    );
  };

export default Card
