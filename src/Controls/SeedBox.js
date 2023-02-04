import { useForm } from 'react-hook-form';
import './SeedBox.css'

function SeedBox(props) {
  let inputData = '';

  const { register, handleSubmit } = useForm();

  return (
    <form className='SeedForm' onSubmit={handleSubmit ((data) => {props.setPlanetSeed(data.seed)})}>
      <input type='number' {...register('seed')} placeholder='planet #' className='SeedInput' />
      <input className='SeedSubmit' type='submit' value='Go' />
    </form>
  )
}

export default SeedBox;