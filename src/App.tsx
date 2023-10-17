import React from 'react';
import './App.css';
import {EyeBackground, StarryBackground, ZigZagBackground} from './animated-background-lib';

function App() {
  return (
    <div className="App" style={{backgroundColor:'white', width:'100%', height:'100%'}}>
      {/* <StarryBackground numberOfStars={100} /> */}
      {/* <EyeBackground />  */}
      <ZigZagBackground numberOfCircles={50}/>
    </div>
  );
}

export default App;
