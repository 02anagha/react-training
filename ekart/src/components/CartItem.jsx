import Button from "../Template/Button"

function CartItem({ name,
  price,
  quantity,
  onIncrease,
  onDecrease }) {
  return (
    <li className="cart-item">
      <div>
        <span> <Button onClick={onDecrease}>-</Button> </span>
        <span> {quantity} </span>
        <span> <Button onClick={onIncrease}>+</Button> </span>
      </div>
      <span> {name} </span>
      <span>  &#8377;&nbsp;{price} </span>
    </li>
  )
}

export default CartItem