import { useContext, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from '../Template/Button.jsx';
import cart from '../assests/cart.jpg';
import ProgressContext from '../store/ProgressContext.jsx';
import Users from "./Users.jsx";
import Searchbar from './Searchbar.jsx';

function Header() {
  const progressCtx = useContext(ProgressContext);
  const totalCartItems = useSelector((state) => state.value)
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const dispatch = useDispatch();
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('accountDetails')))
  const navigate = useNavigate();
  function handleShowCart() {
    progressCtx.showCart();
  }

  function handleLogout() {
    sessionStorage.removeItem('accountDetails')
    setUserData([])
    dispatch({ type: "CLEAR_CART" })
    navigate('/')
  }

  return (
    <>
      <header id="main-header">
        <div id="title">
        <Link to='/home'> <h1>ThemeForest</h1> </Link>
        </div>
        <Searchbar />
        <nav>
          <div className="col-6 row">
            <div className="menu" 
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Users name={userData['name']} />
              {isDropdownVisible &&
                <>
                  <div className="dropdown-menu">
                    <ul>
                      <li>
                        <Link to='/profile'>
                          Your Profile
                        </Link>
                      </li>
                      <li>
                        <Link to='/orders'>
                          Your Orders
                        </Link>
                      </li>
                      <li onClick={handleLogout} textOnly>Logout</li>
                    </ul>
                  </div>
                </>
              }
            </div>

            <Button textOnly onClick={handleShowCart}>
              <img src={cart} height="50px" width="50px" />
              <span className="cart-text">
                ({totalCartItems})
              </span>
            </Button> &nbsp;&nbsp;
            {/* <Button onClick={handleLogout}>Logout</Button> */}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header