import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importação do Router, Routes e Route
import CardExample from "./components/cards/Cards";
import Cadastro from "./components/cadastro/Cadastro";
import Cart from "./components/cart/Cart";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route
          path="/produtos"
          element={
            <ProtectedRoute>
              <CardExample />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
