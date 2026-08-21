import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Portfolio } from "./pages/Portfolio";
import { Blog } from "./pages/Blog";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ minHeight: "100svh", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
