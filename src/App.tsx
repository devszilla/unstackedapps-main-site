import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { SPAShowcase } from "./pages/SPAShowcase"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spa-showcase" element={<SPAShowcase />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
