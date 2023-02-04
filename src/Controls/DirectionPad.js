import { transpose4, transpose3, matrixMatrixMultiply3, matrixMatrixMultiply4, flatten } from '../Utils/matrices';
import { whatCellAmILookingAt } from '../Utils/planetCreation';
import ControlButton from "./ControlButton";
import './DirectionPad.css'

function DirectionPad(props) {

  let t = Math.PI / 32 * props.speed / props.scale;
  let t3 = Math.PI / 32 * props.speed;
  let ct = Math.cos(t);
  let st = Math.sin(t);
  let ct3 = Math.cos(t3);
  let st3 = Math.sin(t3);

  let rot1 = [[1, 0, 0, 1,], [0, ct, - st, 0,], [0, st, ct, 0,], [0, 0, 0, 1,],]
  let rot2 = [[ct, 0, st, 0,], [0, 1, 0, 0,], [- st, 0, ct, 0,], [0, 0, 0, 1,],]
  let rot3 = [[ct3, - st3, 0, 0,], [st3, ct3, 0, 0,], [0, 0, 1, 0,], [0, 0, 0, 1,],]
  let iRot1 = transpose4(rot1);
  let iRot2 = transpose4(rot2);
  let iRot3 = transpose4(rot3);

  return (
    <div className="DirectionPad">
      <ControlButton onClick={() => { props.setTransformMatrix(matrixMatrixMultiply4(props.transformMatrix, rot3)); props.setLookingAt(whatCellAmILookingAt(matrixMatrixMultiply4(props.transformMatrix, rot3), props.planetVertices)); }} text={'\u21BB'} />
      <ControlButton onClick={() => { props.setTransformMatrix(matrixMatrixMultiply4(props.transformMatrix, iRot1)); props.setLookingAt(whatCellAmILookingAt(matrixMatrixMultiply4(props.transformMatrix, iRot3), props.planetVertices)); }} text={'\u2191'} />
      <ControlButton onClick={() => { props.setTransformMatrix(matrixMatrixMultiply4(props.transformMatrix, iRot3)); props.setLookingAt(whatCellAmILookingAt(matrixMatrixMultiply4(props.transformMatrix, rot3), props.planetVertices)); }} text={'\u21BA'} />
      <ControlButton />
      <ControlButton onClick={() => { props.setScale(Math.min(props.scale * 2, 32)) }} text={'+'} />
      <ControlButton />
      <ControlButton onClick={() => { props.setSpeed(Math.min(props.speed * 2, 8)) }} text={'>>'} />

      <ControlButton onClick={() => { props.setTransformMatrix(matrixMatrixMultiply4(props.transformMatrix, iRot2)); props.setLookingAt(whatCellAmILookingAt(matrixMatrixMultiply4(props.transformMatrix, iRot2), props.planetVertices)); }} text={'\u2190'} />
      <ControlButton onClick={() => { props.setTransformMatrix(matrixMatrixMultiply4(props.transformMatrix, rot1)); props.setLookingAt(whatCellAmILookingAt(matrixMatrixMultiply4(props.transformMatrix, rot1), props.planetVertices)); }} text={'\u2193'} />
      <ControlButton onClick={() => { props.setTransformMatrix(matrixMatrixMultiply4(props.transformMatrix, rot2)); props.setLookingAt(whatCellAmILookingAt(matrixMatrixMultiply4(props.transformMatrix, rot2), props.planetVertices)); }} text={'\u2192'} />
      <ControlButton />
      <ControlButton onClick={() => { props.setScale(Math.max(props.scale / 2, 0.0625)) }} text={'-'} />
      <ControlButton />
      <ControlButton onClick={() => { props.setSpeed(Math.max(props.speed / 2, 0.03125)) }} text={'>'} />
    </div>
  )
}

export default DirectionPad;