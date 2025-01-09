
import { useContext } from 'react';
import CartItem from './CartItem';
import ProgressContext from '../store/ProgressContext';
import Modal from '../Template/Modal';
import Button from '../Template/Button';
import { useDispatch, useSelector } from 'react-redux';

function Cart() {
  
  const progressCtx = useContext(ProgressContext);
  const dispatch = useDispatch()

  function handleSubmit() {
    console.log("handleSubmit")
    progressCtx.hideCart();
    progressCtx.showCheckout()
  }

  function handleCloseCart() {
    console.log("handleCloseCart")
    progressCtx.hideCart();
  }
  const cartItems = useSelector((state) => state.items)
  let totalPrice = 0
  const cartTotal = cartItems.map((item) => {
    totalPrice = totalPrice + item.quantity * item.price
  }
)
  
  let actions = (
    <>
      <Button type="button" onClick={handleCloseCart}>
        Close
      </Button>
      <Button onClick={handleSubmit}>Submit Order</Button>
    </>
  );

  return (
    <Modal
      className="cart"
      open={progressCtx.progress === 'cart'}
      onClose={progressCtx.progress === 'cart' ? handleCloseCart : null}
    >
      <div className="Cart">
        <div>
          Cart Page
        </div>
        <ul>
          {cartItems.map((item) => (
            <CartItem
              key={item.itemId}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncrease={() => dispatch({type: "ADD_ITEM", item})}
              onDecrease={() => dispatch({type: "REMOVE_ITEM", item})}
            />
          ))}
        </ul>
      </div>
      <p className="cart-total">Cart Total: &#8377;&nbsp;{totalPrice}</p>
      {/* <Button onClick={handleCloseCart}>
        Close
      </Button>
      <Button onClick={handleSubmit}>
        Place Order
      </Button> */}

      {/* {error && <Error title="Failed to submit order" message={error} />} */}

      <p className="modal-actions">{actions}</p>
    </Modal>
  )
}

export default Cart