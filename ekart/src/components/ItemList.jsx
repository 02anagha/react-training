import Error from './Error.jsx';
import AvailableItem from './AvailableItem.jsx';
import useHttp from '../hooks/useHttp.jsx';
import { useDispatch, useSelector } from 'react-redux';

const requestConfig = {};

function ItemsList() {
  const {
    data: loadedItemsList,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/items', requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching itemsList...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch itemsList" message={error} />;
  }

  return (
    <ul id="itemsList">
      {loadedItemsList.length === 0 && <span className='emptyList'> Nothing to display</span>}
      {loadedItemsList.map((item) => (
        <AvailableItem key={item.itemId} item={item} />
      ))}
    </ul>
  );
}

export default ItemsList