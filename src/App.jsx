import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { AssetPlatforms } from "./pages/AssetPlatforms";
import { Cryptocurrencies } from "./pages/Cryptocurrencies";
import { MyCoins } from "./pages/MyCoins";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/asset-platforms" element={<AssetPlatforms />} />
        <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
        <Route path="/my-coins" element={<MyCoins />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
