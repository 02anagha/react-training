import { createContext, useState } from 'react';

const 
ProgressContext = createContext({
  progress: '', // 'cart', 'checkout'
  showLogin: () => {},
  hideLogin: () => {},
  showDetails: () => {},
  hideDetails: () => {},
  showOrders: () => {},
  hideOrders: () => {},
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function ProgressContextProvider({ children }) {  
  const userData = JSON.parse(sessionStorage.getItem('accountDetails'))
  const [progress, setProgress] = useState('')

  function showCart() {
    setProgress('cart');
  }

  function hideCart() {
    setProgress('');
  }

  function showCheckout() {
    setProgress('checkout');
  }

  function hideCheckout() {
    setProgress('');
  }

  const progressCtx = {
    progress: progress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <ProgressContext.Provider value={progressCtx}>
      {children}
    </ProgressContext.Provider>
  );
}

export default ProgressContext;