import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import About from './pages/About';
import Nav from './Components/Nav';
import Product from './pages/Product';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Hospital from "./pages/hospital/Hospital";
import Index from "./pages/category/Index";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/detail/:id/title/:title" element={<Detail />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/category" element={<Index />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
