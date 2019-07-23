import React from "react";
import Card from "./card";
import Metronome from "./metronomo";


const Lista = ({ list }) => {
  let cards = '';
  if (list.results) {
    cards = list.results.map((m, i) => <Card key={i} item={m} />);
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <div>{cards}</div>
      </div>
      <div className="col-md-6">
        <Metronome></Metronome>
      </div>
    </div>
  );
};

export default Lista;
