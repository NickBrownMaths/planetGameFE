import MersenneTwister from "mersenne-twister";

export function generateIcosahedron() {
  // Generate Icosahedron data
  let p = (1 + Math.sqrt(5)) / 4;
  let point00 = [-p, 0, -0.5]
  let point01 = [-p, 0, 0.5]
  let point02 = [-0.5, -p, 0]
  let point03 = [-0.5, p, 0]
  let point04 = [0, -0.5, -p]
  let point05 = [0, -0.5, p]
  let point06 = [0, 0.5, -p]
  let point07 = [0, 0.5, p]
  let point08 = [0.5, -p, 0]
  let point09 = [0.5, p, 0]
  let point10 = [p, 0, -0.5]
  let point11 = [p, 0, 0.5]
  let icosTriangles = [
    [point04, point06, point10,],
    [point00, point04, point06,],
    [point02, point04, point08,],
    [point00, point02, point04,],
    [point04, point08, point10,],
    [point05, point07, point11,],
    [point05, point08, point11,],
    [point01, point05, point07,],
    [point01, point02, point05,],
    [point02, point05, point08,],
    [point00, point03, point06,],
    [point03, point06, point09,],
    [point06, point09, point10,],
    [point01, point03, point07,],
    [point07, point09, point11,],
    [point03, point07, point09,],
    [point00, point01, point02,],
    [point00, point01, point03,],
    [point08, point10, point11,],
    [point09, point10, point11,],
  ]

  let icosNeighbourMap = [
    [1, 4, 12],
    [0, 3, 10],
    [3, 4, 9],
    [1, 2, 16],
    [0, 2, 18],
    [6, 7, 14],
    [5, 9, 18],
    [5, 8, 13],
    [7, 9, 16],
    [2, 6, 8],
    [1, 11, 17],
    [10, 12, 15],
    [0, 11, 19],
    [7, 15, 17],
    [5, 15, 19],
    [11, 13, 14],
    [3, 8, 17],
    [10, 13, 16],
    [4, 6, 19],
    [12, 14, 18],
  ]

  return [icosTriangles, icosNeighbourMap];
}

export function findArrayIndex(inputArray, searchTerm, relationship) {
  let arrayIndex = inputArray.length;
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] === searchTerm) {
      arrayIndex = i;
      i = inputArray.length;
    }
  }
  if (arrayIndex === inputArray.length) {
    console.log('arrayError: ' + searchTerm + " not in " + inputArray + " (" + relationship + ")")
  }
  return arrayIndex
}

export function getRandomFromArray(arr, RNG) {
  let rand = RNG.random();
  return arr[Math.floor(rand * arr.length)]
}

export function floodFill(start, nbrMap, biomeMap, depth, newBiome, oldBiome) {
  if (biomeMap[start] != newBiome && (oldBiome === '' || biomeMap[start] === oldBiome)) {
    biomeMap[start] = newBiome;
    if (depth > 0) {
      for (let i = 0; i < 3; i++) {
        if (typeof (nbrMap[start]) !== 'undefined') {
          let next = nbrMap[start][i];
          floodFill(next, nbrMap, biomeMap, depth - 1, newBiome, oldBiome);
        }
      }
    }
  }
}

export function drunkardsWalk(start, nbrMap, biomeMap, walkLength, depth, newBiome, oldBiome, bias, RNGen) {
  let currentCell = start;
  let prevCell;
  for (let i = 0; i < walkLength; i++) {
    floodFill(currentCell, nbrMap, biomeMap, depth, newBiome, oldBiome);
    if (bias === 'direction') {
      let nextCell = currentCell;
      while (nextCell === currentCell || nextCell === prevCell) {
        let rand = Math.floor(RNGen.random() * 3);
        nextCell = nbrMap[currentCell][rand];
      }
      prevCell = currentCell;
      currentCell = nextCell;
    }



    // Find next cell based on bias
    // Possible biases - altitude, current direction, inland distance, 




  }
}

