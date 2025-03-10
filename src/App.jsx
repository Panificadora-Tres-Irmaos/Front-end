import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/navbar/Navbar'
import CardExample from './components/cards/Cards'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavbarComponent />
      <br />
      <br />
      <CardExample />
    </>
  )
}

export default App
