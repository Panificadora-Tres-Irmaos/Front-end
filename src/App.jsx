import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importação do Router, Routes e Route
import CardExample from './components/cards/Cards';
import Cadastro from './components/cadastro/Cadastro';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cadastro />} /> {/* Usando 'element' para passar o componente */}
        <Route path="/produtos" element={<CardExample />} /> {/* Usando 'element' para passar o componente */}
      </Routes>
    </Router>
  );
}

export default App;
