import MersenneTwister from "mersenne-twister"
import WordGen from "./WordGen";

export const MATERIAL = {
  ROCK: {
    IGNEOUS: 'igneous rock',
    SEDIMENTARY: 'sedimentary rock',
    METAMORPHIC: 'metamorphic rock',
    GEM: {
      SEMIPRECIOUS: 'semiprecious gem',
      PRECIOUS: 'precious gem',
    }
  },
  METAL: {
    COMMON: 'common metal',
    UNCOMMON: 'uncommon metal',
    PRECIOUS: 'precious metal',
    ALLOY: 'metal alloy',
  },
  WOOD: {
    HARDWOOD: 'hardwood',
    SOFTWOOD: 'softwood',
  },
  TEXTILE: {
    FIBRE: 'fibre',
    SHEET: 'sheet',
    ROPE: 'rope',
  },
  CERAMIC: 'ceramic',
  GLASS: 'glass',
  DIRT: 'dirt',
  RUBBER: 'rubber',
}

export function generateMaterial(type, seed) {
  let RNG = new MersenneTwister(seed);
  let rand = RNG.random();

  let strA = 0;
  let strR = 0;
  let hrdA = 0;
  let hrdR = 0;
  let tghA = 0;
  let tghR = 0;
  let dnsA = 0;
  let dnsR = 0;

  /* */if (type === MATERIAL.CERAMIC)/*              */ { strA = 3; strR = 2; hrdA = 8; hrdR = 2; tghA = 3; tghR = 1; dnsA = 4; dnsR = 1; }
  else if (type === MATERIAL.DIRT)/*                 */ { strA = 0; strR = 0; hrdA = 0; hrdR = 0; tghA = 0; tghR = 0; dnsA = 3; dnsR = 2; }
  else if (type === MATERIAL.GLASS)/*                */ { strA = 5; strR = 2; hrdA = 7; hrdR = 1; tghA = 3; tghR = 1; dnsA = 4; dnsR = 2; }
  else if (type === MATERIAL.METAL.ALLOY)/*          */ { strA = 9; strR = 8; hrdA = 7; hrdR = 13; tghA = 10; tghR = 6; dnsA = 10; dnsR = 9; }
  else if (type === MATERIAL.METAL.COMMON)/*         */ { strA = 9; strR = 4; hrdA = 6; hrdR = 4; tghA = 6; tghR = 3; dnsA = 8; dnsR = 5; }
  else if (type === MATERIAL.METAL.PRECIOUS)/*       */ { strA = 7; strR = 4; hrdA = 5; hrdR = 4; tghA = 10; tghR = 3; dnsA = 16; dnsR = 4; }
  else if (type === MATERIAL.METAL.UNCOMMON)/*       */ { strA = 8; strR = 4; hrdA = 7; hrdR = 4; tghA = 8; tghR = 3; dnsA = 12; dnsR = 5; }
  else if (type === MATERIAL.ROCK.GEM.PRECIOUS)/*    */ { strA = 15; strR = 5; hrdA = 17; hrdR = 3; tghA = 1; tghR = 1; dnsA = 6; dnsR = 2; }
  else if (type === MATERIAL.ROCK.GEM.SEMIPRECIOUS)/**/ { strA = 12; strR = 5; hrdA = 15; hrdR = 3; tghA = 2; tghR = 2; dnsA = 7; dnsR = 3; }
  else if (type === MATERIAL.ROCK.IGNEOUS)/*         */ { strA = 6; strR = 3; hrdA = 10; hrdR = 3; tghA = 4; tghR = 2; dnsA = 5; dnsR = 2; }
  else if (type === MATERIAL.ROCK.METAMORPHIC)/*     */ { strA = 5; strR = 3; hrdA = 9; hrdR = 3; tghA = 6; tghR = 2; dnsA = 5; dnsR = 2; }
  else if (type === MATERIAL.ROCK.SEDIMENTARY)/*     */ { strA = 7; strR = 3; hrdA = 8; hrdR = 3; tghA = 5; tghR = 2; dnsA = 5; dnsR = 2; }
  else if (type === MATERIAL.RUBBER)/*               */ { strA = 1; strR = 1; hrdA = 1; hrdR = 1; tghA = 18; tghR = 2; dnsA = 3; dnsR = 1; }
  else if (type === MATERIAL.TEXTILE.FIBRE)/*        */ { strA = 3; strR = 2; hrdA = 1; hrdR = 1; tghA = 12; tghR = 1; dnsA = 3; dnsR = 2; }
  else if (type === MATERIAL.TEXTILE.ROPE)/*         */ { strA = 4; strR = 2; hrdA = 1; hrdR = 1; tghA = 12; tghR = 2; dnsA = 3; dnsR = 1; }
  else if (type === MATERIAL.TEXTILE.SHEET)/*        */ { strA = 3; strR = 2; hrdA = 1; hrdR = 1; tghA = 12; tghR = 3; dnsA = 3; dnsR = 3; }
  else if (type === MATERIAL.WOOD.HARDWOOD)/*        */ { strA = 3; strR = 1; hrdA = 3; hrdR = 1; tghA = 12; tghR = 4; dnsA = 2; dnsR = 1; }
  else if (type === MATERIAL.WOOD.SOFTWOOD)/*        */ { strA = 2; strR = 1; hrdA = 2; hrdR = 1; tghA = 10; tghR = 4; dnsA = 1; dnsR = 1; }

  let str = Math.max(0, strA - strR + Math.floor(rand * (2 * strR + 1)));
  let tgh = Math.max(0, tghA - tghR + Math.floor(rand * (2 * tghR + 1)));
  let hrd = Math.max(0, hrdA - hrdR + Math.floor(rand * (2 * hrdR + 1)));
  let dns = Math.max(0, dnsA - dnsR + Math.floor(rand * (2 * dnsR + 1)));

  let WG = new WordGen(RNG.random_int());
  let name = WG.createWord();

  let bearing = "";
  rand = RNG.random_int();
  /**/ if (type === MATERIAL.ROCK.IGNEOUS/*    */ && RNG.random() < 0.1) { bearing = generateMaterial(MATERIAL.ROCK.GEM.SEMIPRECIOUS, rand); }
  else if (type === MATERIAL.ROCK.IGNEOUS/*    */ && RNG.random() < 0.2) { bearing = generateMaterial(MATERIAL.METAL.PRECIOUS,/*   */ rand); }
  else if (type === MATERIAL.ROCK.IGNEOUS/*    */ && RNG.random() < 0.4) { bearing = generateMaterial(MATERIAL.METAL.UNCOMMON,/*   */ rand); }
  else if (type === MATERIAL.ROCK.IGNEOUS/*    */ && RNG.random() < 0.7) { bearing = generateMaterial(MATERIAL.METAL.COMMON,/*     */ rand); }
  else if (type === MATERIAL.ROCK.SEDIMENTARY/**/ && RNG.random() < 0.1) { bearing = generateMaterial(MATERIAL.METAL.UNCOMMON,/*   */ rand); }
  else if (type === MATERIAL.ROCK.SEDIMENTARY/**/ && RNG.random() < 0.3) { bearing = generateMaterial(MATERIAL.METAL.COMMON,/*     */ rand); }
  else if (type === MATERIAL.ROCK.METAMORPHIC/**/ && RNG.random() < 0.1) { bearing = generateMaterial(MATERIAL.ROCK.GEM.PRECIOUS,/**/ rand); }
  else if (type === MATERIAL.ROCK.METAMORPHIC/**/ && RNG.random() < 0.3) { bearing = generateMaterial(MATERIAL.ROCK.GEM.SEMIPRECIOUS, rand); }
  else if (type === MATERIAL.ROCK.METAMORPHIC/**/ && RNG.random() < 0.4) { bearing = generateMaterial(MATERIAL.METAL.PRECIOUS,/*   */ rand); }
  else if (type === MATERIAL.ROCK.METAMORPHIC/**/ && RNG.random() < 0.5) { bearing = generateMaterial(MATERIAL.METAL.UNCOMMON,/*   */ rand); }
  else if (type === MATERIAL.ROCK.METAMORPHIC/**/ && RNG.random() < 0.6) { bearing = generateMaterial(MATERIAL.METAL.COMMON,/*     */ rand); }
  else if (type === MATERIAL.TEXTILE.FIBRE/*   */ && RNG.random() < 0.4) { bearing = generateMaterial(MATERIAL.TEXTILE.ROPE,/*     */ rand); }
  else if (type === MATERIAL.TEXTILE.FIBRE/*   */ && RNG.random() < 0.8) { bearing = generateMaterial(MATERIAL.TEXTILE.SHEET,/*    */ rand); }
  else if (type === MATERIAL.DIRT/*            */ && RNG.random() < 0.1) { bearing = generateMaterial(MATERIAL.GLASS,/*            */ rand); }
  else if (type === MATERIAL.DIRT/*            */ && RNG.random() < 0.7) { bearing = generateMaterial(MATERIAL.CERAMIC,/*          */ rand); }

  let newMaterial = {
    NAME: name,
    TYPE: type,
    SEED: seed,
    STRENGTH: str,
    TOUGHNESS: tgh,
    HARDNESS: hrd,
    DENSITY: dns,
    BEARING: bearing,
  }

  return newMaterial;
}

