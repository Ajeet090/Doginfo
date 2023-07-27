import { BrowserRouter , Routes , Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Footer from './pages/Footer';

function App() {
  return (
    <>
  
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
    </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  );
}

export default App;
