import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import ProductPage from "./pages/Product";
import SearchPage from "./pages/Search";
import AdviserStateProvider from "./context";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <div className="App">
      <AdviserStateProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="product" element={<ProductPage />}>
              <Route path=":id" element={<ProductPage />} />
            </Route>
            <Route path="search" element={<SearchPage />}>
              <Route path=":id" element={<SearchPage />} />
            </Route>
            <Route path="cart" element={<CartPage />} />
          </Routes>
        </BrowserRouter>
      </AdviserStateProvider>
    </div>
  );
}

export default App;
