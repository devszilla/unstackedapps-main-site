import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { SPAShowcase } from "./pages/SPAShowcase"
import { ContactForm } from "./pages/ContactForm"
import { ResumeDemo } from "./pages/ResumeDemo"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spa-showcase" element={<SPAShowcase />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/resume-demo" element={<ResumeDemo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
