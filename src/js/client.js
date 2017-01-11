import expect from 'expect';
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';

import "../css/styles.scss";

const Bulb = ({ color }) => (
  <div class={ color + " light" }></div>
);

const TrafficLight = ({on}) => (
  <div>
    <div class="traffic-light">
      <Bulb color={(on === 0 ? "active red" : "red")}></Bulb>  
      <Bulb color={(on === 1 ? "active yellow" : "yellow")}></Bulb>  
      <Bulb color={(on === 2 ? "active green" : "green")}></Bulb>  
    </div>
    <button onClick={ () => store.dispatch({type : "CHANGE_LIGHT"}) }>Change light</button>
  </div>
);

const render = () => {
  ReactDOM.render(
    <TrafficLight on = { store.getState() }/>,
    document.getElementById('root')
  )
}

//My Reducer
const trafficLight = (state, action) => {
  switch(action.type){
    case "CHANGE_LIGHT":
      switch(state){
        case 0:
          return 1;
        case 1:
          return 2;
        case 2:
          return 0;
        default:
          return 0;
      }
    default:
      return state;
  }
}



//createStore: reducer -> store
const store = createStore(trafficLight);

store.subscribe(render);
render();
