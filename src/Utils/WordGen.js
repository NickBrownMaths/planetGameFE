const MersenneTwister = require("mersenne-twister");

export function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

class WordGen {
  constructor(seed) {
    this.RNG = new MersenneTwister(seed);
  }

  vowel = ['a', 'e', 'i', 'o', 'u', 'ai', 'ee', 'eu', 'ia', 'io', 'oi', 'oo', 'ou',];
  start1Cons = ['', 'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
  start2Cons = ['pl', 'pr', 'bl', 'br', 'tr', 'dr', 'kl', 'kr', 'gl', 'gr', 'fl', 'fr', 'thr', 'shr', 'sk', 'sl', 'sm', 'sn', 'sp', 'st', 'sw', 'tw', 'dw', 'kw', 'gw',];
  start3Cons = ['skr', 'skw', 'spl', 'spr', 'str',];
  end1Cons = ['', '\'', 'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
  end2Cons = ['ft', 'kt', 'lt', 'ld', 'lk', 'lp', 'lb', 'lf', 'lv', 'lch', 'lge', 'lm', 'ls', 'mp', 'mf', 'nt', 'nd', 'nch', 'nge', 'ns', 'nz', 'ng', 'ps', 'pt', 'sk', 'sp', 'st', 'ps', 'ts', 'ks', 'bs', 'ds', 'gs', 'fs', 'ths', 'vs', 'ngs', 'ls', 'pt', 'kt', 'st', 'sht', 'ft', 'cht',];
  end3Cons = ['mpt', 'ngth'];

  createSyllable(syllableIdx) {
    let syllable = '';
    let rand = this.RNG.random();

    if (syllableIdx === 1) {
      /* */if (rand < 0.01) { syllable = syllable + this.start3Cons[Math.floor(this.RNG.random() * this.start3Cons.length)]; }
      else if (rand < 0.10) { syllable = syllable + this.start2Cons[Math.floor(this.RNG.random() * this.start2Cons.length)]; }
      else /*            */ { syllable = syllable + this.start1Cons[Math.floor(this.RNG.random() * this.start1Cons.length)]; }
    }

    rand = this.RNG.random();
    syllable = syllable + this.vowel[Math.floor(this.RNG.random() * this.vowel.length)];

    rand = this.RNG.random();
    /* */if (rand < 0.01) { syllable = syllable + this.end3Cons[Math.floor(this.RNG.random() * this.end3Cons.length)]; }
    else if (rand < 0.10) { syllable = syllable + this.end2Cons[Math.floor(this.RNG.random() * this.end2Cons.length)]; }
    else /*            */ { syllable = syllable + this.end1Cons[Math.floor(this.RNG.random() * this.end1Cons.length)]; }

    return syllable;
  }

  createName() {
    let name = this.createWord();
    return name[0].toUpperCase() + name.substring(1) ;
  }

  createWord() {
    let word = '';
    let rand = this.RNG.random();
    let totalSyllables = 1;
    word = word + this.createSyllable(totalSyllables);

    while (rand < 0.45 / Math.sqrt(totalSyllables)) {
      rand = this.RNG.random() ;
      word = word + this.createSyllable(totalSyllables);
      rand = this.RNG.random() ;
      totalSyllables++;
    }
    return word;
  }
}

export default WordGen ;