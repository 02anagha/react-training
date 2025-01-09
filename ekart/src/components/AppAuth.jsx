
import { useContext, useState } from 'react';
import Button from '../Template/Button';
import Login from './Login';
import Register from './Register';
import ProgressContext from '../store/ProgressContext';
import Modal from '../Template/Modal';

function AppAuth() {
    const [isLogin, setIsLogin] = useState(true);
    const [isRegister, setIsRegister] = useState(false);
    
    const progressCtx = useContext(ProgressContext);

    function handleLogin() {
        setIsLogin(true)
        setIsRegister(false)
    }

    function handleRegister() {
        setIsLogin(false)
        setIsRegister(true)
    }   

    function handleSuccess() {
        setIsLogin(true)
        setIsRegister(false)
    }

    return (
        <Modal className="cart" open={progressCtx.progress === 'login'}>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleRegister}>Register</Button>
            {isLogin && <Login />}
            {isRegister && <Register isSuccessful={handleSuccess}/>}
        </Modal>
    )
}

export default AppAuth