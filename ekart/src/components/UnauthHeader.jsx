import { Link } from 'react-router-dom';
import Button from '../Template/Button.jsx';

function UnauthHeader() {
    function handleShowLogin() {

    }

    function handleShowRegister() {

    }

    return (
        <>
            <header id="main-header">
                <Link to='/'>
                    <div id="title">
                        <h1>ThemeForest</h1>
                    </div>
                </Link>
                <nav>
                    <Link to='/login'>
                        <Button onClick={handleShowLogin}> Login </Button>
                    </Link>
                    &nbsp;&nbsp;
                    <Link to="/register"> <Button onClick={handleShowRegister}> Register </Button> </Link>
                </nav>
            </header>
        </>
    );
}

export default UnauthHeader