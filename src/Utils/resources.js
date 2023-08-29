import MersenneTwister from "mersenne-twister"
import WordGen from "./WordGen";
import { LIFE, MATERIAL, ORGANPOWER, PROPERTIES, PROPERTYMATRIX } from "./enums";

export function generateAnimal(type, seed) {
  let RNG = new MersenneTwister(seed);

  let animal = {};
  animal.TYPE = type;

  let WG = new WordGen(RNG.random_int());
  animal.NAME = WG.createWord();

  /* */if (type === LIFE.ANIMAL.BIRD) {
    animal.STRUCTURE = {};
    animal.STRUCTURE.BONE/*   */ = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.BONE.HOLLOW,/**/ RNG.random_int(), animal.NAME + '-bone', type);
    animal.STRUCTURE.SKIN/*   */ = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.SKIN,/*       */ RNG.random_int(), animal.NAME + '-skin', type);
    animal.STRUCTURE.MUSCLE/* */ = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.MUSCLE,/*     */ RNG.random_int(), animal.NAME + '-muscle', type);
    animal.STRUCTURE.FAT/*    */ = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.FAT,/*        */ RNG.random_int(), animal.NAME + '-fat', type);
    animal.STRUCTURE.FEATHER/**/ = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.FEATHER,/*    */ RNG.random_int(), animal.NAME + '-feather', type);

    animal.ORGAN = {};
    animal.ORGAN.BRAIN/*    */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.BRAIN/*    */, RNG.random_int(), animal.NAME + '-brain', type);
    animal.ORGAN.HEART/*    */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.HEART/*    */, RNG.random_int(), animal.NAME + '-heart', type);
    animal.ORGAN.LUNG/*     */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.LUNG/*     */, RNG.random_int(), animal.NAME + '-lung', type);
    animal.ORGAN.STOMACH/*  */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.STOMACH/*  */, RNG.random_int(), animal.NAME + '-stomach', type);
    animal.ORGAN.LIVER/*    */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.LIVER/*    */, RNG.random_int(), animal.NAME + '-liver', type);
    animal.ORGAN.KIDNEY/*   */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.KIDNEY/*   */, RNG.random_int(), animal.NAME + '-kidney', type);
    animal.ORGAN.INTESTINE/**/ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.INTESTINE/**/, RNG.random_int(), animal.NAME + '-intestine', type);
    animal.ORGAN.GIZZARD/*  */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.GIZZARD/*  */, RNG.random_int(), animal.NAME + '-gizzard', type);

    animal.SECRETION = {};
    animal.SECRETION.BLOOD/**/ = generateMaterial(MATERIAL.ANIMALPART.SECRETION.BLOOD,/**/ RNG.random_int(), animal.NAME + '-blood', type);
    animal.SECRETION.EGG/*  */ = generateMaterial(MATERIAL.ANIMALPART.SECRETION.EGG,/*  */ RNG.random_int(), animal.NAME + '-egg', type);

    animal.SENSOR = {};
    animal.SENSOR.EYE/*   */ = generateMaterial(MATERIAL.ANIMALPART.SENSOR.EYE,/*   */ RNG.random_int(), animal.NAME + '-eye', type,);
    animal.SENSOR.EAR/*   */ = generateMaterial(MATERIAL.ANIMALPART.SENSOR.EAR,/*   */ RNG.random_int(), animal.NAME + '-ear', type,);
    animal.SENSOR.NOSE/*  */ = generateMaterial(MATERIAL.ANIMALPART.SENSOR.NOSE,/*  */ RNG.random_int(), animal.NAME + '-nose', type,);
    animal.SENSOR.TOUCH/* */ = generateMaterial(MATERIAL.ANIMALPART.SENSOR.TOUCH,/* */ RNG.random_int(), animal.NAME + '-touch', type,);

    if (RNG.random() < 0.2) { animal.CLAW = generateMaterial(MATERIAL.ANIMALPART.WEAPONS.CLAW, RNG.random_int(), animal.NAME + '-claw', type); }

    animal.LIMB = {};
    animal.LIMB.HEAD/**/ = generateMaterial(MATERIAL.ANIMALPART.LIMB.HEAD,/**/ RNG.random_int(), animal.NAME + '-head', type);
    animal.LIMB.TAIL/**/ = generateMaterial(MATERIAL.ANIMALPART.LIMB.TAIL,/**/ RNG.random_int(), animal.NAME + '-tail', type);
    animal.LIMB.WING/**/ = generateMaterial(MATERIAL.ANIMALPART.LIMB.WING,/**/ RNG.random_int(), animal.NAME + '-wing', type);
    animal.LIMB.LEG/* */ = generateMaterial(MATERIAL.ANIMALPART.LIMB.LEG,/* */ RNG.random_int(), animal.NAME + '-leg', type);
  }
  else if (type === LIFE.ANIMAL.BEAST.FURRY) {
    animal.STRUCTURE = {};
    if (RNG.random() < 0.1) { animal.STRUCTURE.BONE = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.BONE.SOLID,/**/ RNG.random_int(), animal.NAME + '-bone', type); }
    else /*              */ { animal.STRUCTURE.BONE = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.BONE.DENSE,/**/ RNG.random_int(), animal.NAME + '-bone', type); }
    animal.STRUCTURE.SKIN/*                      */ = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.SKIN,/*      */ RNG.random_int(), animal.NAME + '-skin', type);
    animal.STRUCTURE.MUSCLE/*                    */ = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.MUSCLE,/*    */ RNG.random_int(), animal.NAME + '-muscle', type);
    animal.STRUCTURE.FAT/*                       */ = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.FAT,/*       */ RNG.random_int(), animal.NAME + '-fat', type);
    animal.STRUCTURE.FUR/*                       */ = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.FUR,/*       */ RNG.random_int(), animal.NAME + '-fur', type);

    animal.ORGAN = {};
    animal.ORGAN.BRAIN/*    */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.BRAIN/*    */, RNG.random_int(), animal.NAME + '-brain', type);
    animal.ORGAN.HEART/*    */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.HEART/*    */, RNG.random_int(), animal.NAME + '-heart', type);
    animal.ORGAN.LUNG/*     */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.LUNG/*     */, RNG.random_int(), animal.NAME + '-lung', type);
    animal.ORGAN.STOMACH/*  */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.STOMACH/*  */, RNG.random_int(), animal.NAME + '-stomach', type);
    animal.ORGAN.LIVER/*    */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.LIVER/*    */, RNG.random_int(), animal.NAME + '-liver', type);
    animal.ORGAN.KIDNEY/*   */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.KIDNEY/*   */, RNG.random_int(), animal.NAME + '-kidney', type);
    animal.ORGAN.INTESTINE/**/ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.INTESTINE/**/, RNG.random_int(), animal.NAME + '-intestine', type);

    animal.SECRETION = {};
    animal.SECRETION.BLOOD/**/ = generateMaterial(MATERIAL.ANIMALPART.SECRETION.BLOOD,/**/ RNG.random_int(), animal.NAME + '-blood', type);
    animal.SECRETION.SPIT/* */ = generateMaterial(MATERIAL.ANIMALPART.SECRETION.SPIT,/* */ RNG.random_int(), animal.NAME + '-spit', type);
    animal.SECRETION.EGG/*  */ = generateMaterial(MATERIAL.ANIMALPART.SECRETION.EGG,/*  */ RNG.random_int(), animal.NAME + '-milk', type);

    animal.SENSOR = {};
    animal.SENSOR.EYE/*   */ = generateMaterial(MATERIAL.ANIMALPART.SENSOR.EYE,/*  */ RNG.random_int(), animal.NAME + '-eye', type);
    animal.SENSOR.EAR/*   */ = generateMaterial(MATERIAL.ANIMALPART.SENSOR.EAR,/*  */ RNG.random_int(), animal.NAME + '-ear', type);
    animal.SENSOR.NOSE/*  */ = generateMaterial(MATERIAL.ANIMALPART.SENSOR.NOSE,/* */ RNG.random_int(), animal.NAME + '-nose', type);
    animal.SENSOR.TOUCH/* */ = generateMaterial(MATERIAL.ANIMALPART.SENSOR.TOUCH,/**/ RNG.random_int(), animal.NAME + '-touch', type);

    if (RNG.random() < 0.95) { animal.TOOTH/**/ = generateMaterial(MATERIAL.ANIMALPART.WEAPONS.TOOTH/**/, RNG.random_int(), animal.NAME + '-tooth', type); }
    if (RNG.random() < 0.25) { animal.CLAW/* */ = generateMaterial(MATERIAL.ANIMALPART.WEAPONS.CLAW/* */, RNG.random_int(), animal.NAME + '-claw', type); }
    if (RNG.random() < 0.15) { animal.HORN/* */ = generateMaterial(MATERIAL.ANIMALPART.WEAPONS.HORN/* */, RNG.random_int(), animal.NAME + '-horn', type); }

    animal.LIMB = {};
    animal.LIMB.HEAD/**/ = generateMaterial(MATERIAL.ANIMALPART.LIMB.HEAD,/**/ RNG.random_int(), animal.NAME + '-head', type);
    if (RNG.random() < 0.6) { animal.LIMB.TAIL/* */ = generateMaterial(MATERIAL.ANIMALPART.LIMB.TAIL,/**/ RNG.random_int(), animal.NAME + '-tail', type) };
    if (RNG.random() < 0.05) { animal.LIMB.WING/**/ = generateMaterial(MATERIAL.ANIMALPART.LIMB.WING,/**/ RNG.random_int(), animal.NAME + '-wing', type) };
    if (RNG.random() < 0.1) { animal.LIMB.ARM/*  */ = generateMaterial(MATERIAL.ANIMALPART.LIMB.ARM,/* */ RNG.random_int(), animal.NAME + '-arm', type) };
    animal.LIMB.LEG/* */ = generateMaterial(MATERIAL.ANIMALPART.LIMB.LEG,/* */ RNG.random_int(), animal.NAME + '-leg', type);
  }
  else if (type === LIFE.ANIMAL.BEAST.SCALED) {
    animal.STRUCTURE = {};
    if (RNG.random() < 0.15) { animal.STRUCTURE.BONE = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.BONE.SOLID, RNG.random_int(), animal.NAME + '-bone', type); }
    else /*               */ { animal.STRUCTURE.BONE = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.BONE.DENSE, RNG.random_int(), animal.NAME + '-bone', type); }
    animal.STRUCTURE.SKIN/*                       */ = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.SKIN/*  */, RNG.random_int(), animal.NAME + '-skin', type);
    animal.STRUCTURE.MUSCLE/*                     */ = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.MUSCLE/**/, RNG.random_int(), animal.NAME + '-muscle', type);
    animal.STRUCTURE.SCALES/*                     */ = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.SCALES/**/, RNG.random_int(), animal.NAME + '-scales', type);
    animal.STRUCTURE.FAT/*                        */ = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.FAT/*   */, RNG.random_int(), animal.NAME + '-fat', type);
    if (RNG.random() < 0.1) { animal.STRUCTURE.SHELL = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.SHELL/* */, RNG.random_int(), animal.NAME + '-shell', type); }

    animal.ORGAN = {};
    animal.ORGAN.BRAIN/*    */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.BRAIN/*    */, RNG.random_int(), animal.NAME + '-brain', type);
    animal.ORGAN.HEART/*    */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.HEART/*    */, RNG.random_int(), animal.NAME + '-heart', type);
    animal.ORGAN.LUNG/*     */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.LUNG/*     */, RNG.random_int(), animal.NAME + '-lung', type);
    animal.ORGAN.STOMACH/*  */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.STOMACH/*  */, RNG.random_int(), animal.NAME + '-stomach', type);
    animal.ORGAN.LIVER/*    */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.LIVER/*    */, RNG.random_int(), animal.NAME + '-liver', type);
    animal.ORGAN.KIDNEY/*   */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.KIDNEY/*   */, RNG.random_int(), animal.NAME + '-kidney', type);
    animal.ORGAN.INTESTINE/**/ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.INTESTINE/**/, RNG.random_int(), animal.NAME + '-intestine', type);
    animal.ORGAN.GIZZARD/*  */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.GIZZARD/*  */, RNG.random_int(), animal.NAME + '-gizzard', type);

    animal.SECRETION = {};
    animal.SECRETION.BLOOD/**/ = generateMaterial(MATERIAL.ANIMALPART.SECRETION.BLOOD,/**/ RNG.random_int(), animal.NAME + '-blood', type);
    animal.SECRETION.SPIT/* */ = generateMaterial(MATERIAL.ANIMALPART.SECRETION.SPIT,/* */ RNG.random_int(), animal.NAME + '-spit', type);
    if (RNG.random() < 0.1) { animal.SECRETION.VENOM = generateMaterial(MATERIAL.ANIMALPART.SECRETION.VENOM,/*  */ RNG.random_int(), animal.NAME + '-venom', type); }
    if (RNG.random() < 0.1) { animal.SECRETION.POISON = generateMaterial(MATERIAL.ANIMALPART.SECRETION.POISON,/**/ RNG.random_int(), animal.NAME + '-poison', type); }

    animal.SENSOR = {};
    animal.SENSOR.EYE/*   */ = generateMaterial(MATERIAL.ANIMALPART.SENSOR.EYE,/*  */ RNG.random_int(), animal.NAME + '-eye', type);
    animal.SENSOR.EAR/*   */ = generateMaterial(MATERIAL.ANIMALPART.SENSOR.EAR,/*  */ RNG.random_int(), animal.NAME + '-ear', type);
    animal.SENSOR.NOSE/*  */ = generateMaterial(MATERIAL.ANIMALPART.SENSOR.NOSE,/* */ RNG.random_int(), animal.NAME + '-nose', type);
    animal.SENSOR.TOUCH/* */ = generateMaterial(MATERIAL.ANIMALPART.SENSOR.TOUCH,/**/ RNG.random_int(), animal.NAME + '-touch', type);

    if (RNG.random() < 0.95) { animal.TOOTH/**/ = generateMaterial(MATERIAL.ANIMALPART.WEAPONS.TOOTH/**/, RNG.random_int(), animal.NAME + '-tooth', type); }
    if (RNG.random() < 0.45) { animal.CLAW/* */ = generateMaterial(MATERIAL.ANIMALPART.WEAPONS.CLAW/* */, RNG.random_int(), animal.NAME + '-claw', type); }
    if (RNG.random() < 0.15) { animal.HORN/* */ = generateMaterial(MATERIAL.ANIMALPART.WEAPONS.HORN/* */, RNG.random_int(), animal.NAME + '-horn', type); }

    animal.LIMB = {};
    animal.LIMB.HEAD/**/ = generateMaterial(MATERIAL.ANIMALPART.LIMB.HEAD,/**/ RNG.random_int(), animal.NAME + '-head', type);
    if (RNG.random() < 0.75) { animal.LIMB.TAIL/**/ = generateMaterial(MATERIAL.ANIMALPART.LIMB.TAIL,/**/ RNG.random_int(), animal.NAME + '-tail', type) };
    if (RNG.random() < 0.05) { animal.LIMB.WING/**/ = generateMaterial(MATERIAL.ANIMALPART.LIMB.WING,/**/ RNG.random_int(), animal.NAME + '-wing', type) };
    if (RNG.random() < 0.1) { animal.LIMB.ARM/*  */ = generateMaterial(MATERIAL.ANIMALPART.LIMB.ARM,/* */ RNG.random_int(), animal.NAME + '-arm', type) };
    animal.LIMB.LEG/* */ = generateMaterial(MATERIAL.ANIMALPART.LIMB.LEG,/* */ RNG.random_int(), animal.NAME + '-leg', type);
  }
  else if (type === LIFE.ANIMAL.FISH) {
    animal.STRUCTURE = {};
    animal.STRUCTURE.BONE/*   */ = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.BONE.SOFT,/**/ RNG.random_int(), animal.NAME + '-bone', type);
    animal.STRUCTURE.SKIN/*   */ = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.SKIN,/*     */ RNG.random_int(), animal.NAME + '-skin', type);
    animal.STRUCTURE.MUSCLE/* */ = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.MUSCLE,/*   */ RNG.random_int(), animal.NAME + '-muscle', type);
    animal.STRUCTURE.FAT/*    */ = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.FAT,/*      */ RNG.random_int(), animal.NAME + '-fat', type);
    animal.STRUCTURE.SCALES/* */ = generateMaterial(MATERIAL.ANIMALPART.STRUCTURE.SCALES,/*   */ RNG.random_int(), animal.NAME + '-scales', type);

    animal.ORGAN = {};
    animal.ORGAN.BRAIN/*    */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.BRAIN/*    */, RNG.random_int(), animal.NAME + '-brain', type);
    animal.ORGAN.HEART/*    */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.HEART/*    */, RNG.random_int(), animal.NAME + '-heart', type);
    animal.ORGAN.LUNG/*     */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.LUNG/*     */, RNG.random_int(), animal.NAME + '-lung', type);
    animal.ORGAN.STOMACH/*  */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.STOMACH/*  */, RNG.random_int(), animal.NAME + '-stomach', type);
    animal.ORGAN.LIVER/*    */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.LIVER/*    */, RNG.random_int(), animal.NAME + '-liver', type);
    animal.ORGAN.KIDNEY/*   */ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.KIDNEY/*   */, RNG.random_int(), animal.NAME + '-kidney', type);
    animal.ORGAN.INTESTINE/**/ = generateMaterial(MATERIAL.ANIMALPART.ORGAN.INTESTINE/**/, RNG.random_int(), animal.NAME + '-intestine', type);

    animal.SECRETION = {};
    animal.SECRETION.BLOOD/*                            */ = generateMaterial(MATERIAL.ANIMALPART.SECRETION.BLOOD,/* */ RNG.random_int(), animal.NAME + '-blood', type);
    animal.SECRETION.EGG/*                              */ = generateMaterial(MATERIAL.ANIMALPART.SECRETION.EGG,/*   */ RNG.random_int(), animal.NAME + '-egg', type);
    if (RNG.random() < 0.05) { animal.SECRETION.INK/*   */ = generateMaterial(MATERIAL.ANIMALPART.SECRETION.INK,/*   */ RNG.random_int(), '-ink', type); }
    if (RNG.random() < 0.05) { animal.SECRETION.POISON/**/ = generateMaterial(MATERIAL.ANIMALPART.SECRETION.POISON,/**/ RNG.random_int(), '-poison', type); }
    if (RNG.random() < 0.05) { animal.SECRETION.VENOM/* */ = generateMaterial(MATERIAL.ANIMALPART.SECRETION.VENOM,/* */ RNG.random_int(), '-venom', type); }

    animal.SENSOR = {};
    animal.SENSOR.EYE/*   */ = generateMaterial(MATERIAL.ANIMALPART.SENSOR.EYE,/*   */ RNG.random_int(), animal.NAME + '-eye', type,);
    animal.SENSOR.EAR/*   */ = generateMaterial(MATERIAL.ANIMALPART.SENSOR.EAR,/*   */ RNG.random_int(), animal.NAME + '-ear', type,);
    animal.SENSOR.NOSE/*  */ = generateMaterial(MATERIAL.ANIMALPART.SENSOR.NOSE,/*  */ RNG.random_int(), animal.NAME + '-nose', type,);
    animal.SENSOR.TOUCH/* */ = generateMaterial(MATERIAL.ANIMALPART.SENSOR.TOUCH,/* */ RNG.random_int(), animal.NAME + '-touch', type,);

    if (RNG.random() < 0.35) { animal.TOOTH = generateMaterial(MATERIAL.ANIMALPART.WEAPONS.TOOTH/**/, RNG.random_int(), animal.NAME + '-tooth', type); }

    animal.LIMB = {};
    animal.LIMB.HEAD/**/ = generateMaterial(MATERIAL.ANIMALPART.LIMB.HEAD,/**/ RNG.random_int(), animal.NAME + '-head', type);
    animal.LIMB.TAIL/**/ = generateMaterial(MATERIAL.ANIMALPART.LIMB.TAIL,/**/ RNG.random_int(), animal.NAME + '-tail', type);
  }
  else if (type === LIFE.ANIMAL.BUG) { }
  else if (type === LIFE.ANIMAL.JELLY) { }

  return animal;
}

