import MersenneTwister from "mersenne-twister"
import WordGen from "./WordGen";
import { hasPointerEvents } from "@testing-library/user-event/dist/utils";

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
  PLANTPART: {
    WOOD: {
      HARDWOOD: 'hardwood',
      SOFTWOOD: 'softwood',
    },
    LEAF: {
      LEAF: "leaf",
      NEEDLE: "needle",
      FLESHY: "fleshy leaf",
      SPIKE: "spike",
    },
    ROOT: {
      TAP: "taproot",
      FIBROUS: "fibrous root",
    },
    STEM: {
      STEM: "stem",
      UNDERGROUND: {
        BULB: "bulb",
        TUBER: "tuber",
        ROOTSTALK: "rootstalk"
      },
      AERIAL: {
        THORN: "thorn",
        TENDRIL: "tendril",
      },
    },
    FLOWER: "flower",
    CONE: "cone",
    BARK: "bark",
    SEED: "seed",
    SAP: "sap",
    FRUIT: "fruit",
  },
  ANIMALPART: {
    BONE: "bone",
    BLOOD: "blood",
    SKIN: "skin",
    MUSCLE: "muscle",
    FAT: "fat",
    HAIR: "hair",
    SENSOR: {
      EYE: "eye",
      EAR: "ear",
      NOSE: "nose",
      TONGUE: "tongue",
      TOUCH: "touch",
    },
    WEAPONS: {
      TOOTH: "tooth",
      CLAW: "claw",
      HORN: "horn",
    },
    ORGAN: {
      BRAIN: "brain",
      HEART: "heart",
      LUNG: "lung",
      STOMACH: "stomach",
      LIVER: "liver",
      KIDNEY: "kidney",
      INTESTINE: "intestine",
      GIZZARD: "gizzard",
    },
    LIMB: {
      HEAD: "head",
      ARM: "arm",
      LEG: "leg",
      WING: "wing",
      TENTACLE: "tentacle",
      TAIL: "tail",
    },
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

export const LIFE = {
  ANIMAL: {
    BIRD: "bird",
    BEAST: {
      FURRY: "furry beast",
      SCALED: "scaled beast",
    },
    FISH: "fish",
    BUG: "bug",
  },
  PLANT: {
    TREE: {
      HARDWOOD: "hardwood tree",
      SOFTWOOD: "softwood tree",
    },
    SHRUB: "shrub",
    GRASS: "grass",
    SUCCULENT: "succulent",
    MOSS: "moss",
    VEGETABLE: "vegetable",
    FLORAL: "floral",
    SEAGRASS: "seagrass",
    SEAWEED: "seaweed",
  }
}

export function generatePlant(type, seed) {
  let RNG = new MersenneTwister(seed);
  let rand = RNG.random();

  let plant = {};
  plant.TYPE = type;

  let WG = new WordGen(RNG.random_int());
  plant.NAME = WG.createWord();

  /* */if (type === LIFE.PLANT.TREE.HARDWOOD) {
    rand = RNG.random();

    // Wood
    plant.WOOD = generateMaterial(MATERIAL.PLANTPART.WOOD.HARDWOOD, seed, plant.NAME + '-wood');
    plant.BARK = generateMaterial(MATERIAL.PLANTPART.BARK, seed, plant.NAME + '-bark');

    // Leaves/Needles
    if (RNG.random() < 0.99) {
      rand = RNG.random()
      if (rand < 0.95) { plant.LEAF = generateMaterial(MATERIAL.PLANTPART.LEAF, RNG.random(), plant.NAME + '-leaf'); }
      else/*       */ { plant.NEEDLE = generateMaterial(MATERIAL.PLANTPART.NEEDLE, RNG.random(), plant.NAME + '-needle'); }
    }

    // Roots
    rand = RNG.random();
    if (rand < 0.9) {
      plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random(), plant.NAME + '-taproot');
      plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random(), plant.NAME + '-root');
    }
    else if (rand < 0.95) { plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random(), plant.NAME + '-taproot'); }
    else { plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random(), plant.NAME + '-root'); }

    // Thorns
    rand = RNG.random();
    if (rand < 0.95) { plant.THORN = generateMaterial(MATERIAL.PLANTPART.STEM.AERIAL.THORN, RNG.random(), plant.NAME + '-thorn') }

    // Gammetes
    rand = RNG.random()
    if (rand < 0.8) {
      plant.FLOWER = generateMaterial(MATERIAL.PLANTPART.FLOWER, RNG.random(), plant.NAME + '-flower');
      if (RNG.random() < 0.98) { plant.FRUIT = generateMaterial(MATERIAL.PLANTPART.FRUIT, RNG.random(), plant.NAME + '-fruit'); }
    }
    else/*       */ { plant.CONE = generateMaterial(MATERIAL.PLANTPART.FLOWER, RNG.random(), plant.NAME + '-cone'); }
    plant.SEED = generateMaterial(MATERIAL.PLANTPART.SEED, RNG.random(), plant.NAME + '-seed');
  }
  else if (type === LIFE.PLANT.TREE.SOFTWOOD) {
    rand = RNG.random();

    // Wood
    plant.WOOD = generateMaterial(MATERIAL.PLANTPART.WOOD.SOFTWOOD, seed, plant.NAME + '-wood');
    plant.BARK = generateMaterial(MATERIAL.PLANTPART.BARK, seed, plant.NAME + '-bark');

    // Leaves/Needles
    if (RNG.random() < 0.99) {
      if (RNG.random() < 0.2) { plant.LEAF = generateMaterial(MATERIAL.PLANTPART.LEAF, RNG.random(), plant.NAME + '-leaf'); }
      else/*       */ { plant.NEEDLE = generateMaterial(MATERIAL.PLANTPART.NEEDLE, RNG.random(), plant.NAME + '-needle'); }
    }

    // Roots
    rand = RNG.random();
    if (rand < 0.9) {
      plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random(), plant.NAME + '-taproot');
      plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random(), plant.NAME + '-root');
    }
    else if (rand < 0.95) { plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random(), plant.NAME + '-taproot'); }
    else { plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random(), plant.NAME + '-root'); }

    // Thorns
    if (RNG.random() < 0.90) { plant.THORN = generateMaterial(MATERIAL.PLANTPART.STEM.AERIAL.THORN, RNG.random(), plant.NAME + '-thorn') }

    // Gammetes
    rand = RNG.random()
    if (rand < 0.2) {
      plant.FLOWER = generateMaterial(MATERIAL.PLANTPART.FLOWER, RNG.random(), plant.NAME + '-flower');
      if (RNG.random() < 0.97) { plant.FRUIT = generateMaterial(MATERIAL.PLANTPART.FRUIT, RNG.random(), plant.NAME + '-fruit'); }
    }
    else/*       */ { plant.CONE = generateMaterial(MATERIAL.PLANTPART.FLOWER, RNG.random(), plant.NAME + '-cone'); }
    plant.SEED = generateMaterial(MATERIAL.PLANTPART.SEED, RNG.random(), plant.NAME);
  }
  else if (type === LIFE.PLANT.SUCCULENT) {
    rand = RNG.random();

    // Woody or leafy?
    if (RNG.random() < 0.10) { plant.WOOD = generateMaterial(MATERIAL.PLANTPART.WOOD.SOFTWOOD, seed, plant.NAME + '-wood'); }
    else { plant.LEAF = generateMaterial(MATERIAL.PLANTPART.LEAF.FLESHY, seed, plant.NAME + '-leaf'); }

    // Spikes?
    if (RNG.random() < 0.75) { plant.SPIKE = generateMaterial(MATERIAL.PLANTPART.LEAF.SPIKE, RNG.random(), plant.NAME + '-spike'); }

    // Roots
    rand = RNG.random();
    if (rand < 0.9) {
      plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random(), plant.NAME + '-taproot');
      plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random(), plant.NAME + '-root');
    }
    else if (rand < 0.95) { plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random(), plant.NAME + '-taproot'); }
    else { plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random(), plant.NAME + '-root'); }

    // Gammetes
    plant.FLOWER = generateMaterial(MATERIAL.PLANTPART.FLOWER, RNG.random(), plant.NAME + '-flower');
    if (RNG.random() < 0.99) {
      plant.SEED = generateMaterial(MATERIAL.PLANTPART.SEED, RNG.random(), plant.NAME + '-seed');
      if (RNG.random() < 0.99) { plant.FRUIT = generateMaterial(MATERIAL.PLANTPART.FRUIT, RNG.random(), plant.NAME + '-fruit'); }
    }
  }
  else if (type === LIFE.PLANT.SHRUB) {
    // Woody or stemmed?
    rand = RNG.random();
    if (rand < 0.05) { plant.WOOD = generateMaterial(MATERIAL.PLANTPART.WOOD.HARDWOOD, seed, plant.NAME + '-wood'); }
    else if (rand < 0.15) { plant.WOOD = generateMaterial(MATERIAL.PLANTPART.WOOD.SOFTWOOD, seed, plant.NAME + '-wood'); }
    else { plant.STEM = generateMaterial(MATERIAL.PLANTPART.STEM.STEM, seed, plant.NAME + '-stem'); }

    // Roots
    rand = RNG.random();
    if (rand < 0.9) {
      plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random(), plant.NAME + '-taproot');
      plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random(), plant.NAME + '-root');
    }
    else if (rand < 0.95) { plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random(), plant.NAME + '-taproot'); }
    else { plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random(), plant.NAME + '-root'); }

    plant.LEAF = generateMaterial(MATERIAL.PLANTPART.LEAF.LEAF, seed, plant.NAME + '-leaf');

    // Thorns
    if (RNG.random() < 0.85) { plant.THORN = generateMaterial(MATERIAL.PLANTPART.STEM.AERIAL.THORN, RNG.random(), plant.NAME + '-thorn') }

    // Gammetes
    plant.FLOWER = generateMaterial(MATERIAL.PLANTPART.FLOWER, RNG.random(), plant.NAME + '-flower');
    if (RNG.random() < 0.93) {
      plant.SEED = generateMaterial(MATERIAL.PLANTPART.SEED, RNG.random(), plant.NAME + '-seed');
      if (RNG.random() < 0.93) { plant.FRUIT = generateMaterial(MATERIAL.PLANTPART.FRUIT, RNG.random(), plant.NAME + '-fruit'); }
    }

  }
  else if (type === LIFE.PLANT.GRASS) {
    // Roots
    rand = RNG.random();
    if (rand < 0.9) {
      plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random(), plant.NAME + '-taproot');
      plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random(), plant.NAME + '-root');
    }
    else if (rand < 0.95) { plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random(), plant.NAME + '-taproot'); }
    else { plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random(), plant.NAME + '-root'); }

    // Leaves
    plant.LEAF = generateMaterial(MATERIAL.PLANTPART.LEAF.LEAF, seed, plant.NAME + '-leaf');

    // Gammetes
    if (RNG.random() < 0.5) { plant.FLOWER = generateMaterial(MATERIAL.PLANTPART.FLOWER, RNG.random(), plant.NAME + '-flower'); }
    if (RNG.random() < 0.99) { plant.SEED = generateMaterial(MATERIAL.PLANTPART.SEED, RNG.random(), plant.NAME + '-seed'); }
  }
  else if (type === LIFE.PLANT.MOSS) {
    // Roots
    plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random(), plant.NAME + '-root');
    // Leaves
    plant.LEAF = generateMaterial(MATERIAL.PLANTPART.LEAF.LEAF, seed, plant.NAME + '-leaf');
    // Gammetes
    plant.SEED = generateMaterial(MATERIAL.PLANTPART.SEED, RNG.random(), plant.NAME + '-seed');
  }
  else if (type === LIFE.PLANT.VEGETABLE) {
    // Leaves
    plant.LEAF = generateMaterial(MATERIAL.PLANTPART.LEAF.LEAF, seed, plant.NAME + '-leaf');

    // Gammetes
    if (RNG.random() < 0.8) { plant.FLOWER = generateMaterial(MATERIAL.PLANTPART.FLOWER, RNG.random(), plant.NAME + '-flower'); }
    if (RNG.random() < 0.99) { plant.SEED = generateMaterial(MATERIAL.PLANTPART.SEED, RNG.random(), plant.NAME + '-seed'); }

    rand = RNG.random();
    if (rand < 0.333) { plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random(), plant.NAME + '-taproot'); }
    else if (rand < 0.666) {
      plant.ROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random(), plant.NAME + '-root');
      plant.TUBER = generateMaterial(MATERIAL.PLANTPART.STEM.UNDERGROUND.TUBER, RNG.random(), plant.NAME + '-tuber');
    }
    else {
      plant.ROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random(), plant.NAME + '-root');
      plant.BULB = generateMaterial(MATERIAL.PLANTPART.STEM.UNDERGROUND.BULB, RNG.random(), plant.NAME + '-bulb');
    }
    if (RNG.random() < 0.1) { plant.ROOTSTALK = generateMaterial(MATERIAL.PLANTPART.STEM.UNDERGROUND.ROOTSTALK, RNG.random(), plant.NAME + '-rootstalk'); }
  }
  else if (type === LIFE.PLANT.FLORAL) {
    // Leaves
    plant.LEAF = generateMaterial(MATERIAL.PLANTPART.LEAF.LEAF, seed, plant.NAME + '-leaf');

    // Gammetes
    plant.FLOWER = generateMaterial(MATERIAL.PLANTPART.FLOWER, RNG.random(), plant.NAME + '-flower');
    plant.SEED = generateMaterial(MATERIAL.PLANTPART.SEED, RNG.random(), plant.NAME + '-seed');

    // Roots
    rand = RNG.random();
    if (rand < 0.9) {
      plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random(), plant.NAME + '-taproot');
      plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random(), plant.NAME + '-root');
    }
    else if (rand < 0.95) { plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random(), plant.NAME + '-taproot'); }
    else { plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random(), plant.NAME + '-root'); }
    if (RNG.random() < 0.1) { plant.ROOTSTALK = generateMaterial(MATERIAL.PLANTPART.STEM.UNDERGROUND.ROOTSTALK, RNG.random(), plant.NAME + '-rootstalk'); }
    if (RNG.random() < 0.1) { plant.BULB = generateMaterial(MATERIAL.PLANTPART.STEM.UNDERGROUND.BULB, RNG.random(), plant.NAME + '-bulb'); }

  }

  return plant;
}