export function generatePlanet(seed, n) {
  let RNGen = new MersenneTwister(seed)
  let icosData = generateIcosahedron();
  let icosTris = icosData[0];
  let icosMap = icosData[1];

  // Create neighbour mappings for misaligned global triangles
  let TLMap = [[], [],];
  let LTMap = [[], [],];
  let TRMap = [[], [],];
  let RTMap = [[], [],];
  let LRMap = [[], [],];
  let RLMap = [[], [],];
  for (let termIdx = 0; termIdx < n; termIdx++) {
    // TOP
    TLMap[0].push(termIdx);
    TRMap[0].push(termIdx);
    LTMap[1].push(termIdx);
    RTMap[1].push(termIdx);

    // LEFT
    let term = termIdx * (2 * n - termIdx);
    LRMap[0].push(term);
    LTMap[0].push(term);
    RLMap[1].push(term);
    TLMap[1].push(term);

    // RIGHT
    term = n * n - (n - termIdx) * (n - termIdx - 1);
    term = term - 1;
    RLMap[0].push(term);
    RTMap[0].push(term);
    LRMap[1].push(term);
    TRMap[1].push(term);
  }

  // Interpolate the faces
  let interpvertices = [];
  let interpz = [];
  let globalIdx = 0;
  let globalNbrs = [];
  for (let curMacroFace = 0; curMacroFace < icosTris.length; curMacroFace++) {
    // icosTris[h] is of the form [x1, y1, z1, x2, y2, z2, x3, y3, z3]
    // Vertices the original triangle
    let p1 = icosTris[curMacroFace][0];
    let p2 = icosTris[curMacroFace][1];
    let p3 = icosTris[curMacroFace][2];

    // The big triangle neighbours of the current big triangle
    let macroNbrs = icosMap[curMacroFace];
    // Work out relationsihps between big Tri nbrs
    let macroNbrRlns = []
    let currTop = [...p1, ...p2];
    let currLef = [...p1, ...p3];
    let currRig = [...p2, ...p3];
    for (let curMacroNbr = 0; curMacroNbr < 3; curMacroNbr++) {
      let nbrP1 = icosTris[macroNbrs[curMacroNbr]][0];
      let nbrP2 = icosTris[macroNbrs[curMacroNbr]][1];
      let nbrP3 = icosTris[macroNbrs[curMacroNbr]][2];

      let nbrTop = [...nbrP1, ...nbrP2];
      let nbrLef = [...nbrP1, ...nbrP3];
      let nbrRig = [...nbrP2, ...nbrP3];

      let cntrTT = 0;
      let cntrTL = 0;
      let cntrTR = 0;
      let cntrLT = 0;
      let cntrLL = 0;
      let cntrLR = 0;
      let cntrRT = 0;
      let cntrRL = 0;
      let cntrRR = 0;
      for (let curMacroEdgeCoord = 0; curMacroEdgeCoord < 6; curMacroEdgeCoord++) {
        if (currTop[curMacroEdgeCoord] === nbrTop[curMacroEdgeCoord]) { cntrTT++; }
        if (currTop[curMacroEdgeCoord] === nbrLef[curMacroEdgeCoord]) { cntrTL++; }
        if (currTop[curMacroEdgeCoord] === nbrRig[curMacroEdgeCoord]) { cntrTR++; }
        if (currLef[curMacroEdgeCoord] === nbrTop[curMacroEdgeCoord]) { cntrLT++; }
        if (currLef[curMacroEdgeCoord] === nbrLef[curMacroEdgeCoord]) { cntrLL++; }
        if (currLef[curMacroEdgeCoord] === nbrRig[curMacroEdgeCoord]) { cntrLR++; }
        if (currRig[curMacroEdgeCoord] === nbrTop[curMacroEdgeCoord]) { cntrRT++; }
        if (currRig[curMacroEdgeCoord] === nbrLef[curMacroEdgeCoord]) { cntrRL++; }
        if (currRig[curMacroEdgeCoord] === nbrRig[curMacroEdgeCoord]) { cntrRR++; }
      }

      let relationship = "";
      if (cntrTT === 6) { relationship = "TT" }
      else if (cntrTL === 6) { relationship = "TL" }
      else if (cntrTR === 6) { relationship = "TR" }
      else if (cntrLT === 6) { relationship = "LT" }
      else if (cntrLL === 6) { relationship = "LL" }
      else if (cntrLR === 6) { relationship = "LR" }
      else if (cntrRT === 6) { relationship = "RT" }
      else if (cntrRL === 6) { relationship = "RL" }
      else if (cntrRR === 6) { relationship = "RR" }
      else { relationship = "unknown" }
      macroNbrRlns.push(relationship);
    }
    // Stepwise vectors between vertices 
    let d12 = [(p2[0] - p1[0]) / n, (p2[1] - p1[1]) / n, (p2[2] - p1[2]) / n];
    let d13 = [(p3[0] - p1[0]) / n, (p3[1] - p1[1]) / n, (p3[2] - p1[2]) / n];

    for (let curRow = 0; curRow < n; curRow++) {
      let totalSlants = n - curRow;
      // Upwards pointing Triangles
      if (curRow > 0) {
        for (let curSlant = 0; curSlant < totalSlants; curSlant++) {
          // Subdivide the face
          let u1 = [p1[0] + (curRow - 0) * d13[0] + (curSlant + 0) * d12[0], p1[1] + (curRow - 0) * d13[1] + (curSlant + 0) * d12[1], p1[2] + (curRow - 0) * d13[2] + (curSlant + 0) * d12[2]];
          let u2 = [p1[0] + (curRow - 0) * d13[0] + (curSlant + 1) * d12[0], p1[1] + (curRow - 0) * d13[1] + (curSlant + 1) * d12[1], p1[2] + (curRow - 0) * d13[2] + (curSlant + 1) * d12[2]];
          let u3 = [p1[0] + (curRow - 1) * d13[0] + (curSlant + 1) * d12[0], p1[1] + (curRow - 1) * d13[1] + (curSlant + 1) * d12[1], p1[2] + (curRow - 1) * d13[2] + (curSlant + 1) * d12[2]];

          // // Calculate norm of each coordinate
          let normu1 = 0.5 * Math.sqrt(u1[0] * u1[0] + u1[1] * u1[1] + u1[2] * u1[2]);
          let normu2 = 0.5 * Math.sqrt(u2[0] * u2[0] + u2[1] * u2[1] + u2[2] * u2[2]);
          let normu3 = 0.5 * Math.sqrt(u3[0] * u3[0] + u3[1] * u3[1] + u3[2] * u3[2]);
          // Project 3 xyz coords onto a sphere the save them. 
          interpvertices.push(u1[0] / (2 * normu1));
          interpvertices.push(u1[1] / (2 * normu1));
          interpvertices.push(u1[2] / (2 * normu1));
          interpvertices.push(u2[0] / (2 * normu2));
          interpvertices.push(u2[1] / (2 * normu2));
          interpvertices.push(u2[2] / (2 * normu2));
          interpvertices.push(u3[0] / (2 * normu3));
          interpvertices.push(u3[1] / (2 * normu3));
          interpvertices.push(u3[2] / (2 * normu3));
          // Handle neighbour mapping within the big triangle and calcuate distance from equator
          globalNbrs.push([globalIdx - totalSlants - 1, globalIdx - totalSlants, globalIdx + totalSlants,]);
          globalIdx++;
          interpz.push((u1[2] / (2 * normu1) + u2[2] / (2 * normu2) + u3[2] / (2 * normu3)) / 3);
        }
      }

      // Downwards pointing triangles
      for (let curSlant = 0; curSlant < totalSlants; curSlant++) {
        // Subdivide the face
        let d1 = [p1[0] + (curRow + 0) * d13[0] + (curSlant + 0) * d12[0], p1[1] + (curRow + 0) * d13[1] + (curSlant + 0) * d12[1], p1[2] + (curRow + 0) * d13[2] + (curSlant + 0) * d12[2]];
        let d2 = [p1[0] + (curRow + 0) * d13[0] + (curSlant + 1) * d12[0], p1[1] + (curRow + 0) * d13[1] + (curSlant + 1) * d12[1], p1[2] + (curRow + 0) * d13[2] + (curSlant + 1) * d12[2]];
        let d3 = [p1[0] + (curRow + 1) * d13[0] + (curSlant + 0) * d12[0], p1[1] + (curRow + 1) * d13[1] + (curSlant + 0) * d12[1], p1[2] + (curRow + 1) * d13[2] + (curSlant + 0) * d12[2]];
        // Calculate norm of each coordinate
        let normd1 = 0.5 * Math.sqrt(d1[0] * d1[0] + d1[1] * d1[1] + d1[2] * d1[2]);
        let normd2 = 0.5 * Math.sqrt(d2[0] * d2[0] + d2[1] * d2[1] + d2[2] * d2[2]);
        let normd3 = 0.5 * Math.sqrt(d3[0] * d3[0] + d3[1] * d3[1] + d3[2] * d3[2]);
        // Project 3 xyz coords onto a sphere the save them. 
        interpvertices.push(d1[0] / (2 * normd1));
        interpvertices.push(d1[1] / (2 * normd1));
        interpvertices.push(d1[2] / (2 * normd1));
        interpvertices.push(d2[0] / (2 * normd2));
        interpvertices.push(d2[1] / (2 * normd2));
        interpvertices.push(d2[2] / (2 * normd2));
        interpvertices.push(d3[0] / (2 * normd3));
        interpvertices.push(d3[1] / (2 * normd3));
        interpvertices.push(d3[2] / (2 * normd3));
        // Handle neighbour mapping within the big triangle and calcuate distance from equator
        if (curRow === 0 && curSlant === 0) { // TL corner case
          globalNbrs.push([globalIdx + totalSlants]);
        } else if (curRow === 0 && curSlant === totalSlants - 1) { // TR corner case
          globalNbrs.push([globalIdx + totalSlants - 1]);
        } else if (curRow === n - 1) { // B corner case
          globalNbrs.push([globalIdx - 1]);
        } else if (curRow === 0) { // T edge case
          globalNbrs.push([globalIdx + totalSlants - 1, globalIdx + totalSlants]);
        } else if (curSlant === 0) { // L edge case
          globalNbrs.push([globalIdx - totalSlants, globalIdx + totalSlants]);
        } else if (curSlant === totalSlants - 1) { // R edge case
          globalNbrs.push([globalIdx - totalSlants, globalIdx + totalSlants - 1]);
        } else { // standard case
          globalNbrs.push([globalIdx - totalSlants, globalIdx + totalSlants - 1, globalIdx + totalSlants]);
        }

        // Handle neighbour mapping at big triangle edges
        for (let curRelationship = 0; curRelationship < 3; curRelationship++) {
          if (macroNbrRlns[curRelationship] === 'TT' && curRow === 0) {
            let localIdx = globalIdx - curMacroFace * n * n;
            globalNbrs[globalNbrs.length - 1].push(n * n * macroNbrs[curRelationship] + localIdx);

          } else if (macroNbrRlns[curRelationship] === 'TL' && curRow === 0) {
            let localIdx = globalIdx - curMacroFace * n * n;
            let foundIdx = findArrayIndex(TLMap[0], localIdx, macroNbrRlns[curRelationship]);
            let mappedIdx = TLMap[1][foundIdx];
            let newNbr = n * n * macroNbrs[curRelationship] + mappedIdx;
            if (newNbr < n * n * 20) {
              globalNbrs[globalNbrs.length - 1].push(newNbr);
            } else (console.log(macroNbrRlns[curRelationship] + " " + newNbr))

          } else if (macroNbrRlns[curRelationship] === 'TR' && curRow === 0) {
            let localIdx = globalIdx - curMacroFace * n * n;
            let foundIdx = findArrayIndex(TRMap[0], localIdx, macroNbrRlns[curRelationship]);
            let mappedIdx = TRMap[1][foundIdx];
            let newNbr = n * n * macroNbrs[curRelationship] + mappedIdx;
            if (newNbr < n * n * 20) {
              globalNbrs[globalNbrs.length - 1].push(newNbr);
            } else (console.log(macroNbrRlns[curRelationship] + " " + newNbr))

          } else if (macroNbrRlns[curRelationship] === 'LT' && curSlant === 0) {
            let localIdx = globalIdx - curMacroFace * n * n;
            let foundIdx = findArrayIndex(LTMap[0], localIdx, macroNbrRlns[curRelationship]);
            let mappedIdx = LTMap[1][foundIdx];
            let newNbr = n * n * macroNbrs[curRelationship] + mappedIdx;
            if (newNbr < n * n * 20) {
              globalNbrs[globalNbrs.length - 1].push(newNbr);
            } else (console.log(macroNbrRlns[curRelationship] + " " + newNbr))

          } else if (macroNbrRlns[curRelationship] === 'LL' && curSlant === 0) {
            let localIdx = globalIdx - curMacroFace * n * n;
            globalNbrs[globalNbrs.length - 1].push(n * n * macroNbrs[curRelationship] + localIdx);

          } else if (macroNbrRlns[curRelationship] === 'LR' && curSlant === 0) {
            let localIdx = globalIdx - curMacroFace * n * n;
            let foundIdx = findArrayIndex(LRMap[0], localIdx, macroNbrRlns[curRelationship]);
            let mappedIdx = LRMap[1][foundIdx];
            let newNbr = n * n * macroNbrs[curRelationship] + mappedIdx;
            if (newNbr < n * n * 20) {
              globalNbrs[globalNbrs.length - 1].push(newNbr);
            } else (console.log(macroNbrRlns[curRelationship] + " " + newNbr))

          } else if (macroNbrRlns[curRelationship] === 'RT' && curSlant === totalSlants - 1) {
            let localIdx = globalIdx - curMacroFace * n * n;
            let foundIdx = findArrayIndex(RTMap[0], localIdx, macroNbrRlns[curRelationship]);
            let mappedIdx = RTMap[1][foundIdx];
            let newNbr = n * n * macroNbrs[curRelationship] + mappedIdx;
            if (newNbr < n * n * 20) {
              globalNbrs[globalNbrs.length - 1].push(newNbr);
            } else (console.log(macroNbrRlns[curRelationship] + " " + newNbr))

          } else if (macroNbrRlns[curRelationship] === 'RL' && curSlant === totalSlants - 1) {
            let localIdx = globalIdx - curMacroFace * n * n;
            let foundIdx = findArrayIndex(RLMap[0], localIdx, macroNbrRlns[curRelationship]);
            let mappedIdx = RLMap[1][foundIdx];
            let newNbr = n * n * macroNbrs[curRelationship] + mappedIdx;
            if (newNbr < n * n * 20) {
              globalNbrs[globalNbrs.length - 1].push(newNbr);
            } else (console.log(macroNbrRlns[curRelationship] + " " + newNbr))

          } else if (macroNbrRlns[curRelationship] === 'RR' && curSlant === totalSlants - 1) {
            let localIdx = globalIdx - curMacroFace * n * n;
            globalNbrs[globalNbrs.length - 1].push(n * n * macroNbrs[curRelationship] + localIdx);

          }
        }

        globalIdx++;
        interpz.push((d1[2] / (2 * normd1) + d2[2] / (2 * normd2) + d3[2] / (2 * normd3)) / 3);
      }
    }
  }

  // Continents oceans and coastline
  let globalBiome = [];
  // Set biome band
  for (let i = 0; i < globalNbrs.length; i++) {
    let dist = Math.abs(interpz[i]);
    dist = dist * ((RNGen.random() * 2 - 1) / 20 + 1);
    let biome = "";
    /* */if (dist < 0.200) /*000-225*/ { biome = 'tropical rainforest' }
    else if (dist < 0.300) /*225-325*/ { biome = 'savanna' }
    else if (dist < 0.600) /*325-425*/ { biome = 'desert' }
    else if (dist < 0.700) /*425-625*/ { biome = 'grassland' }
    else if (dist < 0.800) /*625-700*/ { biome = 'temperate forest' }
    else if (dist < 0.900) /*700-900*/ { biome = 'boreal forest' }
    else if (dist < 0.950) /*900-950*/ { biome = 'tundra' }
    else                   /*950-1e3*/ { biome = 'polar' }
    globalBiome.push(biome);
  }
  //Draw some Oceans
  let oceanFraction = 0;
  while (oceanFraction < 0.7) {
    let rand = RNGen.random();
    let initialCell = Math.floor(rand * globalNbrs.length);
    floodFill(initialCell, globalNbrs, globalBiome, 2 * n, 'ocean', '');
    let oceanCntr = 0;
    for (let i = 0; i < globalNbrs.length; i++) {
      if (globalBiome[i] === 'ocean') { oceanCntr++ }
    }
    oceanFraction = oceanCntr / (n * n * 20);
  }
  // Mark out isolated islands and coast
  let globalOnshoreDistance = new Array(globalNbrs.length).fill(0);
  let onshoreCalcQueue = [];
  for (let i = 0; i < globalNbrs.length; i++) {
    let oceanNbrCntr = 0;
    for (let j = 0; j < globalNbrs[i].length; j++) {
      if (globalBiome[globalNbrs[i][j]] === 'ocean') { oceanNbrCntr++; }
    }
    if (oceanNbrCntr === 3 && globalBiome[i] != 'ocean') {
      let rand = RNGen.random();
      if (rand < 0.85) { globalBiome[i] = 'ocean'; }
      else if (globalBiome[i] === 'tropical rainforest' || globalBiome[i] === 'desert' || globalBiome[i] === 'savanna') {
        rand = RNGen.random();
        /**/if (rand < 0.5) { globalBiome[i] = 'coral'; }
        else { globalBiome[i] = 'tropical islet'; }
      }
      else if (globalBiome[i] === 'polar') { globalBiome[i] = 'iceberg'; }
      else { globalBiome[i] = 'islet'; }

    }
    else if (oceanNbrCntr > 0 && globalBiome[i] != 'ocean') {
      //globalBiome[i] = 'coast';

      let rand = RNGen.random();
      /* */if (globalBiome[i] === 'tropical rainforest' || globalBiome[i] === 'savanna') { globalBiome[i] = 'mangrove' }
      else if (globalBiome[i] === 'desert') { globalBiome[i] = 'tropical beach' }
      else if (globalBiome[i] === 'boreal forest' && rand < 0.1) { globalBiome[i] = 'salt marsh' }
      else if (globalBiome[i] === 'boreal forest' || globalBiome[i] === 'tundra') { globalBiome[i] = 'cold beach' }
      else if (globalBiome[i] === 'polar') { }
      else { globalBiome[i] = 'beach' }

      globalOnshoreDistance[i] = 1;
      onshoreCalcQueue.push(i);
    }
  }
  // Calculate onshore distance
  let maxOnshoreDist = 0;
  while (onshoreCalcQueue.length > 0) {
    let current = onshoreCalcQueue.shift();
    for (let nbr = 0; nbr < globalNbrs[current].length; nbr++) {
      if (globalOnshoreDistance[globalNbrs[current][nbr]] === 0 && globalBiome[globalNbrs[current][nbr]] != 'ocean') {
        globalOnshoreDistance[globalNbrs[current][nbr]] = globalOnshoreDistance[current] + 1;
        onshoreCalcQueue.push(globalNbrs[current][nbr]);
        if (globalOnshoreDistance[current] + 1 > maxOnshoreDist) {
          maxOnshoreDist = globalOnshoreDistance[current] + 1;
        }
      }
    }
  }
  // Place shallows, create array of ocean and land
  let oceanCells = [];
  let landCells = [];
  let riverSourceCells = [];
  for (let i = 0; i < globalNbrs.length; i++) {
    if (globalBiome[i] == 'ocean') { oceanCells.push(i); }
    else { landCells.push(i); }

    if (globalBiome[i] === 'cliff'
      || globalBiome[i] === 'polar'
      || globalBiome[i] === 'tropical cliff'
      || globalBiome[i] === 'mangrove'
      || globalBiome[i] === 'cold beach'
      || globalBiome[i] === 'beach'
      || globalBiome[i] === 'tropical beach'
      || globalBiome[i] === 'fjord'
      || globalBiome[i] === 'salt marsh') {
      for (let j = 0; j < globalNbrs[i].length; j++) {
        if (globalBiome[globalNbrs[i][j]] === 'ocean') {
          floodFill(globalNbrs[i][j], globalNbrs, globalBiome, 3, 'shallows', 'ocean');
        }
      }
    }
  }

  // generate some elevation
  let globalElevation = new Array(globalNbrs.length).fill(0);
  // Mountain ranges
  let numRanges = 3 * Math.floor(Math.sqrt(n));
  let wibblyness = 0.15;
  let steepness = 0.7;
  while (numRanges > 0) {
    let rangeStart = landCells[Math.floor(RNGen.random() * landCells.length)];
    let rangeEnd = landCells[Math.floor(RNGen.random() * landCells.length)];
    let rangeLength = Math.sqrt(
      ((
        interpvertices[9 * rangeStart + 0] - interpvertices[9 * rangeEnd + 0] +
        interpvertices[9 * rangeStart + 3] - interpvertices[9 * rangeEnd + 3] +
        interpvertices[9 * rangeStart + 6] - interpvertices[9 * rangeEnd + 6]) / 3) ** 2 +
      ((
        interpvertices[9 * rangeStart + 1] - interpvertices[9 * rangeEnd + 1] +
        interpvertices[9 * rangeStart + 4] - interpvertices[9 * rangeEnd + 4] +
        interpvertices[9 * rangeStart + 7] - interpvertices[9 * rangeEnd + 7]) / 3) ** 2 +
      ((
        interpvertices[9 * rangeStart + 2] - interpvertices[9 * rangeEnd + 2] +
        interpvertices[9 * rangeStart + 5] - interpvertices[9 * rangeEnd + 5] +
        interpvertices[9 * rangeStart + 8] - interpvertices[9 * rangeEnd + 8]) / 3) ** 2
    )

    if (rangeLength < 0.3) {
      numRanges--;
      let currentCell = rangeStart;
      let baseElevation = Math.floor(RNGen.random() * 10) + 1;
      let currentCellDistToEnd = rangeLength;
      while (currentCell != rangeEnd) {
        let peakElevation = baseElevation + Math.floor(RNGen.random() * 11);
        let elevation = peakElevation;
        let elevationCalcQueue = [currentCell];
        while (elevation > 0) {
          let currentElevQueue = elevationCalcQueue.shift();
          if (elevation > globalElevation[currentElevQueue]) {
            globalElevation[currentElevQueue] = elevation;
            if (elevation > 10 && globalBiome[currentElevQueue] !== 'ocean' && globalBiome[currentElevQueue] != 'shallows') { riverSourceCells.push(currentElevQueue); }
            for (let j = 0; j < globalNbrs[currentElevQueue].length; j++) {
              elevationCalcQueue.push(globalNbrs[currentElevQueue][j]);
            }
          }
          elevation--;
          if (RNGen.random < steepness) { elevation--; }
        }

        let nextCell = currentCell;
        for (let j = 0; j < globalNbrs[currentCell].length; j++) {

          let nbrCellDistToEnd = Math.sqrt(
            ((
              interpvertices[9 * globalNbrs[currentCell][j] + 0] - interpvertices[9 * rangeEnd + 0] +
              interpvertices[9 * globalNbrs[currentCell][j] + 3] - interpvertices[9 * rangeEnd + 3] +
              interpvertices[9 * globalNbrs[currentCell][j] + 6] - interpvertices[9 * rangeEnd + 6]) / 3) ** 2 +
            ((
              interpvertices[9 * globalNbrs[currentCell][j] + 1] - interpvertices[9 * rangeEnd + 1] +
              interpvertices[9 * globalNbrs[currentCell][j] + 4] - interpvertices[9 * rangeEnd + 4] +
              interpvertices[9 * globalNbrs[currentCell][j] + 7] - interpvertices[9 * rangeEnd + 7]) / 3) ** 2 +
            ((
              interpvertices[9 * globalNbrs[currentCell][j] + 2] - interpvertices[9 * rangeEnd + 2] +
              interpvertices[9 * globalNbrs[currentCell][j] + 5] - interpvertices[9 * rangeEnd + 5] +
              interpvertices[9 * globalNbrs[currentCell][j] + 8] - interpvertices[9 * rangeEnd + 8]) / 3) ** 2
          )

          if (nbrCellDistToEnd <= currentCellDistToEnd) {
            currentCellDistToEnd = nbrCellDistToEnd;
            nextCell = globalNbrs[currentCell][j];
          }

          currentCell = nextCell;
          if (RNGen.random() < wibblyness) {
            nextCell = globalNbrs[currentCell][Math.floor(RNGen.random() * 3)];
          }
        }
      }
    }
  }

  // Isolated Mountains
  let numMtns = Math.floor(n ** 1);
  for (let i = 0; i < numMtns; i++) {
    let peakCell = landCells[Math.floor(RNGen.random() * landCells.length)];
    if (globalOnshoreDistance[peakCell] > 5) {
      let elevation = 5 + Math.floor(RNGen.random() * 5) + Math.floor(RNGen.random() * 5) + Math.floor(RNGen.random() * 5);
      let hillCalcQueue = [peakCell];
      while (elevation > 0 && globalElevation[peakCell] < 20) {
        let currentHillCell = hillCalcQueue.shift();
        if (elevation > globalElevation[currentHillCell]) {
          globalElevation[currentHillCell] = elevation;
          if (globalElevation[currentHillCell] === 4) { riverSourceCells.push(currentHillCell); }
          for (let j = 0; j < globalNbrs[currentHillCell].length; j++) {
            hillCalcQueue.push(globalNbrs[currentHillCell][j]);
          }
        }
        elevation--;
        if (RNGen.random < steepness) { elevation--; }
      }
    }
  }

  // Hills
  let numHills = Math.floor(n ** 2.5);
  for (let i = 0; i < numHills; i++) {
    let peakCell = landCells[Math.floor(RNGen.random() * landCells.length)]
    if (globalOnshoreDistance[peakCell] > 5) {
      let elevation = Math.floor(RNGen.random() * 5);
      let hillCalcQueue = [peakCell];
      while (elevation > 0 && globalElevation[peakCell] < 5) {
        let currentHillCell = hillCalcQueue.shift();
        if (elevation > globalElevation[currentHillCell]) {
          globalElevation[currentHillCell] = elevation;
          if (globalElevation[currentHillCell] === 4) { riverSourceCells.push(currentHillCell); }
          for (let j = 0; j < globalNbrs[currentHillCell].length; j++) {
            hillCalcQueue.push(globalNbrs[currentHillCell][j]);
          }
        }
        elevation--;
        if (RNGen.random < steepness) { elevation--; }
      }
    }
  }

  // recalculate biome based on elevation and onshore distance
  // Onshore
  for (let i = 0; i < globalNbrs.length; i++) {
    let rand = RNGen.random();
    if (globalBiome[i] === 'tropical rainforest')/*    */ {
      if (globalOnshoreDistance[i] > 50 && rand) { globalBiome[i] = 'savanna'; }
      if (globalOnshoreDistance[i] > 40 && rand < 0.8) { globalBiome[i] = 'savanna'; }
    }
    else if (globalBiome[i] === 'grassland')/*     */ { }
    else if (globalBiome[i] === 'savanna')/*       */ {
      if (globalOnshoreDistance[i] < 7) { globalBiome[i] = 'chaparral'; }
      else if (globalOnshoreDistance[i] > 80) { globalBiome[i] = 'desert'; }
      else if (globalOnshoreDistance[i] > 70 && rand < 0.8) { globalBiome[i] = 'desert'; }
    }
    else if (globalBiome[i] === 'desert')/*        */ {
      if (globalOnshoreDistance[i] < 5) { globalBiome[i] = 'chaparral'; }
    }
    else if (globalBiome[i] === 'temperate forest')/*     */ {
      if (globalOnshoreDistance[i] < 5) { globalBiome[i] = 'temperate rainforest'; }
      else if (globalOnshoreDistance[i] > 55) { globalBiome[i] = 'grassland'; }
      else if (globalOnshoreDistance[i] > 50 && rand < 0.8) { globalBiome[i] = 'grassland'; }
    }
  }

  // Elevation
  for (let i = 0; i < globalNbrs.length; i++) {
    // cliffs
    /* */if (globalBiome[i] === 'ocean') { globalElevation[i] = 0; }
    else if (globalBiome[i] === 'shallows') { globalElevation[i] = 0; }
    else if (globalElevation[i] > 2 && (globalBiome[i] === 'tropical beach' || globalBiome[i] === 'mangrove')) { globalBiome[i] = 'tropical cliff'; }
    else if (globalElevation[i] > 2 && (globalBiome[i] === 'cold beach' || globalBiome[i] === 'salt marsh')) { globalBiome[i] = 'fjord'; }
    else if (globalElevation[i] > 2 && globalBiome[i] === 'beach') { globalBiome[i] = 'cliff'; }
    // mountains
    else if (globalElevation[i] > 6 && globalBiome[i] == 'polar') { globalBiome[i] = 'nival'; }
    else if (globalElevation[i] > 8 && globalBiome[i] == 'tundra') { globalBiome[i] = 'nival'; }
    else if (globalElevation[i] > 10 && globalBiome[i] == 'boreal forest') { globalBiome[i] = 'nival'; }
    else if (globalElevation[i] > 7 && globalBiome[i] == 'boreal forest') { globalBiome[i] = 'alpine'; }
    else if (globalElevation[i] > 12 && (globalBiome[i] == 'temperate forest' || globalBiome[i] == 'temperate rainforest')) { globalBiome[i] = 'nival'; }
    else if (globalElevation[i] > 9 && (globalBiome[i] == 'temperate forest' || globalBiome[i] == 'temperate rainforest')) { globalBiome[i] = 'alpine'; }
    else if (globalElevation[i] > 5 && (globalBiome[i] == 'temperate forest' || globalBiome[i] == 'temperate rainforest')) { globalBiome[i] = 'montane'; }
    else if (globalElevation[i] > 14 && (globalBiome[i] == 'chaparral' || globalBiome[i] == 'grassland')) { globalBiome[i] = 'nival'; }
    else if (globalElevation[i] > 11 && (globalBiome[i] == 'chaparral' || globalBiome[i] == 'grassland')) { globalBiome[i] = 'alpine'; }
    else if (globalElevation[i] > 8 && (globalBiome[i] == 'chaparral' || globalBiome[i] == 'grassland')) { globalBiome[i] = 'montane'; }
    else if (globalElevation[i] > 5 && (globalBiome[i] == 'chaparral' || globalBiome[i] == 'grassland')) { globalBiome[i] = 'encinal'; }
    else if (globalElevation[i] > 18 && globalBiome[i] == 'desert') { globalBiome[i] = 'nival'; }
    else if (globalElevation[i] > 14 && globalBiome[i] == 'desert') { globalBiome[i] = 'alpine'; }
    else if (globalElevation[i] > 8 && globalBiome[i] == 'desert') { globalBiome[i] = 'desert grassland'; }
    else if (globalElevation[i] > 16 && globalBiome[i] == 'savanna') { globalBiome[i] = 'nival'; }
    else if (globalElevation[i] > 12 && globalBiome[i] == 'savanna') { globalBiome[i] = 'alpine'; }
    else if (globalElevation[i] > 8 && globalBiome[i] == 'savanna') { globalBiome[i] = 'montane'; }
    else if (globalElevation[i] > 5 && globalBiome[i] == 'savanna') { globalBiome[i] = 'encinal'; }
    else if (globalElevation[i] > 16 && globalBiome[i] == 'tropical rainforest') { globalBiome[i] = 'nival'; }
    else if (globalElevation[i] > 12 && globalBiome[i] == 'tropical rainforest') { globalBiome[i] = 'alpine'; }
    else if (globalElevation[i] > 8 && globalBiome[i] == 'tropical rainforest') { globalBiome[i] = 'cloud forest'; }
    else if (globalElevation[i] === 0 && globalOnshoreDistance[i] > 20) { globalElevation[i] = 1; }

    if (globalElevation[i] > 10 && RNGen.random() < 0.01) { globalBiome[i] = 'volcano'; }

  }

  // place some ocean trenches
  for (let i = 0; i < 10 * Math.floor(Math.sqrt(n)); i++) {
    let drunkardStart = Math.floor(RNGen.random() * globalNbrs.length);
    while (globalOnshoreDistance[drunkardStart] !== 0) {
      drunkardStart = Math.floor(RNGen.random() * globalNbrs.length);
    }
    drunkardsWalk(drunkardStart, globalNbrs, globalBiome, 400, 2, 'ocean trench', 'ocean', 'direction', RNGen);
  }

  // Place some rivers
  let lakeSourceTiles = [];
  let lakeTropicalSourceTiles = [];
  let numRivers = 4 * Math.floor(Math.sqrt(n));
  for (let i = 0; i < numRivers; i++) {
    let currentRiverCell = riverSourceCells[Math.floor(RNGen.random() * riverSourceCells.length)];
    let prevRiverCell;
    let prevCellElevation = 1000;
    let riverNbrs = 0;
    while (globalBiome[currentRiverCell] != 'shallows' && globalBiome[currentRiverCell] != 'ocean') {
      /* */if (globalBiome[currentRiverCell] === 'glacier')/*              */ { globalBiome[currentRiverCell] = 'glacier' }
      /* */if (globalBiome[currentRiverCell] === 'nival')/*                */ { globalBiome[currentRiverCell] = 'glacier' }
      else if (globalBiome[currentRiverCell] === 'polar')/*                */ { globalBiome[currentRiverCell] = 'glacier' }
      else if (globalBiome[currentRiverCell] === 'tundra')/*               */ { globalBiome[currentRiverCell] = 'glacier' }
      else if (globalBiome[currentRiverCell] === 'alpine')/*               */ { globalBiome[currentRiverCell] = 'glacier' }
      //else if (globalBiome[currentRiverCell] === 'river')/*                */ { globalBiome[currentRiverCell] = 'river' }
      else if (globalBiome[currentRiverCell] === 'grassland')/*            */ { globalBiome[currentRiverCell] = 'river' }
      else if (globalBiome[currentRiverCell] === 'marsh')/*                */ { globalBiome[currentRiverCell] = 'river' }
      else if (globalBiome[currentRiverCell] === 'bog')/*                  */ { globalBiome[currentRiverCell] = 'river' }
      else if (globalBiome[currentRiverCell] === 'temperate forest')/*     */ { globalBiome[currentRiverCell] = 'river' }
      else if (globalBiome[currentRiverCell] === 'fen')/*                  */ { globalBiome[currentRiverCell] = 'river' }
      else if (globalBiome[currentRiverCell] === 'montane')/*              */ { globalBiome[currentRiverCell] = 'river' }
      else if (globalBiome[currentRiverCell] === 'boreal forest')/*        */ { globalBiome[currentRiverCell] = 'river' }
      else if (globalBiome[currentRiverCell] === 'temperate rainforest')/* */ { globalBiome[currentRiverCell] = 'river' }
      //else if (globalBiome[currentRiverCell] === 'tropical river')/*       */ { globalBiome[currentRiverCell] = 'tropical river' }
      else if (globalBiome[currentRiverCell] === 'desert grassland')/*     */ { globalBiome[currentRiverCell] = 'tropical river' }
      else if (globalBiome[currentRiverCell] === 'savanna')/*              */ { globalBiome[currentRiverCell] = 'tropical river' }
      else if (globalBiome[currentRiverCell] === 'chaparral')/*            */ { globalBiome[currentRiverCell] = 'tropical river' }
      else if (globalBiome[currentRiverCell] === 'desert')/*               */ { globalBiome[currentRiverCell] = 'tropical river' }
      else if (globalBiome[currentRiverCell] === 'oasis')/*                */ { globalBiome[currentRiverCell] = 'tropical river' }
      else if (globalBiome[currentRiverCell] === 'encinal')/*              */ { globalBiome[currentRiverCell] = 'tropical river' }
      else if (globalBiome[currentRiverCell] === 'cloud forest')/*         */ { globalBiome[currentRiverCell] = 'tropical river' }
      else if (globalBiome[currentRiverCell] === 'tropical rainforest')/*  */ { globalBiome[currentRiverCell] = 'tropical river' }
      //else if (globalBiome[currentRiverCell] === 'river fjord')/*          */ { globalBiome[currentRiverCell] = 'river fjord' }
      else if (globalBiome[currentRiverCell] === 'fjord')/*                */ { globalBiome[currentRiverCell] = 'river fjord' }
      //else if (globalBiome[currentRiverCell] === 'delta')/*                */ { globalBiome[currentRiverCell] = 'delta' }
      else if (globalBiome[currentRiverCell] === 'beach')/*                */ { globalBiome[currentRiverCell] = 'delta' }
      else if (globalBiome[currentRiverCell] === 'cold beach')/*           */ { globalBiome[currentRiverCell] = 'delta' }
      //else if (globalBiome[currentRiverCell] === 'tropical delta')/*       */ { globalBiome[currentRiverCell] = 'tropical delta' }
      else if (globalBiome[currentRiverCell] === 'tropical beach')/*       */ { globalBiome[currentRiverCell] = 'tropical delta' }
      //else if (globalBiome[currentRiverCell] === 'waterfall')/*            */ { globalBiome[currentRiverCell] = 'waterfall' }
      else if (globalBiome[currentRiverCell] === 'cliff')/*                */ { globalBiome[currentRiverCell] = 'waterfall' }
      //else if (globalBiome[currentRiverCell] === 'tropical waterfall')/*   */ { globalBiome[currentRiverCell] = 'tropical waterfall' }
      else if (globalBiome[currentRiverCell] === 'tropical cliff')/*       */ { globalBiome[currentRiverCell] = 'tropical waterfall' }
      //else if (globalBiome[currentRiverCell] === 'glacier valley')/*       */ { globalBiome[currentRiverCell] = 'glacier valley' }
      //else if (globalBiome[currentRiverCell] === 'river valley')/*         */ { globalBiome[currentRiverCell] = 'river valley' }
      //else if (globalBiome[currentRiverCell] === 'tropical river valley')/**/ { globalBiome[currentRiverCell] = 'tropical river valley' }
      //else if (globalBiome[currentRiverCell] === 'volcano')/*              */ { globalBiome[currentRiverCell] = 'volcano' }
      //else if (globalBiome[currentRiverCell] === 'iceberg')/*              */ { globalBiome[currentRiverCell] = 'iceberg' }
      //else if (globalBiome[currentRiverCell] === 'salt marsh')/*           */ { globalBiome[currentRiverCell] = 'salt marsh' }
      //else if (globalBiome[currentRiverCell] === 'mangrove')/*             */ { globalBiome[currentRiverCell] = 'mangrove' }
      //else if (globalBiome[currentRiverCell] === 'tropical islet')/*       */ { globalBiome[currentRiverCell] = 'tropical islet' }
      //else if (globalBiome[currentRiverCell] === 'swamp')/*                */ { globalBiome[currentRiverCell] = 'swamp' }
      //else if (globalBiome[currentRiverCell] === 'lake')/*                 */ { globalBiome[currentRiverCell] = 'lake' }
      //else if (globalBiome[currentRiverCell] === 'tropical lake')/*        */ { globalBiome[currentRiverCell] = 'tropical lake' }
      //else if (globalBiome[currentRiverCell] === 'shallows')/*             */ { globalBiome[currentRiverCell] = 'shallows' }
      //else if (globalBiome[currentRiverCell] === 'islet')/*                */ { globalBiome[currentRiverCell] = 'islet' }
      //else if (globalBiome[currentRiverCell] === 'ocean')/*                */ { globalBiome[currentRiverCell] = 'ocean' }
      //else if (globalBiome[currentRiverCell] === 'ocean trench')/*               */ { globalBiome[currentRiverCell] = 'ocean trench' }
      //else if (globalBiome[currentRiverCell] === 'coral')/*                */ { globalBiome[currentRiverCell] = 'coral' }

      if (globalElevation[currentRiverCell] > globalElevation[prevRiverCell]) {
        /* */if (globalBiome[currentRiverCell] === 'glacier')/*       */ { globalBiome[currentRiverCell] = 'glacier valley' }
        else if (globalBiome[currentRiverCell] === 'river')/*         */ { globalBiome[currentRiverCell] = 'river valley' }
        else if (globalBiome[currentRiverCell] === 'tropical river')/**/ { globalBiome[currentRiverCell] = 'tropical river valley' }
      }

      if (globalBiome[currentRiverCell] === 'tropical river' && RNGen.random() < 0.5) {
        let oasisIdx = Math.floor(RNGen.random() * 3);
        if (globalBiome[globalNbrs[currentRiverCell][oasisIdx]] === 'desert' || globalBiome[globalNbrs[currentRiverCell][oasisIdx]] === 'desert') {
          globalBiome[globalNbrs[currentRiverCell][oasisIdx]] = 'oasis';
        }
      }

      if (globalElevation[currentRiverCell] < 5 && globalOnshoreDistance[currentRiverCell] > 9) {
        /* */if (globalBiome[currentRiverCell] === 'river') /*            */ { lakeSourceTiles.push(currentRiverCell); }
        else if (globalBiome[currentRiverCell] === 'tropical river') { lakeTropicalSourceTiles.push(currentRiverCell); }
      }

      let nextRiverCell = currentRiverCell;
      let lowestElevation = 100;
      for (let j = 0; j < globalNbrs[currentRiverCell].length; j++) {
        if (globalElevation[globalNbrs[currentRiverCell][j]] < lowestElevation) {
          lowestElevation = globalElevation[globalNbrs[currentRiverCell][j]];
          nextRiverCell = globalNbrs[currentRiverCell][j];
        }
      }
      if (nextRiverCell === currentRiverCell || nextRiverCell === prevRiverCell) {
        let lowestOnshoreDistance = 10000;
        for (let j = 0; j < globalNbrs[currentRiverCell].length; j++) {
          if (globalOnshoreDistance[globalNbrs[currentRiverCell][j]] < lowestOnshoreDistance) {
            lowestOnshoreDistance = globalOnshoreDistance[globalNbrs[currentRiverCell][j]];
            nextRiverCell = globalNbrs[currentRiverCell][j];
          }

        }
      }
      if (RNGen.random() < 0.01) {
        nextRiverCell = globalNbrs[currentRiverCell][Math.floor(RNGen.random() * 3)];
      }

      prevRiverCell = currentRiverCell;
      prevCellElevation = globalElevation[prevRiverCell];
      currentRiverCell = nextRiverCell;
    }
  }
  // Place lakes oases and prepare other wetlands
  let numLakes = 4;
  let swampSources = [];
  let marshSources = [];
  let bogSources = [];
  let fenSources = [];
  let tropicalSwampSources = [];
  for (let i = 0; i < numLakes; i++) {
    let lakeCentre = lakeSourceTiles[Math.floor((RNGen.random() * lakeSourceTiles.length))];
    let lakeSize = 3 + Math.floor(RNGen.random() * 3);
    floodFill(lakeCentre, globalNbrs, globalBiome, lakeSize, 'lake', '');
  }
  let numTropLakes = 2;
  for (let i = 0; i < numTropLakes; i++) {
    let lakeCentre = lakeTropicalSourceTiles[Math.floor((RNGen.random() * lakeTropicalSourceTiles.length))];
    let lakeSize = 3 + Math.floor(RNGen.random() * 4);
    floodFill(lakeCentre, globalNbrs, globalBiome, lakeSize, 'tropical lake', '');
  }
  for (let i = 0; i < globalBiome.length; i++) {
    if (globalBiome[i] === 'tropical lake') {
      for (let j = 0; j < globalNbrs[i].length; j++) {
        if (globalBiome[globalNbrs[i][j]] === 'desert' || globalBiome[globalNbrs[i][j]] === 'savanna') { globalBiome[globalNbrs[i][j]] = 'oasis'; }
      }
    }

    if (globalElevation[i] < 3) {
      // Marsh & Tropical swamp
      if (RNGen.random() < 0.2) {
        if ((globalBiome[i] === 'river' || globalBiome[i] === 'tropical river') && globalOnshoreDistance[i] > 6) {
          for (let j = 0; j < globalNbrs[i].length; j++) {
            if (globalBiome[globalNbrs[i][j]] === 'temperate forest' ||
              globalBiome[globalNbrs[i][j]] === 'grassland' ||
              globalBiome[globalNbrs[i][j]] === 'temperate rainforest') {
              marshSources.push(globalNbrs[i][j]);
            }
            if (globalBiome[globalNbrs[i][j]] === 'tropical rainforest') { tropicalSwampSources.push(globalNbrs[i][j]); }
          }
        }
        // Swamp, bog, fen
        else if (globalElevation[i] < 3 && globalOnshoreDistance[i] > 3) {

          let higherNbrs = 0;
          for (let j = 0; j < globalNbrs[i].length; j++) {
            if (globalElevation[i] < globalElevation[globalNbrs[i][j]]) { higherNbrs++; }
          }
          if (higherNbrs >= 2) {
            if (globalBiome[i] === 'temperate forest' || globalBiome[i] === 'temperate rainforest') {
              if (RNGen.random() < 0.5) { swampSources.push(i); }
              else { fenSources.push(i); }
            }
            if (globalBiome[i] === 'boreal forest') {
              if (RNGen.random() < 0.5) { bogSources.push(i); }
              else { fenSources.push(i); }
            }
          }
        }
      }
    }

    floodFill(tropicalSwampSources[Math.floor(RNGen.random() * tropicalSwampSources.length)], globalNbrs, globalBiome, 2, 'tropical swamp', 'tropical rainforest');
    globalBiome[fenSources[Math.floor(RNGen.random() * fenSources.length)]] = 'fen';
    globalBiome[bogSources[Math.floor(RNGen.random() * bogSources.length)]] = 'bog';
    globalBiome[marshSources[Math.floor(RNGen.random() * marshSources.length)]] = 'marsh';
    globalBiome[swampSources[Math.floor(RNGen.random() * swampSources.length)]] = 'swamp';
  }
  return [interpvertices, globalNbrs, globalBiome, globalElevation, globalOnshoreDistance];
}

