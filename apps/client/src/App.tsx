import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css'
import CreateTestimonial from './pages/CreateTestimonial';

function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/create" element={<CreateTestimonial />} />
  </Routes>
</BrowserRouter>
     
  )
}

export default App
  