export function generateCosmosMaterials(seed) {
  let RNG = new MersenneTwister(seed);

  let cosmosIgnRocks = [];
  let cosmosSedRocks = [];
  let cosmosMetRocks = [];
  let cosmosDirt = [];
  let cosmosPrecGems = [];
  let cosmosSemiGems = [];
  let cosmosCommMets = [];
  let cosmosUncoMets = [];
  let cosmosPrecMets = [];
  let cosmosCeramic = [];
  let cosmosGlass = [];

  let numMats = 200 + Math.floor(RNG.random() * 100);
  for (let i = 0; i < numMats; i++) {
    let newMat = generateMaterial(MATERIAL.ROCK.IGNEOUS, RNG.random_int());
    cosmosIgnRocks.push(newMat);
    if (typeof newMat.BEARING !== 'undefined') {
      /* */if (newMat.BEARING.TYPE === MATERIAL.METAL.COMMON)/*         */ { cosmosCommMets.push(newMat.BEARING); }
      else if (newMat.BEARING.TYPE === MATERIAL.METAL.UNCOMMON)/*       */ { cosmosUncoMets.push(newMat.BEARING); }
      else if (newMat.BEARING.TYPE === MATERIAL.METAL.PRECIOUS)/*       */ { cosmosPrecMets.push(newMat.BEARING); }
      else if (newMat.BEARING.TYPE === MATERIAL.ROCK.GEM.SEMIPRECIOUS)/**/ { cosmosSemiGems.push(newMat.BEARING); }
    }
  }
  numMats = 200 + Math.floor(RNG.random() * 100);
  for (let i = 0; i < numMats; i++) {
    let newMat = generateMaterial(MATERIAL.ROCK.SEDIMENTARY, RNG.random_int());
    cosmosSedRocks.push(newMat);
    if (typeof newMat.BEARING !== 'undefined') {
      /* */if (newMat.BEARING.TYPE === MATERIAL.METAL.COMMON)/*         */ { cosmosCommMets.push(newMat.BEARING); }
      else if (newMat.BEARING.TYPE === MATERIAL.METAL.UNCOMMON)/*       */ { cosmosUncoMets.push(newMat.BEARING); }
    }
  }
  numMats = 200 + Math.floor(RNG.random() * 100);
  for (let i = 0; i < numMats; i++) {
    let newMat = generateMaterial(MATERIAL.ROCK.METAMORPHIC, RNG.random_int());
    cosmosMetRocks.push(newMat);
    if (typeof newMat.BEARING !== 'undefined') {
      /* */if (newMat.BEARING.TYPE === MATERIAL.METAL.COMMON)/*         */ { cosmosCommMets.push(newMat.BEARING); }
      else if (newMat.BEARING.TYPE === MATERIAL.METAL.UNCOMMON)/*       */ { cosmosUncoMets.push(newMat.BEARING); }
      else if (newMat.BEARING.TYPE === MATERIAL.METAL.PRECIOUS)/*       */ { cosmosPrecMets.push(newMat.BEARING); }
      else if (newMat.BEARING.TYPE === MATERIAL.ROCK.GEM.SEMIPRECIOUS)/**/ { cosmosSemiGems.push(newMat.BEARING); }
      else if (newMat.BEARING.TYPE === MATERIAL.ROCK.GEM.PRECIOUS)/*    */ { cosmosPrecGems.push(newMat.BEARING); }
    }
  }
  numMats = 100 + Math.floor(RNG.random() * 50);
  for (let i = 0; i < numMats; i++) {
    let newMat = generateMaterial(MATERIAL.DIRT, RNG.random_int());
    cosmosDirt.push(newMat);
    if (typeof newMat.BEARING !== 'undefined') {
      /* */if (newMat.BEARING.TYPE === MATERIAL.CERAMIC)/**/ { cosmosCeramic.push(newMat.BEARING); }
      else if (newMat.BEARING.TYPE === MATERIAL.GLASS)/*  */ { cosmosGlass.push(newMat.BEARING); }
    }
  }

  let cosmosMaterials = {
    IGN_ROCKS: cosmosIgnRocks,
    SED_ROCKS: cosmosSedRocks,
    MET_ROCKS: cosmosMetRocks,
    DIRT: cosmosDirt,
    PREC_GEMS: cosmosPrecGems,
    SEMI_GEMS: cosmosSemiGems,
    COMM_METS: cosmosCommMets,
    UNCO_METS: cosmosUncoMets,
    PREC_METS: cosmosPrecMets,
    CERAMICS: cosmosCeramic,
    GLASS: cosmosGlass,
  }
  return cosmosMaterials;
}

export function generateMaterialBearingList(material) {
  let thisLevel = material.NAME + " (" + material.TYPE + ")" ;
  
  if (typeof(material.BEARING) === 'object') {
    let subLevel = generateMaterialBearingList(material.BEARING) ;
    thisLevel = thisLevel + " which bears " + subLevel;
  }

  return thisLevel;
}