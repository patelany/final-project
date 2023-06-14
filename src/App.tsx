import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Login />
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route path="/Trials" element={<List />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />*/}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
