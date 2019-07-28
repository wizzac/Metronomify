import React, { Component } from 'react';
import './metronomo.css';
import click1 from './assets/click1.wav';
import click2 from './assets/click2.wav';
import './style.css';

class Metronome extends Component {
  constructor(props) {
    super(props);
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
    this.state = {
      playing: false,
      count: 0,
      tunning:this.props.tunning,
      bpm:  this.props.bpm,
      beatsPerMeasure: 4
    };
  }

  startStop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState({
          count: 0,
          playing: true
        },
        this.playClick
      );
    }
  };

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;
    // The first beat will have a different sound than the others
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }
  
    // Keep track of which beat we're on
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };

  handleBpmChange = event => {
    const bpm = event.target.value;
    this.setState({ bpm });
  }


  render() {
    const { playing, bpm,tunning } = this.state;
    return (
      <div className="metronome fixed">
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <div>Tune:{tunning}</div>
          <input 
           type="range"
           min="60"
           max="240"
           value={bpm}
           onChange={this.handleBpmChange} />
        </div>
        <button onClick={this.startStop}>
            {playing ? 'Stop' : 'Start'}
        </button>
      </div>
    );

  }
}

export default Metronome;