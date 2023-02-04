export function transpose4(a) {
  let b = [[0, 0, 0, 0,], [0, 0, 0, 0,], [0, 0, 0, 0,], [0, 0, 0, 0,],];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      b[i][j] = a[j][i];
    }
  }
  return b;
}
export function transpose3(a) {
  let b = [[0, 0, 0,], [0, 0, 0,], [0, 0, 0,],];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      b[i][j] = a[j][i];
    }
  }
  return b;
}

export function matrixMatrixMultiply4(a, b) {
  let c = [[0, 0, 0, 0,], [0, 0, 0, 0,], [0, 0, 0, 0,], [0, 0, 0, 0,],];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 3; k++) {
        c[i][j] = c[i][j] + a[i][k] * b[k][j];
      }
    }
  }
  return c;
}
export function matrixMatrixMultiply3(a, b) {
  let c = [[0, 0, 0,], [0, 0, 0,], [0, 0, 0,],];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        c[i][j] = c[i][j] + a[i][k] * b[k][j];
      }
    }
  }
  return c;
}

export function matrixVectorMultiply3(a, b) {
  let c = [0, 0, 0,];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        c[i] = c[i] + a[i][j] * b[i];
      }
    }
  return c;
}

export function scalarMatrixMultiply4(a, b) {
  let c = [[0, 0, 0, 0,], [0, 0, 0, 0,], [0, 0, 0, 0,], [0, 0, 0, 0,],];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      c[i][j] = a * b[i][j];
    }
  }
  return c;
}

export function scalarMatrixMultiply3(a, b) {
  let c = [[0, 0, 0,], [0, 0, 0,], [0, 0, 0,],];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      c[i][j] = a * b[i][j];
    }
  }
  return c;
}

export const flatten = a => a.reduce(
  (b, c) => b.concat(Array.isArray(c) ? flatten(c) : c), []
);