export function generatePlanetResources(seed, globalBiome, cosmosMats) {
  // Create planetMaterials from cosmosMaterials
  let RNG = new MersenneTwister(seed);

  let planetIgn = [];
  let planetSed = [];
  let planetMet = [];
  let planetDirt = [];
  let planetPrecMet = [];

  let numMats = 30 + Math.floor(RNG.random() * 15);
  for (let i = 0; i < numMats; i++) { planetIgn.push(cosmosMats.IGN_ROCKS[Math.floor(RNG.random() * cosmosMats.IGN_ROCKS.length)]); }
  numMats = 30 + Math.floor(RNG.random() * 15);
  for (let i = 0; i < numMats; i++) { planetSed.push(cosmosMats.SED_ROCKS[Math.floor(RNG.random() * cosmosMats.SED_ROCKS.length)]); }
  numMats = 30 + Math.floor(RNG.random() * 15);
  for (let i = 0; i < numMats; i++) { planetMet.push(cosmosMats.MET_ROCKS[Math.floor(RNG.random() * cosmosMats.MET_ROCKS.length)]); }
  numMats = 15 + Math.floor(RNG.random() * 7);
  for (let i = 0; i < numMats; i++) { planetDirt.push(cosmosMats.DIRT[Math.floor(RNG.random() * cosmosMats.DIRT.length)]); }
  numMats = 5 + Math.floor(RNG.random() * 2);
  for (let i = 0; i < numMats; i++) { planetPrecMet.push(cosmosMats.PREC_METS[Math.floor(RNG.random() * cosmosMats.PREC_METS.length)]); }

  let globalMinerals = [];
  for (let i = 0; i < globalBiome.length; i++) {
    globalMinerals.push([]);
    numMats = 1 + Math.floor(RNG.random() * 3);
    for (let j = 0; j < numMats; j++) {
      let rand = Math.floor(RNG.random() * planetIgn.length);
      if (globalMinerals[i].filter(e => e.NAME === planetIgn[rand].NAME).length > 0) { }
      else { globalMinerals[i].push(planetIgn[rand]); }
    }
    numMats = 0 + Math.floor(RNG.random() * 3);
    for (let j = 0; j < numMats; j++) {
      let rand = Math.floor(RNG.random() * planetSed.length);
      if (globalMinerals[i].filter(e => e.NAME === planetSed[rand].NAME).length > 0) { }
      else { globalMinerals[i].push(planetSed[rand]); }
    }
    numMats = 1 + Math.floor(RNG.random() * 3);
    for (let j = 0; j < numMats; j++) {
      let rand = Math.floor(RNG.random() * planetMet.length);
      if (globalMinerals[i].filter(e => e.NAME === planetMet[rand].NAME).length > 0) { }
      else { globalMinerals[i].push(planetMet[rand]); }
    }
    numMats = 0 + Math.floor(RNG.random() * 3);
    for (let j = 0; j < numMats; j++) {
      let rand = Math.floor(RNG.random() * planetDirt.length);
      if (globalMinerals[i].filter(e => e.NAME === planetDirt[rand].NAME).length > 0) { }
      else { globalMinerals[i].push(planetDirt[rand]); }
    }
    numMats = - 18 + Math.floor(RNG.random() * 20);
    for (let j = 0; j < numMats; j++) {
      let rand = Math.floor(RNG.random() * planetPrecMet.length);
      if (globalMinerals[i].filter(e => e.NAME === planetPrecMet[rand].NAME).length > 0) { }
      else { globalMinerals[i].push(planetPrecMet[rand]); }
    }
  }


  let globalResources = {}
  globalResources.minerals = globalMinerals;
  
  return globalResources;
}