export function generateAnimals(type, seed, number) {
  let animals = [];
  let RNG = new MersenneTwister(seed);

  for (let i = 0; i < number; i++) {
    animals.push(generateAnimal(type, RNG.random_int()));
  }

  return animals;
}

export function generatePlant(type, seed) {
  let RNG = new MersenneTwister(seed);

  let plant = {};
  plant.TYPE = type;

  let WG = new WordGen(RNG.random_int());
  plant.NAME = WG.createWord();

  /* */if (type === LIFE.PLANT.TREE.HARDWOOD) {

    // Wood
    plant.WOOD = generateMaterial(MATERIAL.PLANTPART.WOOD.HARDWOOD, RNG.random_int(), plant.NAME + '-wood');
    plant.BARK = generateMaterial(MATERIAL.PLANTPART.BARK, RNG.random_int(), plant.NAME + '-bark');

    // Leaves/Needles
    if (RNG.random() < 0.99) {
      if (RNG.random() < 0.95) { plant.LEAF = generateMaterial(MATERIAL.PLANTPART.LEAF.LEAF, RNG.random_int(), plant.NAME + '-leaf'); }
      else { plant.NEEDLE = generateMaterial(MATERIAL.PLANTPART.LEAF.NEEDLE, RNG.random_int(), plant.NAME + '-needle'); }
    }

    // Roots
    let rand = RNG.random();
    if (rand < 0.9) {
      plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random_int(), plant.NAME + '-taproot');
      plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random_int(), plant.NAME + '-root');
    }
    else if (rand < 0.95) { plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random_int(), plant.NAME + '-taproot'); }
    else { plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random_int(), plant.NAME + '-root'); }

    // Thorns
    if (RNG.random() < 0.15) { plant.THORN = generateMaterial(MATERIAL.PLANTPART.STEM.AERIAL.THORN, RNG.random_int(), plant.NAME + '-thorn') }

    // Gammetes
    if (RNG.random() < 0.8) {
      plant.FLOWER = generateMaterial(MATERIAL.PLANTPART.FLOWER, RNG.random_int(), plant.NAME + '-flower');
      if (RNG.random() < 0.98) { plant.FRUIT = generateMaterial(MATERIAL.PLANTPART.FRUIT, RNG.random_int(), plant.NAME + '-fruit'); }
    }
    else/*       */ { plant.CONE = generateMaterial(MATERIAL.PLANTPART.FLOWER, RNG.random_int(), plant.NAME + '-cone'); }
    plant.SEED = generateMaterial(MATERIAL.PLANTPART.SEED, RNG.random_int(), plant.NAME + '-seed');
  }
  else if (type === LIFE.PLANT.TREE.SOFTWOOD) {
    // Wood
    plant.WOOD = generateMaterial(MATERIAL.PLANTPART.WOOD.SOFTWOOD, seed, plant.NAME + '-wood');
    plant.BARK = generateMaterial(MATERIAL.PLANTPART.BARK, seed, plant.NAME + '-bark');

    // Leaves/Needles
    if (RNG.random() < 0.99) {
      if (RNG.random() < 0.2) { plant.LEAF = generateMaterial(MATERIAL.PLANTPART.LEAF, RNG.random_int(), plant.NAME + '-leaf'); }
      else/*       */ { plant.NEEDLE = generateMaterial(MATERIAL.PLANTPART.NEEDLE, RNG.random_int(), plant.NAME + '-needle'); }
    }

    // Roots
    let rand = RNG.random();
    if (rand < 0.9) {
      plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random_int(), plant.NAME + '-taproot');
      plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random_int(), plant.NAME + '-root');
    }
    else if (rand < 0.95) { plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random_int(), plant.NAME + '-taproot'); }
    else { plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random_int(), plant.NAME + '-root'); }

    // Thorns
    if (RNG.random() < 0.10) { plant.THORN = generateMaterial(MATERIAL.PLANTPART.STEM.AERIAL.THORN, RNG.random_int(), plant.NAME + '-thorn') }

    // Gammetes
    rand = RNG.random()
    if (rand < 0.2) {
      plant.FLOWER = generateMaterial(MATERIAL.PLANTPART.FLOWER, RNG.random_int(), plant.NAME + '-flower');
      if (RNG.random() < 0.97) { plant.FRUIT = generateMaterial(MATERIAL.PLANTPART.FRUIT, RNG.random_int(), plant.NAME + '-fruit'); }
    }
    else/*       */ { plant.CONE = generateMaterial(MATERIAL.PLANTPART.FLOWER, RNG.random_int(), plant.NAME + '-cone'); }
    plant.SEED = generateMaterial(MATERIAL.PLANTPART.SEED, RNG.random_int(), plant.NAME);
  }
  else if (type === LIFE.PLANT.SUCCULENT) {
    // Woody or leafy?
    if (RNG.random() < 0.10) { plant.WOOD = generateMaterial(MATERIAL.PLANTPART.WOOD.SOFTWOOD, seed, plant.NAME + '-wood'); }
    else { plant.LEAF = generateMaterial(MATERIAL.PLANTPART.LEAF.FLESHY, seed, plant.NAME + '-leaf'); }

    // Spikes?
    if (RNG.random() < 0.75) { plant.SPIKE = generateMaterial(MATERIAL.PLANTPART.LEAF.SPIKE, RNG.random_int(), plant.NAME + '-spike'); }

    // Roots
    let rand = RNG.random();
    if (rand < 0.9) {
      plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random_int(), plant.NAME + '-taproot');
      plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random_int(), plant.NAME + '-root');
    }
    else if (rand < 0.95) { plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random_int(), plant.NAME + '-taproot'); }
    else { plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random_int(), plant.NAME + '-root'); }

    // Gammetes
    plant.FLOWER = generateMaterial(MATERIAL.PLANTPART.FLOWER, RNG.random_int(), plant.NAME + '-flower');
    if (RNG.random() < 0.99) {
      plant.SEED = generateMaterial(MATERIAL.PLANTPART.SEED, RNG.random_int(), plant.NAME + '-seed');
      if (RNG.random() < 0.99) { plant.FRUIT = generateMaterial(MATERIAL.PLANTPART.FRUIT, RNG.random_int(), plant.NAME + '-fruit'); }
    }
  }
  else if (type === LIFE.PLANT.SHRUB) {
    // Woody or stemmed?
    let rand = RNG.random();
    if (rand < 0.05) { plant.WOOD = generateMaterial(MATERIAL.PLANTPART.WOOD.HARDWOOD, seed, plant.NAME + '-wood'); }
    else if (rand < 0.15) { plant.WOOD = generateMaterial(MATERIAL.PLANTPART.WOOD.SOFTWOOD, seed, plant.NAME + '-wood'); }
    else { plant.STEM = generateMaterial(MATERIAL.PLANTPART.STEM.STEM, seed, plant.NAME + '-stem'); }

    // Roots
    rand = RNG.random();
    if (rand < 0.9) {
      plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random_int(), plant.NAME + '-taproot');
      plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random_int(), plant.NAME + '-root');
    }
    else if (rand < 0.95) { plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random_int(), plant.NAME + '-taproot'); }
    else { plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random_int(), plant.NAME + '-root'); }

    plant.LEAF = generateMaterial(MATERIAL.PLANTPART.LEAF.LEAF, seed, plant.NAME + '-leaf');

    // Thorns
    if (RNG.random() < 0.10) { plant.THORN = generateMaterial(MATERIAL.PLANTPART.STEM.AERIAL.THORN, RNG.random_int(), plant.NAME + '-thorn') }

    // Gammetes
    plant.FLOWER = generateMaterial(MATERIAL.PLANTPART.FLOWER, RNG.random_int(), plant.NAME + '-flower');
    if (RNG.random() < 0.93) {
      plant.SEED = generateMaterial(MATERIAL.PLANTPART.SEED, RNG.random_int(), plant.NAME + '-seed');
      if (RNG.random() < 0.93) { plant.FRUIT = generateMaterial(MATERIAL.PLANTPART.FRUIT, RNG.random_int(), plant.NAME + '-fruit'); }
    }

  }
  else if (type === LIFE.PLANT.GRASS) {
    // Roots
    let rand = RNG.random();
    if (rand < 0.9) {
      plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random_int(), plant.NAME + '-taproot');
      plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random_int(), plant.NAME + '-root');
    }
    else if (rand < 0.95) { plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random_int(), plant.NAME + '-taproot'); }
    else { plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random_int(), plant.NAME + '-root'); }

    // Leaves
    plant.LEAF = generateMaterial(MATERIAL.PLANTPART.LEAF.LEAF, seed, plant.NAME + '-leaf');

    // Gammetes
    if (RNG.random() < 0.5) { plant.FLOWER = generateMaterial(MATERIAL.PLANTPART.FLOWER, RNG.random_int(), plant.NAME + '-flower'); }
    if (RNG.random() < 0.99) { plant.SEED = generateMaterial(MATERIAL.PLANTPART.SEED, RNG.random_int(), plant.NAME + '-seed'); }
  }
  else if (type === LIFE.PLANT.MOSS) {
    // Roots
    plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random_int(), plant.NAME + '-root');
    // Leaves
    plant.LEAF = generateMaterial(MATERIAL.PLANTPART.LEAF.LEAF, seed, plant.NAME + '-leaf');
    // Gammetes
    plant.SEED = generateMaterial(MATERIAL.PLANTPART.SEED, RNG.random_int(), plant.NAME + '-seed');
  }
  else if (type === LIFE.PLANT.VEGETABLE) {
    // Leaves
    plant.LEAF = generateMaterial(MATERIAL.PLANTPART.LEAF.LEAF, seed, plant.NAME + '-leaf');

    // Gammetes
    if (RNG.random() < 0.8) { plant.FLOWER = generateMaterial(MATERIAL.PLANTPART.FLOWER, RNG.random_int(), plant.NAME + '-flower'); }
    if (RNG.random() < 0.99) { plant.SEED = generateMaterial(MATERIAL.PLANTPART.SEED, RNG.random_int(), plant.NAME + '-seed'); }

    let rand = RNG.random();
    if (rand < 0.333) { plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random_int(), plant.NAME + '-taproot'); }
    else if (rand < 0.666) {
      plant.ROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random_int(), plant.NAME + '-root');
      plant.TUBER = generateMaterial(MATERIAL.PLANTPART.STEM.UNDERGROUND.TUBER, RNG.random_int(), plant.NAME + '-tuber');
    }
    else {
      plant.ROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random_int(), plant.NAME + '-root');
      plant.BULB = generateMaterial(MATERIAL.PLANTPART.STEM.UNDERGROUND.BULB, RNG.random_int(), plant.NAME + '-bulb');
    }
    if (RNG.random() < 0.1) { plant.ROOTSTALK = generateMaterial(MATERIAL.PLANTPART.STEM.UNDERGROUND.ROOTSTALK, RNG.random_int(), plant.NAME + '-rootstalk'); }
  }
  else if (type === LIFE.PLANT.FLORAL) {
    // Leaves
    plant.LEAF = generateMaterial(MATERIAL.PLANTPART.LEAF.LEAF, seed, plant.NAME + '-leaf');

    // Gammetes
    plant.FLOWER = generateMaterial(MATERIAL.PLANTPART.FLOWER, RNG.random_int(), plant.NAME + '-flower');
    plant.SEED = generateMaterial(MATERIAL.PLANTPART.SEED, RNG.random_int(), plant.NAME + '-seed');

    // Thorns
    if (RNG.random() < 0.10) { plant.THORN = generateMaterial(MATERIAL.PLANTPART.STEM.AERIAL.THORN, RNG.random_int(), plant.NAME + '-thorn') }

    // Roots
    let rand = RNG.random();
    if (rand < 0.9) {
      plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random_int(), plant.NAME + '-taproot');
      plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random_int(), plant.NAME + '-root');
    }
    else if (rand < 0.95) { plant.TAPROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.TAP, RNG.random_int(), plant.NAME + '-taproot'); }
    else { plant.FIBROUSROOT = generateMaterial(MATERIAL.PLANTPART.ROOT.FIBROUS, RNG.random_int(), plant.NAME + '-root'); }
    if (RNG.random() < 0.1) { plant.ROOTSTALK = generateMaterial(MATERIAL.PLANTPART.STEM.UNDERGROUND.ROOTSTALK, RNG.random_int(), plant.NAME + '-rootstalk'); }
    if (RNG.random() < 0.1) { plant.BULB = generateMaterial(MATERIAL.PLANTPART.STEM.UNDERGROUND.BULB, RNG.random_int(), plant.NAME + '-bulb'); }

  }

  return plant;
}

