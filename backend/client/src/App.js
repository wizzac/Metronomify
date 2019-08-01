import React, { Component } from 'react';
import Typed from 'typed.js';
import  './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import axios from 'axios';
//import $ from 'jquery';
//import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Buscador from './buscador';



class App extends Component {

  constructor(){
    super();
    const params =this.getHashParams();
    const token = params.access_token;
    this.state = {
      va:'',
      token:token,
      loggedIn: token ? true : false,
    }
  }


 getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  // initialize our state
  
  componentDidMount() {

    var options ={
      strings: ['<span>&nbsp;</span> para practicar','<span>&nbsp;</span> porque quiero','<span>&nbsp;</span> porque puedo'],
      typeSpeed: 30,
      backSpeed: 60,
      backDelay: 1000,
      startDelay: 1000,
      loop: true,
    };
    this.typed = new Typed(this.el, options);
    
  }


  render() {
   
    if(this.state.loggedIn === true){
      var logged = <div className="divLogged">
                        <div id="log" className="row"></div>
                  <br></br>
                    <div id="loggedin" className="row">
                      <div className="col-md-12">
                        <Buscador results={[]}/>
                      </div>
                    </div>
                </div>
    }else{
      logged= <div id="btnLog"> 
                <div className="row">
                  <div className="col-md-12">
                    <br></br>    
                    <a className="btnesta pull-right" href='/login'>Conectar a spotifyyyy</a>
                  </div>
                </div>
                <br></br>
              </div>
    }    
    return (
      <div className="container">
        <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
        <div id="login">
          <div className="row" >
            <div className="col-md-12"  className="absol">
              <h1>Implementacion de api de spotify
                <span ref={(el) => { this.el = el; }}/>
              </h1> 
            </div>
          </div>
        {logged}
    </div>  
    </div>
    );
  }
}

export default App;