import { scalarMatrixMultiply3, flatten } from '../Utils/matrices';
import React, { useRef, useEffect } from 'react';
import './ObsWindowsCanvas.css';

const PlanetCanvas = props => {

  const { draw, ...rest } = props;
  const planetCanvasRef = useRef();

  useEffect(() => {

    const canvas = planetCanvasRef.current;
    const gl = canvas.getContext('webgl');
    let animationFrameId;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(props.vertexdata), gl.STATIC_DRAW);

    const colourBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colourBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(props.colourdata), gl.DYNAMIC_DRAW);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, `
      precision mediump float;
      attribute vec3 position;
      attribute vec3 colour;
      varying vec3 vColour;

      uniform mat4 transform;

      void main() {
        vColour = colour;
        gl_Position = transform * vec4(position, 1);
      }
    `);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, `
      precision mediump float;
      varying vec3 vColour;
      void main() {
        gl_FragColor = vec4(vColour, 1);
      }
    `);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const positionLocation = gl.getAttribLocation(program, `position`);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    const colourLocation = gl.getAttribLocation(program, `colour`);
    gl.enableVertexAttribArray(colourLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, colourBuffer);
    gl.vertexAttribPointer(colourLocation, 3, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);
    gl.enable(gl.DEPTH_TEST);

    const uniformLocations = {
      transform: gl.getUniformLocation(program, `transform`),
    }

    let locTransformMatrix = [[0, 0, 0,], [0, 0, 0,], [0, 0, 0,],];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        locTransformMatrix[i][j] = props.transformMatrix[i][j];
      }
    }

    locTransformMatrix = scalarMatrixMultiply3(props.scale, locTransformMatrix);
    locTransformMatrix[0].push(0);
    locTransformMatrix[1].push(0);
    locTransformMatrix[2].push(0);
    locTransformMatrix.push([0, 0, props.scale, 1]);
    let transform = flatten(locTransformMatrix);

    gl.uniformMatrix4fv(uniformLocations.transform, false, transform);
    gl.drawArrays(gl.TRIANGLES, 0, props.vertexdata.length / 3);

    const render = () => {
      draw(gl)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return <canvas height='580' width='580' className='ObsWindowCanvas' ref={planetCanvasRef} {...rest} />
}

export default PlanetCanvas;