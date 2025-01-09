
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Button from '../Template/Button';
import Input from '../Template/Input';

import useHttp from '../hooks/useHttp';
import Error from './Error';
import UnauthHeader from './UnauthHeader';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

function Login() {
    const {
        data,
        isLoading: isSending,
        error,
        sendRequest
    } = useHttp('http://localhost:3000/login', requestConfig);

    const navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        let jsonData = JSON.stringify({
            user: customerData,
        })
        await sendRequest(jsonData)
        event.target.reset();
    }

    let actions = (
        <>

        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>;
    }

    if (data && !error) {
        if (data['message'] == "Invalid credentials") {
            actions = (
                <>
                    <span className="error">{data['message']}</span>
                </>
            )
        }
        else {
            sessionStorage.setItem("accountDetails", JSON.stringify(data[0]))
            actions = (
                <>
                    <Navigate to='/home' />
                </>
            )
            // navigate('/home')
        }
    }

    return (
        <>
            <UnauthHeader />
            <div className='card-form'>
                <form onSubmit={handleSubmit}>
                    <Input label="E-Mail Address" type="email" id="email" isRef={true} />
                    <Input label="Password" type="text" id="password" />
                    {error && <Error title="Failed to submit order" message={error} />}
                    <p className="modal-actions">{actions}</p>
                    <Link to="/forgotPassword"> <Button textOnly>Forgot Password?</Button> </Link> <br/>
                    <Button>Login</Button>
                </form>
            </div>
        </>
    )
}

export default Login