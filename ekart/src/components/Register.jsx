import { useNavigate } from 'react-router-dom';
import Button from '../Template/Button';
import Input from '../Template/Input'

import useHttp from '../hooks/useHttp';
import UnauthHeader from './UnauthHeader';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

function Register() {
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest
  } = useHttp('http://localhost:3000/register', requestConfig);

  const navigate = useNavigate();
  const formValidateRef = useRef([]);

  async function handleSubmit(event) {
    // console.log("inside submit")
    // data['message'] === "User Registered!"
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); 
    let url = "/register"
    let jsonData = JSON.stringify({
      user: customerData,
    })
    await sendRequest(jsonData);
    event.target.reset();
  }

  if (data && data['message'] === "User Registered!") {
    data['message'] = "User Registered! Please Login to continue"
    navigate('/login')
  }
// ref={(element) => formValidateRef.current[1] = element}
  return (
    <>
      <UnauthHeader />
      <div className='card-form'>
        <form onSubmit={handleSubmit}>
          <Input label="Full Name" type="text" id="name" isRef={true} />
          <Input label="E-Mail Address" type="email" id="email" />
          <Input label="Address" type="text" id="address" />
          <Input label="Postal Code" type="text" id="pincode" />
          <Input label="Password" type="text" id="password" />
          <Button children="Submit" />
        </form>
        {data && <span className='error'>{data['message']}</span>}
      </div>
    </>

  )
}

export default Register