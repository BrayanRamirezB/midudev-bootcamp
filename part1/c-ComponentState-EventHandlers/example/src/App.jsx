import './App.css'
import { useState } from 'react'
import PropTypes from 'prop-types'
import Contador from './components/Counter'
import StateComplex from './components/StateComplex'

function App() {
  //añadir un estado al componente
  const [contador, setContador] = useState(0)

  // Otra forma de hacer el useState
  // const c = useState(0) //Devulve un array de 2 posiciones
  // const contador = c[0] // valor del estado
  // const setContador = c[1] // forma de actualizar el valor

  //En el cuerpo del componente JAMAS SE PUEDE USAR ESTO PORQUE SE VUELVE A RENDERIZAR
  // setInterval(() => {
  //   setContador(contador + 1)
  // }, 1000)

  const handleClick = (param) => {
    setContador(param ? contador + 1 : contador - 1)
  }

  const handleClickReset = () => {
    //useState no vuelve a renderizar si las props son iguales
    setContador(0)
  }

  const isEven = contador % 2 === 0
  const msjPar = isEven ? 'Es par' : 'Es impar'

  return (
    <>
      <div>
        <p>El valor del contador es: </p>
        <Contador number={contador} />
        <p>{msjPar}</p>
        <button onClick={() => handleClick(1)}>Incrementar</button>
        <button onClick={() => handleClick(0)}>Decrementar</button>
        <button onClick={handleClickReset}>Reset</button>

        <br />
        <br />
        <StateComplex />
        {/* Otra manera de hacer el incremento */}
        {/* <button
          onClick={() => {
            //setContador(contador + 1)

            //Permite utilizar el valor anterior
            setContador((prevContador) => {
              return prevContador + 1
            })
          }}
        >
          Incrementar
        </button> */}
      </div>
    </>
  )
}

App.propTypes = {
  contadorInicial: PropTypes.number,
}

export default App
