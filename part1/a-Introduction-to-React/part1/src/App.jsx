import './App.css'
import Mensaje from './components/Mensaje'

function App() {
  return (
    <>
      <div className="App">
        <Mensaje color="greenyellow" message="Estamos trabajando" />
        <Mensaje color="cyan" message="en un curso" />
        <Mensaje color="blueviolet" message="de React" />
      </div>
    </>
  )
}

export default App