export function whatCellAmILookingAt(rotation, vertices) {
  let lookingAtIdx = 0;
  let nearestZ = 0;
  for (let i = 0; i < vertices.length; i = i + 9) {

    let z1 =
      rotation[0][2] * vertices[i + 0] +
      rotation[1][2] * vertices[i + 1] +
      rotation[2][2] * vertices[i + 2];
    let z2 =
      rotation[0][2] * vertices[i + 3] +
      rotation[1][2] * vertices[i + 4] +
      rotation[2][2] * vertices[i + 5];
    let z3 =
      rotation[0][2] * vertices[i + 6] +
      rotation[1][2] * vertices[i + 7] +
      rotation[2][2] * vertices[i + 8];

    let z = (z1 + z2 + z3) / 3;

    if (z < nearestZ) {
      nearestZ = z
      lookingAtIdx = i / 9;
    }
  }

  return lookingAtIdx;
}

export function naturalColours(globalBiome, seed) {
  let RNGen = new MersenneTwister(seed);
  let colours = biomeColours(globalBiome);

  for (let i = 0; i < colours.length; i = i + 9) {
    if (RNGen.random() < 0.3) {
      let clrChange = (Math.floor(RNGen.random() * 2) - 1) / 10;
      colours[i + 0] = colours[i + 0] + clrChange;
      colours[i + 3] = colours[i + 3] + clrChange;
      colours[i + 6] = colours[i + 6] + clrChange;
      clrChange = (Math.floor(RNGen.random() * 2) - 1) / 10;
      colours[i + 1] = colours[i + 1] + clrChange;
      colours[i + 4] = colours[i + 4] + clrChange;
      colours[i + 7] = colours[i + 7] + clrChange;
      clrChange = (Math.floor(RNGen.random() * 2) - 1) / 10;
      colours[i + 2] = colours[i + 2] + clrChange;
      colours[i + 5] = colours[i + 5] + clrChange;
      colours[i + 8] = colours[i + 8] + clrChange;
    }
  }
  return colours;
}

