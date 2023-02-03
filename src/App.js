import { useState, useEffect } from 'react';
import { generatePlanet, elevationColours, naturalColours, biomeColours, onshoreColours } from './planetCreation.js'

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
  const [planetDisplayType, setPlanetDisplayType] = useState('natural')

  const [planet, setPlanet] = useState([[0], [0]]);
  const [planetColours, setPlanetColours] = useState([0, 0]);
  const [planetVertices, setPlanetVertices] = useState([0, 0]);
  const [planetNeighbours, setPlanetNeighbours] = useState([0, 0]);
  const [planetBiomes, setPlanetBiomes] = useState([0, 0]);
  const [planetElevation, setPlanetElevation] = useState([0, 0]);
  const [planetOnshoreDist, setPlanetOnshoreDist] = useState([0, 0]);

  const [displayBiome, setDisplayBiome] = useState('');
  const [displayElevation, setDisplayElevation] = useState(0);

  const [reticleVertexData, setReticleVertexData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0,]);
  const [reticleColourData, setReticleVolourData] = useState([1, 0, 0, 1, 0, 0, 1, 0, 0,]);

  useEffect(() => {
    setPlanet(generatePlanet(planetSeed, 100));
    setPlanetDisplayType('natural');
  }, [planetSeed]);

  useEffect(() => {
    if (planet[2]) {
      if (planet[2].length > 0) {
        /* */if (planetDisplayType === 'natural')/*  */ { setPlanetColours(naturalColours(planet[2], planetSeed)); }
        else if (planetDisplayType === 'biome')/*    */ { setPlanetColours(biomeColours(planet[2])); }
        else if (planetDisplayType === 'elevation')/**/ { setPlanetColours(elevationColours(planet[3])); }
        else if (planetDisplayType === 'onshore')/*  */ { setPlanetColours(onshoreColours(planet[4])); }
      }
    }
  }, [planet, planetDisplayType]);

  useEffect(() => {
    if (planet[2]) {
      if (planet[2].length > 0) {
        setPlanetVertices(planet[0]);
        setPlanetNeighbours(planet[1]);
        setPlanetBiomes(planet[2]);
        setPlanetElevation(planet[3]);
        setPlanetOnshoreDist(planet[4]);
        setPlanetDisplayType('natural');
      }
    }
  }, [planet]);






  // Here is where you are generating the red reticle triangle - try to add this as an additional triangle instead of additional canvas
  useEffect(() => {
    let reticleVertices = [0, 0, 0, 0, 0, 0, 0, 0, 0,];
    if (planetVertices) {
      if (planetVertices.length >= 9 * lookingAt + 9) {
        for (let i = 0; i < 3; i++) {
          reticleVertices[3 * i + 0] = planetVertices[lookingAt * 9 + 3 * i + 0];
          reticleVertices[3 * i + 1] = planetVertices[lookingAt * 9 + 3 * i + 1];
          reticleVertices[3 * i + 2] = planetVertices[lookingAt * 9 + 3 * i + 2];
        }
      }
      setReticleVertexData(reticleVertices);
    }
    if (planetBiomes) {
      if (planetBiomes.length > lookingAt) {
        setDisplayBiome(planetBiomes[lookingAt]);
        setDisplayElevation(planetElevation[lookingAt])
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
        displayElevation={displayElevation}
        reticlevertexdata={reticleVertexData}
        reticlecolourdata={reticleColourData}
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
        changeDisplay={setPlanetDisplayType}
      />
    </div>
  );
}

export default App;
