import { useContext, useEffect, useState } from 'react';
import useHttp from '../hooks/useHttp';
import Modal from '../Template/Modal';
import ProgressContext from '../store/ProgressContext';
import Button from '../Template/Button';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

function ItemDetails({item}) {
  const [data, setData] = useState(null);
  const progressCtx = useContext(ProgressContext);
  const {
    data: loadedItems,
    isLoading,
    sendRequest,
    error
  } = useHttp('http://localhost:3000/itemDetails/' + item['itemId'], requestConfig);

  if (isLoading) {
    return <p className="center">Fetching itemsList...</p>;
  }

  if (loadedItems !== null && loadedItems !== undefined && loadedItems != [] && !isLoading) {
    setData(loadedItems)
  }

  useEffect(() => 
  {
    let jsonData = JSON.stringify({
      itemId: item['itemId'],
    })
    const resData = sendRequest(jsonData)
  }, [item]
  )

  function handleAddItemToCart() {
    cartCtx.addItem(item);
  }

  function handleCloseDetail() {
    progressCtx.hideDetails();
  }

  return (

    <Modal className="cart" open={progressCtx.progress === 'detail'}>
      <div className="Items">
        <div>
          Items Details
          {
            (loadedItems !== null && loadedItems !== undefined && loadedItems.length !== 0) && <div>
              <h3>{item['name']}</h3>
              <h3>{loadedItems[0]['description']}</h3>
              <h3>{loadedItems[0]['dimensions']}</h3>
              <h3>{loadedItems[0]['material']}</h3>
              <h3>{loadedItems[0]['seller']}</h3>
              <p className="item-price">
                &#8377;&nbsp;{item['price']}
              </p>
            </div>
          }
          {
            (!loadedItems) && <div>
              No Details Added
            </div>
          }
          <Button onClick={handleAddItemToCart}>Add to cart</Button>

          <Button onClick={handleCloseDetail}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ItemDetails