export function biomeColours(globalBiome) {
  let colours = [];
  for (let i = 0; i < globalBiome.length; i++) {
    let thisColour = [];
    /* */if (globalBiome[i] === 'polar')/*                */ { thisColour = [1.0, 1.0, 1.0] }
    else if (globalBiome[i] === 'tundra')/*               */ { thisColour = [0.9, 1.0, 0.9] }
    else if (globalBiome[i] === 'boreal forest')/*        */ { thisColour = [0.1, 0.5, 0.2] }
    else if (globalBiome[i] === 'temperate forest')/*     */ { thisColour = [0.4, 0.6, 0.0] }
    else if (globalBiome[i] === 'grassland')/*            */ { thisColour = [0.8, 0.9, 0.4] }
    else if (globalBiome[i] === 'desert')/*               */ { thisColour = [1.0, 0.9, 0.5] }
    else if (globalBiome[i] === 'savanna')/*              */ { thisColour = [0.8, 0.8, 0.2] }
    else if (globalBiome[i] === 'tropical rainforest')/*  */ { thisColour = [0.2, 0.5, 0.1] }

    else if (globalBiome[i] === 'nival')/*                */ { thisColour = [1.0, 1.0, 1.0] }
    else if (globalBiome[i] === 'alpine')/*               */ { thisColour = [0.7, 0.6, 0.6] }
    else if (globalBiome[i] === 'montane')/*              */ { thisColour = [0.2, 0.6, 0.3] }
    else if (globalBiome[i] === 'volcano')/*              */ { thisColour = [1.0, 0.3, 0.0] }
    else if (globalBiome[i] === 'encinal')/*              */ { thisColour = [0.5, 0.6, 0.0] }
    else if (globalBiome[i] === 'desert grassland')/*     */ { thisColour = [0.8, 0.9, 0.5] }
    else if (globalBiome[i] === 'cloud forest')/*         */ { thisColour = [0.1, 0.7, 0.3] }

    else if (globalBiome[i] === 'ocean')/*                */ { thisColour = [0.0, 0.4, 1.0] }
    else if (globalBiome[i] === 'shallows')/*             */ { thisColour = [0.0, 0.6, 1.0] }
    else if (globalBiome[i] === 'ocean trench')/*         */ { thisColour = [0.0, 0.2, 1.0] }

    else if (globalBiome[i] === 'coral')/*                */ { thisColour = [1.0, 0.5, 0.4] }
    else if (globalBiome[i] === 'tropical islet')/*       */ { thisColour = [1.0, 1.0, 0.7] }
    else if (globalBiome[i] === 'islet')/*                */ { thisColour = [0.4, 0.6, 0.0] }
    else if (globalBiome[i] === 'iceberg')/*              */ { thisColour = [0.9, 1.0, 1.0] }

    else if (globalBiome[i] === 'tropical beach')/*       */ { thisColour = [1.0, 1.0, 0.7] }
    else if (globalBiome[i] === 'beach')/*                */ { thisColour = [0.9, 0.9, 0.5] }
    else if (globalBiome[i] === 'cold beach')/*           */ { thisColour = [0.9, 0.9, 0.5] }
    else if (globalBiome[i] === 'tropical cliff')/*       */ { thisColour = [0.1, 0.8, 0.3] }
    else if (globalBiome[i] === 'cliff')/*                */ { thisColour = [0.5, 0.4, 0.4] }
    else if (globalBiome[i] === 'fjord')/*                */ { thisColour = [0.7, 0.5, 0.7] }

    else if (globalBiome[i] === 'temperate rainforest')/* */ { thisColour = [0.3, 0.7, 0.0] }
    else if (globalBiome[i] === 'chaparral')/*            */ { thisColour = [0.8, 0.9, 0.2] }
    else if (globalBiome[i] === 'salt marsh')/*           */ { thisColour = [0.6, 0.7, 0.4] }
    else if (globalBiome[i] === 'mangrove')/*             */ { thisColour = [0.6, 0.7, 0.0] }

    else if (globalBiome[i] === 'glacier')/*              */ { thisColour = [0.9, 1.0, 1.0] }
    else if (globalBiome[i] === 'river')/*                */ { thisColour = [0.4, 0.7, 1.0] }
    else if (globalBiome[i] === 'tropical river')/*       */ { thisColour = [0.4, 0.7, 0.5] }

    else if (globalBiome[i] === 'river fjord')/*          */ { thisColour = [0.4, 0.5, 0.7] }
    else if (globalBiome[i] === 'waterfall')/*            */ { thisColour = [0.4, 0.7, 1.0] }
    else if (globalBiome[i] === 'tropical waterfall')/*   */ { thisColour = [0.4, 0.7, 0.5] }
    else if (globalBiome[i] === 'glacier valley')/*       */ { thisColour = [0.9, 1.0, 1.0] }
    else if (globalBiome[i] === 'river valley')/*         */ { thisColour = [0.4, 0.7, 1.0] }
    else if (globalBiome[i] === 'tropical river valley')/**/ { thisColour = [0.4, 0.7, 0.5] }
    else if (globalBiome[i] === 'delta')/*                */ { thisColour = [0.7, 0.5, 0.0] }
    else if (globalBiome[i] === 'tropical delta')/*       */ { thisColour = [0.7, 0.4, 0.0] }

    else if (globalBiome[i] === 'lake')/*                 */ { thisColour = [0.3, 0.6, 0.9] }
    else if (globalBiome[i] === 'tropical lake')/*        */ { thisColour = [0.3, 0.6, 0.4] }

    else if (globalBiome[i] === 'tropical swamp')/*       */ { thisColour = [0.4, 0.5, 0.3] }
    else if (globalBiome[i] === 'swamp')/*                */ { thisColour = [0.4, 0.6, 0.3] }
    else if (globalBiome[i] === 'marsh')/*                */ { thisColour = [0.6, 0.6, 0.5] }
    else if (globalBiome[i] === 'bog')/*                  */ { thisColour = [0.3, 0.2, 0.1] }
    else if (globalBiome[i] === 'fen')/*                  */ { thisColour = [0.7, 0.6, 0.5] }
    else if (globalBiome[i] === 'oasis')/*                */ { thisColour = [0.5, 0.8, 0.0] }

    colours.push(...thisColour);
    colours.push(...thisColour);
    colours.push(...thisColour);
  }
  return colours;
}

export function elevationColours(globalElevation) {
  let colours = [];

  for (let i = 0; i < globalElevation.length; i++) {
    let thisColour = [0, globalElevation[i] / 20, 0];

    if (globalElevation[i] === 0) { thisColour = [0, 0, 1]; }

    colours.push(...thisColour);
    colours.push(...thisColour);
    colours.push(...thisColour);
  }
  return colours;
}

export function onshoreColours(globalOnshoreDistance) {
  let colours = [];

  for (let i = 0; i < globalOnshoreDistance.length; i++) {
    let thisColour = [globalOnshoreDistance[i] / 100, globalOnshoreDistance[i] / 200, 1 - globalOnshoreDistance[i] / 100];

    colours.push(...thisColour);
    colours.push(...thisColour);
    colours.push(...thisColour);
  }
  return colours;
}