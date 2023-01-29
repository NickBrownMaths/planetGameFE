import { useState, useEffect } from 'react';
import { generatePlanet, whatCellAmILookingAt } from './planetCreation.js'

import ControlBar from './Controls/ControlBar';
import DisplayWindows from './Displays/DisplayWindows';

import './App.css';

function App() {
  const [cosmosSeed, setCosmosSeed] = useState(0);
  const [galaxySeed, setGalaxySeed] = useState(0);
  const [systemSeed, setSystemSeed] = useState(0);
  const [planetSeed, setPlanetSeed] = useState(0);
  const [regionSeed, setRegionSeed] = useState(0);

  const [speed, setSpeed] = useState(1);
  const [scale, setScale] = useState(1);
  const [transformMatrix, setTransformMatrix] = useState([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1],]);
  const [lookingAt, setLookingAt] = useState(0);

  const [planet, setPlanet] = useState([[0], [0]]);
  const [displayBiome, setDisplayBiome] = useState('');
  const [reticlevertexdata, setReticlevertexdata] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0,]);
  const [reticlecolourdata, setReticlecolourdata] = useState([1, 0, 0, 1, 0, 0, 1, 0, 0,]);

  useEffect(() => {
    setPlanet(generatePlanet(planetSeed, 100));
  }, [planetSeed]);

  let planetVertices = planet[0];
  let planetColours = planet[1];
  let planetNeighbours = planet[2];
  let planetBiomes = planet[3];

  // Here is where you are generating the red reticle triangle - try to add this as an additional triangle instead of additional canvas
  useEffect(() => {
    let reticleVertices = [0, 0, 0, 0, 0, 0, 0, 0, 0,];
    if (planetVertices) {
      if (planetVertices.length >= 9 * lookingAt + 9) {
        for (let i = 0; i < 3; i++) {
          reticleVertices[3 * i + 0] = planetVertices[lookingAt * 9 + 3 * i + 0] ;
          reticleVertices[3 * i + 1] = planetVertices[lookingAt * 9 + 3 * i + 1] ;
          reticleVertices[3 * i + 2] = planetVertices[lookingAt * 9 + 3 * i + 2] ;
        }
      }
      setReticlevertexdata(reticleVertices);
    }
    if (planetBiomes) {
      if (planetBiomes.length > lookingAt) {
        setDisplayBiome(planetBiomes[lookingAt]);
      }
    }
  }, [transformMatrix]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="App">
      <DisplayWindows
        transformMatrix={transformMatrix}
        planetSeed={planetSeed}
        scale={scale}
        speed={speed}
        vertexdata={planetVertices}
        colourdata={planetColours}
        displayBiome={displayBiome}
        reticlevertexdata={reticlevertexdata}
        reticlecolourdata={reticlecolourdata}
      />
      <ControlBar
        planetSeed={planetSeed}
        setPlanetSeed={setPlanetSeed}
        setTransformMatrix={setTransformMatrix}
        transformMatrix={transformMatrix}
        setSpeed={setSpeed} speed={speed}
        setScale={setScale} scale={scale}
        setLookingAt={setLookingAt}
        planetVertices={planetVertices}
      />
    </div>
  );
}

export default App;
