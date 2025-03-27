import './App.css'
import BookstorePage from './pages/BookstorePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';

function App() {

  return (
    <>
    <CartProvider>
      <Router>
        <Routes>
          <Route path='/' element={<BookstorePage/>}/>
          <Route path='/checkout/:title/:bookID/:price' element={<CheckoutPage/>} />
          <Route path='/cart' element={<CartPage/>} />
        </Routes>
      </Router>
    </CartProvider>

    </>
  )
}

export default App
