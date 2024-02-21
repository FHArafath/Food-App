/* eslint-disable react/jsx-no-undef */
import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MealDetail from "./components/MealDetail";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meals/:id" element={<MealDetail />} />
      </Routes>
    </>
  );
}

export default App;
