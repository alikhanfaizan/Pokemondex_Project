
import './App.css'
import { Link } from 'react-router-dom'
import Pokedex from './components/Pokedex/Pokedex'
import CustomRoutes from './components/Routes/CustomRoutes'

function App() {

  return (
    <div className='app'>
    <h1 id='pokemon-heading'>
      <Link to={'/'}>Pokedex</Link>
    </h1>
    <CustomRoutes/>
    </div>
  )
}

export default App
