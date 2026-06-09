import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { UploadPage } from "./pages/UploadPage";
import { Navbar } from "./components/layout/Navbar";
import { ResultsPage } from "./pages/ResultsPage";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07111F] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-32 -top-30 h-96 w-96 rounded-full bg-cyan-400/30 blur-3xl" />
        <div className="absolute -right-30 top-24 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />
        <div className="absolute -bottom-35 left-1/3 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
    </div>
  );
}
