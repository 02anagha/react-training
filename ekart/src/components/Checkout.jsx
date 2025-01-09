import { useDispatch, useSelector } from "react-redux";
import Input from "../Template/Input";
import ProgressContext from "../store/ProgressContext";
import { useContext } from "react";
import useHttp from "../hooks/useHttp";
import Button from "../Template/Button";
import Modal from "../Template/Modal";

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

function Checkout() {
  const userData = JSON.parse(sessionStorage.getItem('accountDetails'))
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest
  } = useHttp('http://localhost:3000/orders', requestConfig);

  const cartItems = useSelector((state) => state.items)
  const dispatch = useDispatch()
  const progressCtx = useContext(ProgressContext);


  function handleCloseCart() {
    progressCtx.hideCheckout();
  }
  function handleFinish() {
    progressCtx.hideCheckout();
    dispatch({type: "CLEAR_CART"})
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendRequest(
      JSON.stringify({
        order: {
          items: cartItems,
          userId: userData['id']
        },
      })
    );
  }
  let totalPrice = 0
  const cartTotal = cartItems.map((item) => {
    totalPrice = totalPrice + item.quantity * item.price
  })

  let actions = (
    <>
      <Button type="button" onClick={handleCloseCart}>
        Close
      </Button>
      <Button onClick={handleSubmit}>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={progressCtx.progress === 'checkout'}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          Your order should be ready to dispatch in 4-5 working days 
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
    className="cart"
    open={progressCtx.progress === 'checkout'}
    onClose={progressCtx.progress === 'checkout' ? handleCloseCart : null}
  >
    <div className="Checkout">    
        Checkout Page
        <Input label="Address" type="text" id="address" isRef={true} />
        <Input label="Pincode" type="text" id="pincode" />
        <p className="modal-actions">{actions}</p>
      </div>
    
    </Modal>
  )
}

export default Checkout