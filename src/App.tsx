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
import AddChild from "./components/AddChild";
import AddTrial from "./components/AddTrial";
import AddReaction from "./components/AddReaction";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/AddChild" element={<AddChild />} />
          <Route path="/AddTrial/:patientId" element={<AddTrial />} />
          <Route path="/AddReaction/:id/:gender" element={<AddReaction />} />
          <Route
            path="/trial/:trialID/reactionID/:reactionID"
            element={<AddReaction />}
          />
          <Route path="/reactions/:TrialId" element={<AddReaction />} />
          {/* <Route path="/ViewTrial" element={<ViewTrial />} /> */}
          {/*<Route path="/Trials" element={<List />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />*/}
          <Route path="*" element={<Navigate to="/Login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
