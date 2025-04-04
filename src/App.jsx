import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importação do Router, Routes e Route
import CardExample from './components/cards/Cards';
import Cadastro from './components/cadastro/Cadastro';
import Cart from './components/cart/Cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/produtos" element={<CardExample />} />
        <Route path='/cart' element={<Cart />}/>
      </Routes>
    </Router>
  );
}

export default App;
