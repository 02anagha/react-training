import './App.css';
import AppAuth from './components/AppAuth';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Header from './components/Header';
import ItemsList from './components/ItemList';
import { ProgressContextProvider } from './store/ProgressContext';

function App() {
  return (
    <ProgressContextProvider>
      
        <Header />
        <AppAuth />
        <ItemsList />
        <Cart />
        <Checkout />
    </ProgressContextProvider>
  )
}

export default App
