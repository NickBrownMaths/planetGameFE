import { useState, useEffect } from 'react';
import { generatePlanet, elevationColours, naturalColours, biomeColours, onshoreColours, applyCosmosResources } from './Utils/planetCreation.js'

import ControlBar from './Controls/ControlBar';
import DisplayWindows from './Displays/DisplayWindows';

import WordGen from './Utils/WordGen.js';
import { generateCosmosMaterials, generateMaterial, MATERIAL } from './Utils/resources.js';

function App() {
  const [cosmosSeed, setCosmosSeed] = useState(22);
  const [galaxySeed, setGalaxySeed] = useState(0);
  const [systemSeed, setSystemSeed] = useState(0);
  const [planetSeed, setPlanetSeed] = useState(0);
  const [regionSeed, setRegionSeed] = useState(0);

  const [cosmosMaterials, setCosmosMaterials] = useState([0, 0]);

  const [speed, setSpeed] = useState(1);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1],]);
  const [lookingAt, setLookingAt] = useState(0);
  const [planetDisplayType, setPlanetDisplayType] = useState('natural')

  const [planet, setPlanet] = useState([[0], [0]]);
  const [planetColours, setPlanetColours] = useState([0, 0]);
  const [planetVertices, setPlanetVertices] = useState([0, 0]);
  const [planetNeighbours, setPlanetNeighbours] = useState([0, 0]);
  const [planetBiomes, setPlanetBiomes] = useState([0, 0]);
  const [planetElevation, setPlanetElevation] = useState([0, 0]);
  const [planetOnshoreDist, setPlanetOnshoreDist] = useState([0, 0]);
  const [planetResources, setPlanetResources] = useState([0, 0]);


  const [displayBiome, setDisplayBiome] = useState('');
  const [displayElevation, setDisplayElevation] = useState(0);
  const [displayOnshore, setDisplayOnshore] = useState(0);
  const [planetName, setPlanetName] = useState('');

  const [reticleVertexData, setReticleVertexData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0,]);
  const [reticleColourData, setReticleVolourData] = useState([1, 0, 0, 1, 0, 0, 1, 0, 0,]);

  useEffect(() => {
    let mats = generateCosmosMaterials(cosmosSeed) ;
    setCosmosMaterials(mats);
  }, [cosmosSeed]);

  useEffect(() => {
    setPlanet(generatePlanet(planetSeed, 100));
    let wordGen = new WordGen(planetSeed);
    setPlanetName(wordGen.createName());
    setPlanetDisplayType('natural');
    setRotation([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1],]);
    setScale(1);
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
        setPlanetResources(applyCosmosResources(planetSeed, planet[2], cosmosMaterials));
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
        setDisplayOnshore(planetOnshoreDist[lookingAt])
      }
    }
  }, [rotation]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  return (
    <div className="App">
      <DisplayWindows
        rotation={rotation}
        planetSeed={planetSeed}
        scale={scale}
        speed={speed}
        vertexdata={planetVertices}
        colourdata={planetColours}
        planetName={planetName}
        planetDisplayType={planetDisplayType}
        displayBiome={displayBiome}
        displayElevation={displayElevation}
        displayOnshore={displayOnshore}
        localResources={planetResources[lookingAt]}
        reticlevertexdata={reticleVertexData}
        reticlecolourdata={reticleColourData}
      />
      <ControlBar
        planetSeed={planetSeed}
        setPlanetSeed={setPlanetSeed}
        setRotation={setRotation}
        rotation={rotation}
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