export function generatePlants(type, seed, number) {
  let plants = [];
  let RNG = new MersenneTwister(seed);

  for (let i = 0; i < number; i++) {
    let rand = RNG.random_int();
    plants.push(generatePlant(type, rand));
  }

  return plants;
}

export function generateMaterial(type, seed, name, parentType) {

  if (!Number.isInteger(seed)) { console.log(type); }

  let RNG = new MersenneTwister(seed);
  let rand = 0;

  let strA = 0;
  let strR = 0;
  let hrdA = 0;
  let hrdR = 0;
  let tghA = 0;
  let tghR = 0;
  let dnsA = 0;
  let dnsR = 0;
  let properties = [];

  /* */if (type === MATERIAL.CERAMIC)/*                         */ { strA = 3; strR = 2; hrdA = 8; hrdR = 2; tghA = 3; tghR = 1; dnsA = 4; dnsR = 1; }
  else if (type === MATERIAL.DIRT)/*                            */ { strA = 0; strR = 0; hrdA = 0; hrdR = 0; tghA = 0; tghR = 0; dnsA = 3; dnsR = 2; }
  else if (type === MATERIAL.GLASS)/*                           */ { strA = 5; strR = 2; hrdA = 7; hrdR = 1; tghA = 3; tghR = 1; dnsA = 4; dnsR = 2; }
  else if (type === MATERIAL.METAL.ALLOY)/*                     */ { strA = 9; strR = 8; hrdA = 7; hrdR = 13; tghA = 10; tghR = 6; dnsA = 10; dnsR = 9; }
  else if (type === MATERIAL.METAL.COMMON)/*                    */ { strA = 9; strR = 4; hrdA = 6; hrdR = 4; tghA = 6; tghR = 3; dnsA = 8; dnsR = 5; }
  else if (type === MATERIAL.METAL.PRECIOUS)/*                  */ { strA = 7; strR = 4; hrdA = 5; hrdR = 4; tghA = 10; tghR = 3; dnsA = 16; dnsR = 4; }
  else if (type === MATERIAL.METAL.UNCOMMON)/*                  */ { strA = 8; strR = 4; hrdA = 7; hrdR = 4; tghA = 8; tghR = 3; dnsA = 12; dnsR = 5; }
  else if (type === MATERIAL.ROCK.GEM.PRECIOUS)/*               */ { strA = 15; strR = 5; hrdA = 17; hrdR = 3; tghA = 1; tghR = 1; dnsA = 6; dnsR = 2; }
  else if (type === MATERIAL.ROCK.GEM.SEMIPRECIOUS)/*           */ { strA = 12; strR = 5; hrdA = 15; hrdR = 3; tghA = 2; tghR = 2; dnsA = 7; dnsR = 3; }
  else if (type === MATERIAL.ROCK.IGNEOUS)/*                    */ { strA = 6; strR = 3; hrdA = 10; hrdR = 3; tghA = 4; tghR = 2; dnsA = 5; dnsR = 2; }
  else if (type === MATERIAL.ROCK.METAMORPHIC)/*                */ { strA = 5; strR = 3; hrdA = 9; hrdR = 3; tghA = 6; tghR = 2; dnsA = 5; dnsR = 2; }
  else if (type === MATERIAL.ROCK.SEDIMENTARY)/*                */ { strA = 7; strR = 3; hrdA = 8; hrdR = 3; tghA = 5; tghR = 2; dnsA = 5; dnsR = 2; }
  else if (type === MATERIAL.RUBBER)/*                          */ { strA = 1; strR = 1; hrdA = 1; hrdR = 1; tghA = 18; tghR = 2; dnsA = 3; dnsR = 1; }
  else if (type === MATERIAL.TEXTILE.FIBRE)/*                   */ { strA = 3; strR = 2; hrdA = 1; hrdR = 1; tghA = 12; tghR = 1; dnsA = 3; dnsR = 2; }
  else if (type === MATERIAL.TEXTILE.ROPE)/*                    */ { strA = 4; strR = 2; hrdA = 1; hrdR = 1; tghA = 12; tghR = 2; dnsA = 3; dnsR = 1; }
  else if (type === MATERIAL.TEXTILE.SHEET)/*                   */ { strA = 3; strR = 2; hrdA = 1; hrdR = 1; tghA = 12; tghR = 3; dnsA = 3; dnsR = 3; }
  else if (type === MATERIAL.PLANTPART.WOOD.HARDWOOD)/*         */ { strA = 3; strR = 1; hrdA = 3; hrdR = 1; tghA = 12; tghR = 4; dnsA = 2; dnsR = 1; }
  else if (type === MATERIAL.PLANTPART.WOOD.SOFTWOOD)/*         */ { strA = 2; strR = 1; hrdA = 2; hrdR = 1; tghA = 10; tghR = 4; dnsA = 1; dnsR = 1; }

  else if (type === MATERIAL.ANIMALPART.STRUCTURE.BONE.HOLLOW)/**/ { strA = 2; strR = 1; hrdA = 1; hrdR = 1; tghA = 0; tghR = 1; dnsA = 1; dnsR = 1; }
  else if (type === MATERIAL.ANIMALPART.STRUCTURE.BONE.SOFT)/*  */ { strA = 2; strR = 1; hrdA = 2; hrdR = 1; tghA = 1; tghR = 1; dnsA = 2; dnsR = 1; }
  else if (type === MATERIAL.ANIMALPART.STRUCTURE.BONE.SOLID)/* */ { strA = 3; strR = 1; hrdA = 4; hrdR = 1; tghA = 1; tghR = 1; dnsA = 3; dnsR = 1; }
  else if (type === MATERIAL.ANIMALPART.STRUCTURE.BONE.DENSE)/* */ { strA = 4; strR = 1; hrdA = 8; hrdR = 1; tghA = 1; tghR = 1; dnsA = 4; dnsR = 1; }
  else if (type === MATERIAL.ANIMALPART.WEAPONS.TOOTH)/*        */ { strA = 4; strR = 2; hrdA = 5; hrdR = 2; tghA = 3; tghR = 2; dnsA = 3; dnsR = 2; }
  else if (type === MATERIAL.ANIMALPART.WEAPONS.CLAW)/*         */ { strA = 3; strR = 2; hrdA = 5; hrdR = 2; tghA = 4; tghR = 2; dnsA = 3; dnsR = 2; }
  else if (type === MATERIAL.ANIMALPART.WEAPONS.HORN)/*         */ { strA = 4; strR = 2; hrdA = 4; hrdR = 2; tghA = 3; tghR = 2; dnsA = 3; dnsR = 2; }

  rand = RNG.random(); let str = Math.max(0, strA - strR + Math.floor(rand * (2 * strR + 1)));
  rand = RNG.random(); let tgh = Math.max(0, tghA - tghR + Math.floor(rand * (2 * tghR + 1)));
  rand = RNG.random(); let hrd = Math.max(0, hrdA - hrdR + Math.floor(rand * (2 * hrdR + 1)));
  rand = RNG.random(); let dns = Math.max(0, dnsA - dnsR + Math.floor(rand * (2 * dnsR + 1)));

  if (Object.hasOwn(ORGANPOWER, type)) {
    if (Object.hasOwn(ORGANPOWER[type], parentType)) {
      let pwrA = ORGANPOWER[type][parentType].average;
      let pwrR = ORGANPOWER[type][parentType].range;
      rand = RNG.random(); let power = Math.max(0, pwrA - pwrR + Math.floor(rand * (2 * pwrR + 1)));
      if (power > 0) { properties.push({ property: PROPERTIES.ORGANPOWER, value: power }) };
    }
  }

  if (Object.hasOwn(PROPERTYMATRIX, type)) {
    if (Object.hasOwn(PROPERTYMATRIX[type], parentType)) {
      for (let entry in PROPERTYMATRIX[type][parentType]) {
        if (RNG.random() < PROPERTYMATRIX[type][parentType][entry].chance) {
          rand = RNG.random(); let power = Math.floor(rand * 11);
          properties.push({ property: PROPERTYMATRIX[type][parentType][entry].prop, value: power })
        }
      }
    }
  }






  if (name === '') {
    rand = RNG.random_int();
    let WG = new WordGen(rand);
    name = WG.createWord();
  }

  let bearing = "";
  rand = RNG.random();
  /**/ if (type === MATERIAL.ROCK.IGNEOUS/*    */ && rand < 0.1) { bearing = generateMaterial(MATERIAL.ROCK.GEM.SEMIPRECIOUS, RNG.random_int(), ''); }
  else if (type === MATERIAL.ROCK.IGNEOUS/*    */ && rand < 0.2) { bearing = generateMaterial(MATERIAL.METAL.PRECIOUS,/*   */ RNG.random_int(), ''); }
  else if (type === MATERIAL.ROCK.IGNEOUS/*    */ && rand < 0.4) { bearing = generateMaterial(MATERIAL.METAL.UNCOMMON,/*   */ RNG.random_int(), ''); }
  else if (type === MATERIAL.ROCK.IGNEOUS/*    */ && rand < 0.7) { bearing = generateMaterial(MATERIAL.METAL.COMMON,/*     */ RNG.random_int(), ''); }
  else if (type === MATERIAL.ROCK.SEDIMENTARY/**/ && rand < 0.1) { bearing = generateMaterial(MATERIAL.METAL.UNCOMMON,/*   */ RNG.random_int(), ''); }
  else if (type === MATERIAL.ROCK.SEDIMENTARY/**/ && rand < 0.3) { bearing = generateMaterial(MATERIAL.METAL.COMMON,/*     */ RNG.random_int(), ''); }
  else if (type === MATERIAL.ROCK.METAMORPHIC/**/ && rand < 0.1) { bearing = generateMaterial(MATERIAL.ROCK.GEM.PRECIOUS,/**/ RNG.random_int(), ''); }
  else if (type === MATERIAL.ROCK.METAMORPHIC/**/ && rand < 0.3) { bearing = generateMaterial(MATERIAL.ROCK.GEM.SEMIPRECIOUS, RNG.random_int(), ''); }
  else if (type === MATERIAL.ROCK.METAMORPHIC/**/ && rand < 0.4) { bearing = generateMaterial(MATERIAL.METAL.PRECIOUS,/*   */ RNG.random_int(), ''); }
  else if (type === MATERIAL.ROCK.METAMORPHIC/**/ && rand < 0.5) { bearing = generateMaterial(MATERIAL.METAL.UNCOMMON,/*   */ RNG.random_int(), ''); }
  else if (type === MATERIAL.ROCK.METAMORPHIC/**/ && rand < 0.6) { bearing = generateMaterial(MATERIAL.METAL.COMMON,/*     */ RNG.random_int(), ''); }
  else if (type === MATERIAL.TEXTILE.FIBRE/*   */ && rand < 0.4) { bearing = generateMaterial(MATERIAL.TEXTILE.ROPE,/*     */ RNG.random_int(), ''); }
  else if (type === MATERIAL.TEXTILE.FIBRE/*   */ && rand < 0.8) { bearing = generateMaterial(MATERIAL.TEXTILE.SHEET,/*    */ RNG.random_int(), ''); }
  else if (type === MATERIAL.DIRT/*            */ && rand < 0.1) { bearing = generateMaterial(MATERIAL.GLASS,/*            */ RNG.random_int(), ''); }
  else if (type === MATERIAL.DIRT/*            */ && rand < 0.7) { bearing = generateMaterial(MATERIAL.CERAMIC,/*          */ RNG.random_int(), ''); }

  let newMaterial = { NAME: name, TYPE: type }
  if (str > 0) { newMaterial.STRENGTH = str; }
  if (tgh > 0) { newMaterial.TOUGHNESS = tgh; }
  if (hrd > 0) { newMaterial.HARDNESS = hrd; }
  if (dns > 0) { newMaterial.DENSITY = dns; }
  if (properties.length > 0) { newMaterial.PROPERTIES = properties; }
  if (bearing !== '') { newMaterial.BEARING = bearing; }

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