export function generatePlants(type, seed, number) {
  let plants = [];
  let RNG = new MersenneTwister(seed);
  let rand;

  for (let i = 0; i < number; i++) {
    rand = RNG.random_int();
    plants.push(generatePlant(type, rand));
  }

  return plants;
}

export function generateMaterial(type, seed, name) {
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
  let properties = [];

  /* */if (type === MATERIAL.CERAMIC)/*                */ { strA = 3; strR = 2; hrdA = 8; hrdR = 2; tghA = 3; tghR = 1; dnsA = 4; dnsR = 1; }
  else if (type === MATERIAL.DIRT)/*                   */ { strA = 0; strR = 0; hrdA = 0; hrdR = 0; tghA = 0; tghR = 0; dnsA = 3; dnsR = 2; }
  else if (type === MATERIAL.GLASS)/*                  */ { strA = 5; strR = 2; hrdA = 7; hrdR = 1; tghA = 3; tghR = 1; dnsA = 4; dnsR = 2; }
  else if (type === MATERIAL.METAL.ALLOY)/*            */ { strA = 9; strR = 8; hrdA = 7; hrdR = 13; tghA = 10; tghR = 6; dnsA = 10; dnsR = 9; }
  else if (type === MATERIAL.METAL.COMMON)/*           */ { strA = 9; strR = 4; hrdA = 6; hrdR = 4; tghA = 6; tghR = 3; dnsA = 8; dnsR = 5; }
  else if (type === MATERIAL.METAL.PRECIOUS)/*         */ { strA = 7; strR = 4; hrdA = 5; hrdR = 4; tghA = 10; tghR = 3; dnsA = 16; dnsR = 4; }
  else if (type === MATERIAL.METAL.UNCOMMON)/*         */ { strA = 8; strR = 4; hrdA = 7; hrdR = 4; tghA = 8; tghR = 3; dnsA = 12; dnsR = 5; }
  else if (type === MATERIAL.ROCK.GEM.PRECIOUS)/*      */ { strA = 15; strR = 5; hrdA = 17; hrdR = 3; tghA = 1; tghR = 1; dnsA = 6; dnsR = 2; }
  else if (type === MATERIAL.ROCK.GEM.SEMIPRECIOUS)/*  */ { strA = 12; strR = 5; hrdA = 15; hrdR = 3; tghA = 2; tghR = 2; dnsA = 7; dnsR = 3; }
  else if (type === MATERIAL.ROCK.IGNEOUS)/*           */ { strA = 6; strR = 3; hrdA = 10; hrdR = 3; tghA = 4; tghR = 2; dnsA = 5; dnsR = 2; }
  else if (type === MATERIAL.ROCK.METAMORPHIC)/*       */ { strA = 5; strR = 3; hrdA = 9; hrdR = 3; tghA = 6; tghR = 2; dnsA = 5; dnsR = 2; }
  else if (type === MATERIAL.ROCK.SEDIMENTARY)/*       */ { strA = 7; strR = 3; hrdA = 8; hrdR = 3; tghA = 5; tghR = 2; dnsA = 5; dnsR = 2; }
  else if (type === MATERIAL.RUBBER)/*                 */ { strA = 1; strR = 1; hrdA = 1; hrdR = 1; tghA = 18; tghR = 2; dnsA = 3; dnsR = 1; }
  else if (type === MATERIAL.TEXTILE.FIBRE)/*          */ { strA = 3; strR = 2; hrdA = 1; hrdR = 1; tghA = 12; tghR = 1; dnsA = 3; dnsR = 2; }
  else if (type === MATERIAL.TEXTILE.ROPE)/*           */ { strA = 4; strR = 2; hrdA = 1; hrdR = 1; tghA = 12; tghR = 2; dnsA = 3; dnsR = 1; }
  else if (type === MATERIAL.TEXTILE.SHEET)/*          */ { strA = 3; strR = 2; hrdA = 1; hrdR = 1; tghA = 12; tghR = 3; dnsA = 3; dnsR = 3; }
  else if (type === MATERIAL.PLANTPART.WOOD.HARDWOOD)/**/ { strA = 3; strR = 1; hrdA = 3; hrdR = 1; tghA = 12; tghR = 4; dnsA = 2; dnsR = 1; }
  else if (type === MATERIAL.PLANTPART.WOOD.SOFTWOOD)/**/ { strA = 2; strR = 1; hrdA = 2; hrdR = 1; tghA = 10; tghR = 4; dnsA = 1; dnsR = 1; }



  let str = Math.max(0, strA - strR + Math.floor(rand * (2 * strR + 1)));
  let tgh = Math.max(0, tghA - tghR + Math.floor(rand * (2 * tghR + 1)));
  let hrd = Math.max(0, hrdA - hrdR + Math.floor(rand * (2 * hrdR + 1)));
  let dns = Math.max(0, dnsA - dnsR + Math.floor(rand * (2 * dnsR + 1)));

  if (name === '') {
    let WG = new WordGen(RNG.random_int());
    name = WG.createWord();
  }

  let bearing = "";
  rand = RNG.random_int();
  /**/ if (type === MATERIAL.ROCK.IGNEOUS/*    */ && RNG.random() < 0.1) { bearing = generateMaterial(MATERIAL.ROCK.GEM.SEMIPRECIOUS, rand, ''); }
  else if (type === MATERIAL.ROCK.IGNEOUS/*    */ && RNG.random() < 0.2) { bearing = generateMaterial(MATERIAL.METAL.PRECIOUS,/*   */ rand, ''); }
  else if (type === MATERIAL.ROCK.IGNEOUS/*    */ && RNG.random() < 0.4) { bearing = generateMaterial(MATERIAL.METAL.UNCOMMON,/*   */ rand, ''); }
  else if (type === MATERIAL.ROCK.IGNEOUS/*    */ && RNG.random() < 0.7) { bearing = generateMaterial(MATERIAL.METAL.COMMON,/*     */ rand, ''); }
  else if (type === MATERIAL.ROCK.SEDIMENTARY/**/ && RNG.random() < 0.1) { bearing = generateMaterial(MATERIAL.METAL.UNCOMMON,/*   */ rand, ''); }
  else if (type === MATERIAL.ROCK.SEDIMENTARY/**/ && RNG.random() < 0.3) { bearing = generateMaterial(MATERIAL.METAL.COMMON,/*     */ rand, ''); }
  else if (type === MATERIAL.ROCK.METAMORPHIC/**/ && RNG.random() < 0.1) { bearing = generateMaterial(MATERIAL.ROCK.GEM.PRECIOUS,/**/ rand, ''); }
  else if (type === MATERIAL.ROCK.METAMORPHIC/**/ && RNG.random() < 0.3) { bearing = generateMaterial(MATERIAL.ROCK.GEM.SEMIPRECIOUS, rand, ''); }
  else if (type === MATERIAL.ROCK.METAMORPHIC/**/ && RNG.random() < 0.4) { bearing = generateMaterial(MATERIAL.METAL.PRECIOUS,/*   */ rand, ''); }
  else if (type === MATERIAL.ROCK.METAMORPHIC/**/ && RNG.random() < 0.5) { bearing = generateMaterial(MATERIAL.METAL.UNCOMMON,/*   */ rand, ''); }
  else if (type === MATERIAL.ROCK.METAMORPHIC/**/ && RNG.random() < 0.6) { bearing = generateMaterial(MATERIAL.METAL.COMMON,/*     */ rand, ''); }
  else if (type === MATERIAL.TEXTILE.FIBRE/*   */ && RNG.random() < 0.4) { bearing = generateMaterial(MATERIAL.TEXTILE.ROPE,/*     */ rand, ''); }
  else if (type === MATERIAL.TEXTILE.FIBRE/*   */ && RNG.random() < 0.8) { bearing = generateMaterial(MATERIAL.TEXTILE.SHEET,/*    */ rand, ''); }
  else if (type === MATERIAL.DIRT/*            */ && RNG.random() < 0.1) { bearing = generateMaterial(MATERIAL.GLASS,/*            */ rand, ''); }
  else if (type === MATERIAL.DIRT/*            */ && RNG.random() < 0.7) { bearing = generateMaterial(MATERIAL.CERAMIC,/*          */ rand, ''); }

  let newMaterial = {
    NAME: name,
    TYPE: type,
    SEED: seed,
    STRENGTH: str,
    TOUGHNESS: tgh,
    HARDNESS: hrd,
    DENSITY: dns,
    BEARING: bearing,
    PROPERTIES: properties,
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
    let newMat = generateMaterial(MATERIAL.ROCK.IGNEOUS, RNG.random_int(), '');
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
    let newMat = generateMaterial(MATERIAL.ROCK.SEDIMENTARY, RNG.random_int(), '');
    cosmosSedRocks.push(newMat);
    if (typeof newMat.BEARING !== 'undefined') {
      /* */if (newMat.BEARING.TYPE === MATERIAL.METAL.COMMON)/*         */ { cosmosCommMets.push(newMat.BEARING); }
      else if (newMat.BEARING.TYPE === MATERIAL.METAL.UNCOMMON)/*       */ { cosmosUncoMets.push(newMat.BEARING); }
    }
  }
  numMats = 200 + Math.floor(RNG.random() * 100);
  for (let i = 0; i < numMats; i++) {
    let newMat = generateMaterial(MATERIAL.ROCK.METAMORPHIC, RNG.random_int(), '');
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
    let newMat = generateMaterial(MATERIAL.DIRT, RNG.random_int(), '');
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
  let thisLevel = material.NAME + " (" + material.TYPE + ")";

  if (typeof (material.BEARING) === 'object') {
    let subLevel = generateMaterialBearingList(material.BEARING);
    thisLevel = thisLevel + " which bears " + subLevel;
  }

  return thisLevel;
}