import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../Template/Button.jsx';
import ProgressContext from '../store/ProgressContext.jsx';

function AvailableItem({ item }) {
  const progressCtx = useContext(ProgressContext)
  const [isDetail, setIsDetail] = useState(false);  
  
  const dispatch = useDispatch()

  function handleMoreDetails() {
    // setIsDetail(true)
    progressCtx.showDetails('detail');
    setIsDetail(true)
  }

  function handleAddItemToCart() {
    dispatch({type: "ADD_ITEM", item})
  }

  return (
    <>
    {/* { isDetail && <ItemDetails item={item} />} */}
    <li className="item">
      <article>
        <img src={`./src/assests/${item['imageValue']}`} alt={item['name']} className='productImg'/>
        <div>
          <h3>{item['name']}</h3>
          <p className="item-price">
            Price: &#8377;&nbsp;{item['price']}
          </p>
        </div>
        <p className="item-actions">
          {/* <Button onClick={handleMoreDetails}>More Details</Button>           */}
          <Button onClick={handleAddItemToCart}>Add to cart</Button>
        </p>
      </article>
    </li>
    </>
    
  );
}

export default AvailableItem