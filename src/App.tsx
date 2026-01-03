import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import One from './pages/1'
import Three from './pages/3'
import Two from './pages/2'
import GeneralLayout from './layouts/GeneralLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/one' element={<GeneralLayout><One /></GeneralLayout>} />
        <Route path='/two' element={<GeneralLayout><Two /></GeneralLayout>} />
        <Route path='/three' element={<GeneralLayout><Three /></GeneralLayout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
