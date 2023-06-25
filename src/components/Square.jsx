import './Square.css';

export const Square = ({value,onClick}) => {
  return (
    <div className='square' onClick={onClick}>
      {value}
    </div>
  )
}
